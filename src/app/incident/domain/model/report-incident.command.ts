import { IncidentOrigin } from './incident-origin.enum';
import { IncidentSeverity } from './incident-severity.enum';

/**
 * Captures the data required to report a new incident.
 */
export class ReportIncidentCommand {
  #vehicleId: string;
  #incidentTypeId: string;
  #inspectionId: string | null;
  #origin: IncidentOrigin;
  #description: string;
  #severity: IncidentSeverity;
  #reportedBy: string;

  constructor(props: {
    vehicleId: string;
    incidentTypeId: string;
    inspectionId?: string | null;
    origin: IncidentOrigin;
    description: string;
    severity: IncidentSeverity;
    reportedBy: string;
  }) {
    this.#vehicleId = props.vehicleId;
    this.#incidentTypeId = props.incidentTypeId;
    this.#inspectionId = props.inspectionId ?? null;
    this.#origin = props.origin;
    this.#description = props.description;
    this.#severity = props.severity;
    this.#reportedBy = props.reportedBy;
  }

  get vehicleId(): string {
    return this.#vehicleId;
  }
  set vehicleId(value: string) {
    this.#vehicleId = value;
  }

  get incidentTypeId(): string {
    return this.#incidentTypeId;
  }
  set incidentTypeId(value: string) {
    this.#incidentTypeId = value;
  }

  get inspectionId(): string | null {
    return this.#inspectionId;
  }
  set inspectionId(value: string | null) {
    this.#inspectionId = value;
  }

  get origin(): IncidentOrigin {
    return this.#origin;
  }
  set origin(value: IncidentOrigin) {
    this.#origin = value;
  }

  get description(): string {
    return this.#description;
  }
  set description(value: string) {
    this.#description = value;
  }

  get severity(): IncidentSeverity {
    return this.#severity;
  }
  set severity(value: IncidentSeverity) {
    this.#severity = value;
  }

  get reportedBy(): string {
    return this.#reportedBy;
  }
  set reportedBy(value: string) {
    this.#reportedBy = value;
  }
}
