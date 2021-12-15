import { createAction, props } from "@ngrx/store";
import { nameof } from "ts-simple-nameof";

export class LoadObjectActions<ObjectType> {
  //#region vars

  public loadObject;
  public loadObjectSuccess;
  public loadObjectFailure;

  //#endregion

  constructor() {
    this.loadObject = createAction(`[${this.objectType()}] Load ${this.objectType()}`);
    this.loadObjectSuccess = createAction(
      `[${this.objectType()}] Load ${this.objectType()} Success`, props<{ object: ObjectType }>());
    this.loadObjectFailure = createAction(
      `[${this.objectType()} Load ${this.objectType()} Failure]`, props<{ failure: Error }>());
  }

  objectType(): string {
    return nameof<ObjectType>(o => o);
  }
}
