export class CompleteInspectionCommand {
  readonly inspectionId: string;

  constructor(props: { inspectionId: string }) {
    this.inspectionId = props.inspectionId;
  }
}
