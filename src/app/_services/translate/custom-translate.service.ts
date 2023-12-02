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
    const savedLanguage = localStorage.getItem(environment.selected_language_key);
    const language = savedLanguage !== null && savedLanguage !== 'null' ? savedLanguage : environment.default_language;

    this.translateService.setDefaultLang(language);
    this.translateService.use(language);
    localStorage.setItem(environment.selected_language_key, language);
  }

  public setLanguage(language: string): void {
    this.translateService.use(language);
    localStorage.setItem(environment.selected_language_key, language);
  }

  public get(key: string): string {
    return this.translateService.instant(key);
  }

}
