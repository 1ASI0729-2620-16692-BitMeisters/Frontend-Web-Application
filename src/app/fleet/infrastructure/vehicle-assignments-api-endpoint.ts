import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { environment } from '../../../environments/environment';
import { VehicleAssignment } from '../domain/model/vehicle-assignment.entity';
import {
  VehicleAssignmentResource,
  VehicleAssignmentsResponse,
} from './vehicle-assignments-response';
import { VehicleAssignmentAssembler } from './vehicle-assignment-assembler';

export class VehicleAssignmentsApiEndpoint extends BaseApiEndpoint<
  VehicleAssignment,
  VehicleAssignmentResource,
  VehicleAssignmentsResponse,
  VehicleAssignmentAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderVehicleAssignmentsEndpointPath}`,
      new VehicleAssignmentAssembler(),
    );
  }
}
