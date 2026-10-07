import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment';

async function startMockApi(): Promise<void> {
  if (!environment.useMockApi) return;
  const { worker } = await import('./mocks/browser');
  await worker.start({ onUnhandledRequest: 'bypass' });
}

startMockApi()
  .then(() => bootstrapApplication(App, appConfig))
  .catch((err) => console.error(err));
