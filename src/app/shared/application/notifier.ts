export type NotificationSeverity = 'success' | 'info' | 'warning' | 'error';

export type NotificationParams = Record<string, unknown>;

export abstract class Notifier {
  abstract notify(severity: NotificationSeverity, messageKey: string, params?: NotificationParams): void;

  success(messageKey: string, params?: NotificationParams): void {
    this.notify('success', messageKey, params);
  }

  info(messageKey: string, params?: NotificationParams): void {
    this.notify('info', messageKey, params);
  }

  warning(messageKey: string, params?: NotificationParams): void {
    this.notify('warning', messageKey, params);
  }

  error(messageKey: string, params?: NotificationParams): void {
    this.notify('error', messageKey, params);
  }
}
