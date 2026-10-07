export interface VehicleSummaryResource {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  type: string;
  currentStatus: string;
}

export interface VehicleAssignmentResource {
  id: string;
  driverId: string;
  assignedFrom: string;
  assignedTo: string | null;
  isActive: boolean;
  createdAt: string;
  vehicle: VehicleSummaryResource;
}
