import { Component, inject } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {
  readLanguagePreference,
  saveLanguagePreference,
} from '../../../infrastructure/i18n/language-preference';

@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleModule, TranslatePipe],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
export class LanguageSwitcher {
  protected currentLang = 'en-US';
  protected readonly languages = [
    { code: 'en-US', label: 'EN', name: 'English' },
    { code: 'es-419', label: 'ES', name: 'Español' },
  ];

  private readonly translate = inject(TranslateService);

  constructor() {
    this.currentLang = this.translate.getCurrentLang() || readLanguagePreference();
  }

  protected useLanguage(language: string): void {
    this.translate.use(language);
    this.currentLang = language;
    saveLanguagePreference(language);
  }
}
