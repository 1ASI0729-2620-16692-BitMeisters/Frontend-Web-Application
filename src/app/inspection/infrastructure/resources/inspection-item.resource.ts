export interface InspectionItemResource {
  id: string;
  code: string;
  name: string;
  description?: string;
  category: string;
  system: string;
  isSafetyComponent: boolean;
  requiresEvidence: boolean;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
