import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ObjectStateConfig } from './with-loading-object.config';
import { ObjectState } from './with-loading-object.reducer';

/**
 * Selector used by the load object facade
 */
export class LoadObjectSelector {
  // #region vars

  private objectState;

  public getObject: any;
  public getFailure: any;
  public isLoading: any;

  // #endregion

  constructor(object: string, action: string, keys: string[]) {
    const type = ObjectStateConfig.getType(object, keys);

    this.objectState = createFeatureSelector<ObjectState<typeof type>>(
      `${object} ${action}`
    );

    this.getObject = createSelector(
      this.objectState,
      (state: ObjectState<typeof type>) => state.object
    );
    this.getFailure = createSelector(
      this.objectState,
      (state: ObjectState<typeof type>) => state.failure
    );
    this.isLoading = createSelector(
      this.objectState,
      (state: ObjectState<typeof type>) => state.loading
    );
  }
}
