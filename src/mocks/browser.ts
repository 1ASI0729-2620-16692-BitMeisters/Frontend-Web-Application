import { setupWorker } from 'msw/browser';
import { inspectionHandlers } from './handlers/inspection.handlers';

export const worker = setupWorker(...inspectionHandlers);
