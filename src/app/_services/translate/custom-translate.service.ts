import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomTranslateService {

  constructor(
    private translateService: TranslateService,
  ) {
  }

  public setLoadedOrDefaultLanguage(): void {
    const savedLanguage = localStorage.getItem(environment.SELECTED_LANGUAGE_KEY);
    const language = savedLanguage !== null && savedLanguage !== 'null' ? savedLanguage : environment.DEFAULT_LANGUAGE;

    this.translateService.setDefaultLang(language);
    this.translateService.use(language);
    localStorage.setItem(environment.SELECTED_LANGUAGE_KEY, language);
  }

  public setLanguage(language: string): void {
    this.translateService.use(language);
    localStorage.setItem(environment.SELECTED_LANGUAGE_KEY, language);
  }

  public get(key: string): string {
    return this.translateService.instant(key);
  }

}
