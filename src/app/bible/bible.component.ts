import {Component} from '@angular/core';
import {BiblePerDayService} from "../_services/bible/bible-per-day.service";
import {BiblePerDay} from "../_models/bibleperday/output/bible-per-day";

@Component({
  selector: 'app-template',
  templateUrl: './bible.component.html',
  styleUrls: ['./bible.component.scss']
})
export class BibleComponent {
  biblePerDay: BiblePerDay = new BiblePerDay();

  constructor(
    private biblePerDayService: BiblePerDayService
  ) {
    this.biblePerDayService.fillPageModel(this.biblePerDay);
  }

}
