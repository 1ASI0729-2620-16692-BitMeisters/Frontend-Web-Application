import { ResultValue } from '../valueobjects/result-value.enum';

export class RegisterInspectionResultCommand {
  readonly inspectionId: string;
  readonly inspectionItemId: string;
  readonly result: ResultValue;

  constructor(props: { inspectionId: string; inspectionItemId: string; result: ResultValue }) {
    this.inspectionId = props.inspectionId;
    this.inspectionItemId = props.inspectionItemId;
    this.result = props.result;
  }
}
