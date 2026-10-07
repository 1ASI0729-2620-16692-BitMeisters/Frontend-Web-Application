export interface EvidenceResource {
  id: string;
  fileUrl: string;
  mediaType: string;
  uploadedAt: string;
}

export interface ObservationResource {
  id: string;
  description: string;
  createdBy: string;
  createdAt: string;
  evidences: EvidenceResource[];
}

export interface InspectionResultResource {
  id: string;
  inspectionItemId: string;
  itemName: string;
  itemCategory: string;
  result: string;
  createdAt: string;
  observations: ObservationResource[];
}

export interface InspectionResource {
  id: string;
  vehicleId: string;
  driverId: string;
  status: string;
  odometer: number;
  startedAt: string;
  completedAt: string | null;
  results: InspectionResultResource[];
  createdAt: string;
  updatedAt: string;
}
