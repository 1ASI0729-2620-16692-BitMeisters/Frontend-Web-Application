/**
 * Captures the data required to add a follow-up note to an incident.
 */
export class AddIncidentFollowUpCommand {
  #incidentId: string;
  #note: string;
  #createdBy: string;
  #createdAt: string;

  /**
   * Creates a new command instance.
   * @param props - Follow-up values.
   */
  constructor(props: { incidentId: string; note: string; createdBy: string; createdAt: string }) {
    this.#incidentId = props.incidentId;
    this.#note = props.note;
    this.#createdBy = props.createdBy;
    this.#createdAt = props.createdAt;
  }

  get incidentId(): string {
    return this.#incidentId;
  }
  set incidentId(value: string) {
    this.#incidentId = value;
  }

  get note(): string {
    return this.#note;
  }
  set note(value: string) {
    this.#note = value;
  }

  get createdBy(): string {
    return this.#createdBy;
  }
  set createdBy(value: string) {
    this.#createdBy = value;
  }

  get createdAt(): string {
    return this.#createdAt;
  }
  set createdAt(value: string) {
    this.#createdAt = value;
  }
}
