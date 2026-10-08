/**
 * Captures the data required to mark a repair as completed.
 */
export class CompleteRepairCommand {
  #incidentId: number;
  #repairId: number;
  #finishedAt: string;

  /**
   * Creates a new command instance.
   * @param props - Repair completion values.
   */
  constructor(props: { incidentId: number; repairId: number; finishedAt: string }) {
    this.#incidentId = props.incidentId;
    this.#repairId = props.repairId;
    this.#finishedAt = props.finishedAt;
  }

  get incidentId(): number {
    return this.#incidentId;
  }
  set incidentId(value: number) {
    this.#incidentId = value;
  }

  get repairId(): number {
    return this.#repairId;
  }
  set repairId(value: number) {
    this.#repairId = value;
  }

  get finishedAt(): string {
    return this.#finishedAt;
  }
  set finishedAt(value: string) {
    this.#finishedAt = value;
  }
}
