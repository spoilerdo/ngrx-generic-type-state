import { createAction, props } from '@ngrx/store';
import { ObjectType } from './with-loading-object.config';

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

  constructor(nameOfType: string, action: string, type: ObjectType) {
    this.objectAction = createAction(
      `[${nameOfType}] ${action} ${nameOfType}`,
      props<{ args: any[] }>()
    );
    this.objectActionSuccess = createAction(
      `[${nameOfType}] ${action} ${nameOfType} Success`,
      props<{ object: typeof type }>()
    );
    this.objectActionFailure = createAction(
      `[${nameOfType} ${action} ${nameOfType} Failure]`,
      props<{ failure: Error }>()
    );
  }
}
