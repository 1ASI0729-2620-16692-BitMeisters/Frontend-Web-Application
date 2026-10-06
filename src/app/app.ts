import { Component, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Layout } from './shared/presentation/components/layout/layout';

@Component({
  imports: [Layout],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('FleetSafe');

  private readonly translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['en-US', 'es-419']);
    this.translate.use('en-US');
  }
}
