export class AddObservationCommand {
  readonly inspectionId: string;
  readonly resultId: string;
  readonly description: string;

  constructor(props: { inspectionId: string; resultId: string; description: string }) {
    this.inspectionId = props.inspectionId;
    this.resultId = props.resultId;
    this.description = props.description;
  }
}
