import { ScheduleRepairCommand } from '../domain/model/schedule-repair.command';
import { ScheduleRepairRequest } from './schedule-repair.request';
import { ScheduleRepairResource, ScheduleRepairResponse } from './schedule-repair-response';
import { Repair } from '../domain/model/repair.entity';
import { RepairStatus } from '../domain/model/repair-status.enum';

/**
 * Maps repair scheduling commands and endpoint payloads.
 */
export class ScheduleRepairAssembler {
  /**
   * Converts the endpoint response into an application-level resource.
   */
  toResourceFromResponse = (response: ScheduleRepairResponse): ScheduleRepairResource =>
    ({
      id: response.id,
      incidentId: response.incidentId,
      workshop: response.workshop,
      cost: response.cost,
      startedAt: response.startedAt,
      finishedAt: response.finishedAt,
      status: response.status,
    }) as ScheduleRepairResource;

  /**
   * Converts a schedule repair command into the request payload.
   */
  toRequestFromCommand = (command: ScheduleRepairCommand): ScheduleRepairRequest =>
    ({
      incidentId: command.incidentId,
      workshop: command.workshop,
      cost: command.cost,
      startedAt: command.startedAt,
      finishedAt: command.finishedAt,
    }) as ScheduleRepairRequest;

  /**
   * Converts a response resource into a Repair entity.
   */
  toEntityFromResource = (resource: ScheduleRepairResource): Repair =>
    new Repair({
      id: resource.id,
      incidentId: resource.incidentId,
      workshop: resource.workshop,
      cost: resource.cost,
      startedAt: resource.startedAt,
      finishedAt: resource.finishedAt,
      status: resource.status as RepairStatus,
    });
}
