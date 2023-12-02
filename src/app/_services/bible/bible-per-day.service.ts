import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {DateService} from "../util/date.service";
import {AssetsService} from "../util/assets.service";
import {BiblePerDayContainerInput} from "../../_models/bibleperday/input/bible-per-day-container-input";
import {BiblePerDay} from "../../_models/bibleperday/output/bible-per-day";
import {BiblePerDayInput} from "../../_models/bibleperday/input/bible-per-day-input";
import {BiblePerDayQuoteProviderService} from "./bible-per-day-quote-provider.service";
import {ContemplationInput} from "../../_models/bibleperday/input/contemplation-input";
import {ContemplationContainer} from "../../_models/bibleperday/output/contemplation-container";
import {Contemplation} from "../../_models/bibleperday/output/contemplation";
import {SpecialOccasionInput} from "../../_models/bibleperday/input/special-occasion-input";
import {SpecialOccasionContainer} from "../../_models/bibleperday/output/special-occasion-container";
import {SpecialOccasion} from "../../_models/bibleperday/output/special-occasion";

@Injectable({
  providedIn: 'root'
})
export class BiblePerDayService {

  constructor(
    private http: HttpClient,
    private dateService: DateService,
    private assetsService: AssetsService,
    private quoteProvider: BiblePerDayQuoteProviderService
  ) {
  }

  public fillPageModel(biblePerDay: BiblePerDay) {
    this.getBiblePerDayFullMonth().subscribe({
      next: (container: BiblePerDayContainerInput): void => {
        let bpdForToday: BiblePerDayInput = container.biblePerDayList[Number(this.dateService.getCurrentDayShort()) - 1];
        this.fillPageModelFromInput(bpdForToday, biblePerDay)
      },
      error: (error) => console.error(error)
    });
  }

  private fillPageModelFromInput(bpdForToday: BiblePerDayInput, targetModel: BiblePerDay): void {
    targetModel.date.setValue(bpdForToday.date);
    this.quoteProvider.fillQuoteFromBible(bpdForToday.firstStandard, targetModel.firstStandardText);
    this.quoteProvider.fillQuoteFromBible(bpdForToday.secondStandard, targetModel.secondStandardText);
    this.quoteProvider.fillQuoteFromBible(bpdForToday.firstAdditional, targetModel.firstAdditionalText);
    this.quoteProvider.fillQuoteFromBible(bpdForToday.secondAdditional, targetModel.secondAdditionalText);
    this.quoteProvider.fillQuoteNotFromBible(bpdForToday.quoteNotFromBible, bpdForToday.quoteNotFromBibleReference, targetModel.quoteNotFromBibleText);
    this.fillSpecialOccasionList(bpdForToday.specialOccasionList, targetModel.specialOccasionContainer);
    this.fillContemplation(bpdForToday.contemplationDTO, targetModel.contemplationContainer);
  }

  private fillSpecialOccasionList(specialOccasionList: SpecialOccasionInput[], specialOccasionContainer: SpecialOccasionContainer) {
    if (!specialOccasionList || specialOccasionList.length == 0) {
      specialOccasionContainer.wait = false;
      return;
    }
    let specialOccasionListTmp: SpecialOccasion[] = [];
    for (const specialOccasion of specialOccasionList) {
      let occasionTmp: SpecialOccasion = new SpecialOccasion();
      // Todo: change mapping here
      occasionTmp.occasion.setValue(specialOccasion.occasion.toString());
      // Todo: change mapping here
      occasionTmp.title.setValue(specialOccasion.title.toString());
      this.quoteProvider.fillQuoteFromBible(specialOccasion.mainQuote, occasionTmp.mainQuoteText);
      this.quoteProvider.fillQuoteFromBible(specialOccasion.psalm, occasionTmp.psalmText);
      this.quoteProvider.fillQuoteNotFromBible(specialOccasion.worshipSongs.join("<br/>"), "", occasionTmp.worshipSongs);
      this.quoteProvider.fillQuoteFromBible(specialOccasion.apostolicLesson, occasionTmp.apostolicLessonText);
      this.quoteProvider.fillQuoteFromBible(specialOccasion.sermonTextList.join(" | "), occasionTmp.sermonTextListText);
      this.quoteProvider.fillQuoteFromBible(specialOccasion.oldTestament, occasionTmp.oldTestamentText);
      this.quoteProvider.fillQuoteFromBible(specialOccasion.gospel, occasionTmp.gospelText);
      specialOccasionListTmp.push(occasionTmp);
    }
    specialOccasionContainer.specialOccasionList = specialOccasionListTmp;
  }

  private fillContemplation(contemplationDTO: ContemplationInput, contemplationContainer: ContemplationContainer) {
    if (!contemplationDTO) {
      contemplationContainer.wait = false;
      return;
    }
    let contemplation: Contemplation = new Contemplation();
    this.quoteProvider.fillQuoteFromBible(contemplationDTO.bibleReference, contemplation.bibleText);
    this.quoteProvider.fillQuoteNotFromBible(contemplationDTO.text, contemplationDTO.textReference, contemplation.text);
    contemplationContainer.contemplation = contemplation;
  }

  private getBiblePerDayFullMonth(): Observable<any> {
    return this.assetsService.getResource(this.getBiblePerDayFullMonthPath());
  }

  private getBiblePerDayFullMonthPath(): string {
    let currentYear: string = this.dateService.getCurrentYear();
    let currentMonth: string = this.dateService.getCurrentMonth();
    return "bibleperday/" + currentYear + "/BPD_" + currentMonth + ".json";
  }

  // Todo: deprecated
  private findQuotesForToday(): Observable<any> {
    return this.http.post<any>("https://db.bncd.stream/bncd/api/open-node/", JSON.stringify({key: environment.bible_per_day_api_key}));
  }

}
