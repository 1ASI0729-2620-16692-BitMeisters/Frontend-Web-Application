import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';

/**
 * Displays localized footer text.
 */
@Component({
  selector: 'app-footer-content',
  imports: [TranslatePipe],
  templateUrl: './footer-content.html',
  styleUrl: './footer-content.css',
})
export class FooterContent {
  protected readonly landingPageUrl = environment.landingPageUrl;
}
