import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { NotificationParams, NotificationSeverity, Notifier } from '../../application/notifier';

const BASE_CONFIG: MatSnackBarConfig = {
  horizontalPosition: 'end',
  verticalPosition: 'top',
};

interface SeverityPresentation {
  config: MatSnackBarConfig;
  actionKey?: string;
}

const PRESENTATION_BY_SEVERITY: Record<NotificationSeverity, SeverityPresentation> = {
  success: {
    config: { duration: 3000, politeness: 'polite', panelClass: 'notification-success' },
  },
  info: {
    config: { duration: 4000, politeness: 'polite', panelClass: 'notification-info' },
  },
  warning: {
    config: { duration: 5000, politeness: 'assertive', panelClass: 'notification-warning' },
    actionKey: 'notifications.dismiss',
  },
  error: {
    config: { duration: 6000, politeness: 'assertive', panelClass: 'notification-error' },
    actionKey: 'notifications.dismiss',
  },
};

@Injectable()
export class SnackBarNotifier extends Notifier {
  private readonly snackBar = inject(MatSnackBar);
  private readonly translate = inject(TranslateService);
  private visibleMessage: string | null = null;

  notify(severity: NotificationSeverity, messageKey: string, params?: NotificationParams): void {
    const message = this.translate.instant(messageKey, params);
    if (message === this.visibleMessage) return;

    const { config, actionKey } = PRESENTATION_BY_SEVERITY[severity];
    const action = actionKey ? this.translate.instant(actionKey) : undefined;

    const reference = this.snackBar.open(message, action, { ...BASE_CONFIG, ...config });
    this.visibleMessage = message;
    reference.afterDismissed().subscribe(() => {
      if (this.visibleMessage === message) this.visibleMessage = null;
    });
  }
}
