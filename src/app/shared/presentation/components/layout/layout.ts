import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TranslatePipe } from '@ngx-translate/core';
import { map } from 'rxjs';

import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { FooterContent } from '../footer-content/footer-content';
import { environment } from '../../../../../environments/environment';

/**
 * Main shell component that hosts the sidebar navigation,
 * the top bar and the routed content.
 */
@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    TranslatePipe,
    LanguageSwitcher,
    FooterContent,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  protected readonly version = environment.version;

  protected readonly isHandset = toSignal(
    inject(BreakpointObserver)
      .observe('(max-width: 768px)')
      .pipe(map((state) => state.matches)),
    { initialValue: false },
  );

  /**
   * Navigation entries for the application's sidebar,
   * grouped by the DDD category of each bounded context.
   */
  options = signal([
    {
      link: '/home',
      label: 'layout.dashboard',
      icon: 'dashboard',
      category: 'core',
    },
    {
      link: '/incidents',
      label: 'layout.incidentManagement',
      icon: 'warning_amber',
      category: 'core',
    },
    {
      link: '/inspections',
      label: 'layout.preOperationalInspection',
      icon: 'checklist',
      category: 'support',
    },
    {
      link: '/evaluation',
      label: 'layout.evaluationAndAuthorization',
      icon: 'verified_user',
      category: 'support',
    },
    {
      link: '/fleet',
      label: 'layout.fleetManagement',
      icon: 'local_shipping',
      category: 'support',
    },
    {
      link: '/vehicle-documentation',
      label: 'layout.vehicleDocumentation',
      icon: 'description',
      category: 'support',
    },
    {
      link: '/iam',
      label: 'layout.identityAndAccess',
      icon: 'manage_accounts',
      category: 'generic',
    },
  ]);
}
