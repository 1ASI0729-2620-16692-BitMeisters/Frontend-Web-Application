import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { NotificationParams, NotificationSeverity, Notifier } from '../../application/notifier';
import { NotificationToast, NotificationToastData } from './notification-toast';

const BASE_CONFIG: MatSnackBarConfig = {
  horizontalPosition: 'end',
  verticalPosition: 'top',
  panelClass: 'notification',
};

interface SeverityPresentation {
  config: MatSnackBarConfig;
  actionKey?: string;
}

const PRESENTATION_BY_SEVERITY: Record<NotificationSeverity, SeverityPresentation> = {
  success: {
    config: { duration: 3000, politeness: 'polite' },
  },
  info: {
    config: { duration: 4000, politeness: 'polite' },
  },
  warning: {
    config: { duration: 5000, politeness: 'assertive' },
    actionKey: 'notifications.dismiss',
  },
  error: {
    config: { duration: 6000, politeness: 'assertive' },
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
    const data: NotificationToastData = {
      severity,
      message,
      dismissLabel: actionKey ? this.translate.instant(actionKey) : undefined,
    };

    const reference = this.snackBar.openFromComponent(NotificationToast, {
      ...BASE_CONFIG,
      ...config,
      data,
    });
    this.visibleMessage = message;
    reference.afterDismissed().subscribe(() => {
      if (this.visibleMessage === message) this.visibleMessage = null;
    });
  }
}
