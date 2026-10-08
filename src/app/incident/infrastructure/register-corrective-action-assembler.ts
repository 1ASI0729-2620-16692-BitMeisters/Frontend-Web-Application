import { RegisterCorrectiveActionCommand } from '../domain/model/register-corrective-action.command';
import { RegisterCorrectiveActionRequest } from './register-corrective-action.request';
import {
  RegisterCorrectiveActionResource,
  RegisterCorrectiveActionResponse,
} from './register-corrective-action-response';
import { CorrectiveAction } from '../domain/model/corrective-action.entity';

/**
 * Maps corrective action commands and endpoint payloads.
 */
export class RegisterCorrectiveActionAssembler {
  /**
   * Converts the endpoint response into an application-level resource.
   * @param response - Raw response returned by the register corrective action endpoint.
   * @returns Mapped corrective action resource.
   */
  toResourceFromResponse = (
    response: RegisterCorrectiveActionResponse,
  ): RegisterCorrectiveActionResource =>
    ({
      id: response.id,
      incidentId: response.incidentId,
      description: response.description,
      performedBy: response.performedBy,
      performedAt: response.performedAt,
      evidenceUrl: response.evidenceUrl,
    }) as RegisterCorrectiveActionResource;

  /**
   * Converts a register corrective action command into the request payload.
   * @param command - Domain command with corrective action data.
   * @returns Mapped request payload.
   */
  toRequestFromCommand = (
    command: RegisterCorrectiveActionCommand,
  ): RegisterCorrectiveActionRequest =>
    ({
      incidentId: command.incidentId,
      description: command.description,
      performedBy: command.performedBy,
      performedAt: command.performedAt,
      evidenceUrl: command.evidenceUrl,
    }) as RegisterCorrectiveActionRequest;

  /**
   * Converts a response resource into a CorrectiveAction entity.
   * @param resource - The resource to convert.
   * @returns The converted CorrectiveAction entity.
   */
  toEntityFromResource = (resource: RegisterCorrectiveActionResource): CorrectiveAction =>
    new CorrectiveAction({
      id: resource.id,
      incidentId: resource.incidentId,
      description: resource.description,
      performedBy: resource.performedBy,
      performedAt: resource.performedAt,
      evidenceUrl: resource.evidenceUrl,
    });
}
