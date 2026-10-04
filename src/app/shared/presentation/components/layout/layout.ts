import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TranslatePipe } from '@ngx-translate/core';

import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { FooterContent } from '../footer-content/footer-content';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    TranslatePipe,
    LanguageSwitcher,
    FooterContent,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  options = signal([
    {
      link: '/home',
      label: 'layout.dashboard'
    },
    {
      link: '/iam',
      label: 'layout.identityAndAccess'
    },
    {
      link: '/fleet',
      label: 'layout.fleetManagement'
    },
    {
      link: '/vehicle-documentation',
      label: 'layout.vehicleDocumentation'
    },
    {
      link: '/inspection',
      label: 'layout.preOperationalInspection'
    },
    {
      link: '/evaluation',
      label: 'layout.evaluationAndAuthorization'
    },
    {
      link: '/incident',
      label: 'layout.incidentManagement'
    }
  ]);
}
