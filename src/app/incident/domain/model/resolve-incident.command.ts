/**
 * Captures the data required to resolve an incident.
 */
export class ResolveIncidentCommand {
  #incidentId: number;
  #resolutionType: string;
  #resolvedAt: string;

  /**
   * Creates a new command instance.
   * @param props - Resolution values.
   */
  constructor(props: { incidentId: number; resolutionType: string; resolvedAt: string }) {
    this.#incidentId = props.incidentId;
    this.#resolutionType = props.resolutionType;
    this.#resolvedAt = props.resolvedAt;
  }

  get incidentId(): number {
    return this.#incidentId;
  }
  set incidentId(value: number) {
    this.#incidentId = value;
  }

  get resolutionType(): string {
    return this.#resolutionType;
  }
  set resolutionType(value: string) {
    this.#resolutionType = value;
  }

  get resolvedAt(): string {
    return this.#resolvedAt;
  }
  set resolvedAt(value: string) {
    this.#resolvedAt = value;
  }
}
