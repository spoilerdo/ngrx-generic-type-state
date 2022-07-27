import { createAction, props } from '@ngrx/store';

export type ActionRecord = Record<string, WithLoadingObjectActions>;

/**
 * Actions for loading objects, this is used by the facade
 */
export class WithLoadingObjectActions {
  //#region vars

  public objectAction: any;
  public objectActionSuccess: any;
  public objectActionFailure: any;

  //#endregion

  constructor(nameOfType: string, action: string) {
    this.objectAction = createAction(`[${nameOfType}] ${action} ${nameOfType}`);
    this.objectActionSuccess = createAction(
      `[${nameOfType}] ${action} ${nameOfType} Success`,
      props<{ object: any }>() //ObjectType
    );
    this.objectActionFailure = createAction(
      `[${nameOfType} ${action} ${nameOfType} Failure]`,
      props<{ failure: Error }>()
    );
  }
}
