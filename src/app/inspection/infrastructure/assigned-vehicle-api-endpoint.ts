import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ErrorHandlingEnabledBaseType } from '../../shared/infrastructure/error-handling-enabled-base-type';
import { AssignedVehicle } from '../domain/model/assigned-vehicle.entity';
import { AssignedVehicleAssembler } from './assigned-vehicle-assembler';
import { VehicleAssignmentResponse } from './vehicle-assignment-response';

const assignedVehicleApiEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderVehicleAssignmentEndpointPath}`;

export class AssignedVehicleApiEndpoint extends ErrorHandlingEnabledBaseType {
  constructor(
    private http: HttpClient,
    private assembler: AssignedVehicleAssembler,
  ) {
    super();
  }

  getAssignedVehicle = (): Observable<AssignedVehicle> =>
    this.http.get<VehicleAssignmentResponse>(assignedVehicleApiEndpointUrl).pipe(
      map((response) => this.assembler.toEntityFromResponse(response)),
      catchError(this.handleError('Failed to fetch the assigned vehicle')),
    );
}
