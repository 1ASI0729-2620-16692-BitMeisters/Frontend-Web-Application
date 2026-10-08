import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * Displays fallback content for unknown routes.
 *
 * Reacts to every navigation so that the invalid path is
 * recalculated whenever the user lands on a different unknown URL.
 */
@Component({
  selector: 'app-page-not-found',
  imports: [MatButton, TranslatePipe],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css',
})
export class PageNotFound {
  /**
   * Signal holding the current invalid path, without the leading slash.
   */
  protected readonly invalidPath = signal<string>('');

  private readonly router = inject(Router);

  constructor() {
    // Initial value
    this.invalidPath.set(this.router.url.replace(/^\//, ''));

    // Update on every navigation that ends
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => {
        this.invalidPath.set(event.urlAfterRedirects.replace(/^\//, ''));
      });
  }

  /**
   * Navigates to the home page.
   */
  protected navigateToHome(): void {
    this.router.navigate(['home']).then();
  }
}
