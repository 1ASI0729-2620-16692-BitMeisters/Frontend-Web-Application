/**
 * Captures the data required to register a corrective action.
 */
export class RegisterCorrectiveActionCommand {
  #incidentId: string;
  #description: string;
  #performedBy: string;
  #performedAt: string;
  #evidenceUrl: string;

  /**
   * Creates a new command instance.
   * @param props - Corrective action values.
   */
  constructor(props: {
    incidentId: string;
    description: string;
    performedBy: string;
    performedAt: string;
    evidenceUrl: string;
  }) {
    this.#incidentId = props.incidentId;
    this.#description = props.description;
    this.#performedBy = props.performedBy;
    this.#performedAt = props.performedAt;
    this.#evidenceUrl = props.evidenceUrl;
  }

  get incidentId(): string {
    return this.#incidentId;
  }
  set incidentId(value: string) {
    this.#incidentId = value;
  }

  get description(): string {
    return this.#description;
  }
  set description(value: string) {
    this.#description = value;
  }

  get performedBy(): string {
    return this.#performedBy;
  }
  set performedBy(value: string) {
    this.#performedBy = value;
  }

  get performedAt(): string {
    return this.#performedAt;
  }
  set performedAt(value: string) {
    this.#performedAt = value;
  }

  get evidenceUrl(): string {
    return this.#evidenceUrl;
  }
  set evidenceUrl(value: string) {
    this.#evidenceUrl = value;
  }
}
