/**
 * Captures the data required to mark a repair as completed.
 */
export class CompleteRepairCommand {
  #incidentId: string;
  #repairId: string;
  #finishedAt: string;

  /**
   * Creates a new command instance.
   * @param props - Repair completion values.
   */
  constructor(props: { incidentId: string; repairId: string; finishedAt: string }) {
    this.#incidentId = props.incidentId;
    this.#repairId = props.repairId;
    this.#finishedAt = props.finishedAt;
  }

  get incidentId(): string {
    return this.#incidentId;
  }
  set incidentId(value: string) {
    this.#incidentId = value;
  }

  get repairId(): string {
    return this.#repairId;
  }
  set repairId(value: string) {
    this.#repairId = value;
  }

  get finishedAt(): string {
    return this.#finishedAt;
  }
  set finishedAt(value: string) {
    this.#finishedAt = value;
  }
}
