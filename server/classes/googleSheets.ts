import {BaseClass} from "~classes/baseClass";

export default class GoogleSheets extends BaseClass<GoogleSheets> {
  constructor(params: Partial<GoogleSheets>) {
    super(params, "GoogleSheets")
    this.simulatorId = params.simulatorId || null;
  }
}
