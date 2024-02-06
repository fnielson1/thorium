import uuid from "uuid";

export type RecordKey = string | number | symbol;

export interface IBaseClass {
  id: string;
  class: string;
  simulatorId: string;
  type: string;
  name: string;
}

export class BaseClass<T extends BaseClass<T>> implements IBaseClass {
  readonly id: string = "";
  readonly class: string = "";
  simulatorId: string = "";
  type: string = "";
  name: string = "";

  constructor(
    params: Partial<T> = {} as Record<RecordKey, any>,
    className?: string,
    id?: string,
  ) {
    this.id = id || params.id || uuid.v4();
    this.class = className;
  }
}
