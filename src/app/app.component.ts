import {Component} from '@angular/core';
import {CustomTranslateService} from './_services/translate/custom-translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';

  constructor(private translateService: CustomTranslateService) {
    this.translateService.setLoadedOrDefaultLanguage();
  }

}
