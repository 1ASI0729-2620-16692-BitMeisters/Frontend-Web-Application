export class StartInspectionCommand {
  readonly odometer: number;

  constructor(props: { odometer: number }) {
    this.odometer = props.odometer;
  }
}
