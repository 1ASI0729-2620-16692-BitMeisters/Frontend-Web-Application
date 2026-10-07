export interface AssignedVehicleProps {
  vehicleId: string;
  plate: string;
  brand: string;
  model: string;
  type: string;
  assignedFrom: Date;
}

export class AssignedVehicle {
  readonly vehicleId: string;
  readonly plate: string;
  readonly brand: string;
  readonly model: string;
  readonly type: string;
  readonly assignedFrom: Date;

  constructor(props: AssignedVehicleProps) {
    this.vehicleId = props.vehicleId;
    this.plate = props.plate;
    this.brand = props.brand;
    this.model = props.model;
    this.type = props.type;
    this.assignedFrom = props.assignedFrom;
  }
}
