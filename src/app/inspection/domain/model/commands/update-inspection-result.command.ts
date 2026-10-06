import { ResultValue } from '../valueobjects/result-value.enum';

export class UpdateInspectionResultCommand {
  readonly inspectionId: string;
  readonly resultId: string;
  readonly result: ResultValue;

  constructor(props: { inspectionId: string; resultId: string; result: ResultValue }) {
    this.inspectionId = props.inspectionId;
    this.resultId = props.resultId;
    this.result = props.result;
  }
}
