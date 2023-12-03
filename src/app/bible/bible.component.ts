import {Component} from '@angular/core';
import {BiblePerDayService} from "../_services/bible/bible-per-day.service";
import {BiblePerDay} from "../_models/bibleperday/output/bible-per-day";
import {DateService} from "../_services/util/date.service";
import {FormControl} from "@angular/forms";
import {DateTime} from "luxon";

@Component({
  selector: 'app-template',
  templateUrl: './bible.component.html',
  styleUrls: ['./bible.component.scss']
})
export class BibleComponent {
  biblePerDay: BiblePerDay = new BiblePerDay();
  minDate: Date;
  maxDate: Date;
  selectedDate: FormControl<DateTime | null>;

  constructor(
    private biblePerDayService: BiblePerDayService,
    private dateService: DateService
  ) {
    this.minDate = new Date("2023-1-1");
    this.maxDate = new Date("2023-12-31");
    this.selectedDate = new FormControl(this.dateService.getCurrentDateTime());
    this.loadDataOnPage();

    this.selectedDate.valueChanges.subscribe(() => {
      this.loadDataOnPage();
    });
  }

  loadDataOnPage(): void {
    let day: number | undefined = this.selectedDate.value?.day;
    let month: number | undefined = this.selectedDate.value?.month;
    let year: number | undefined = this.selectedDate.value?.year;
    if (day === undefined || month === undefined || year === undefined) {
      throw new Error("Selected day '" + day + "', month '" + month + "' or year '" + year + "' cannot be undefined");
    }
    this.biblePerDayService.fillPageModel(year, month, day, this.biblePerDay);
  }

}
