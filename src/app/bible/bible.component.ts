import {Component} from '@angular/core';
import {BibleService} from "../_services/bible/bible.service";
import {BiblePerDayService} from "../_services/bible/bible-per-day.service";
import {BibleReference} from "../_services/bible/bible-reference";

@Component({
  selector: 'app-template',
  templateUrl: './bible.component.html',
  styleUrls: ['./bible.component.scss']
})
export class BibleComponent {

  bibleQuote: string = "";

  constructor(
    private bibleService: BibleService,
    private biblePerDayService: BiblePerDayService
  ) {
    this.biblePerDayService.findQuotesForToday().subscribe({
      next: (data): void => {
        let bibleReferenceString: string = data.first_s;
        let bibleReference: BibleReference = this.biblePerDayService.parseResponse(bibleReferenceString);
        this.bibleService.findQuoteForWarsawBible(bibleReference).subscribe({
          next: (data): void => {
            for (let i: number = 0; i < data.verses.length; i++) {
              this.bibleQuote += (data.verses[i].text + "<br>");
            }
            this.bibleQuote += ("<br><i>" + bibleReference.present() + "</i>");
          },
          error: (error) => console.error(error)
        });
      },
      error: (error) => console.error(error)
    });
  }

}
