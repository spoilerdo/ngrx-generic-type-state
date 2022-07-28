import { createFeatureSelector, createSelector } from '@ngrx/store';
import { nameof } from 'ts-simple-nameof';
import { ObjectStateConfig } from './with-loading-object.config';
import { ObjectState } from './with-loading-object.reducer';

/**
 * Selector used by the load object facade
 */
export class LoadObjectSelector<ObjectType> {
  // #region vars

  private objectState;

  public getObject: any;
  public getFailure: any;
  public isLoading: any;

  // #endregion

  constructor(object: string, action: string) {
    this.objectState = createFeatureSelector<ObjectState<ObjectType>>(
      `${object} ${action}`
    );

    this.getObject = createSelector(
      this.objectState,
      (state: ObjectState<ObjectType>) => state.object
    );
    this.getFailure = createSelector(
      this.objectState,
      (state: ObjectState<ObjectType>) => state.failure
    );
    this.isLoading = createSelector(
      this.objectState,
      (state: ObjectState<ObjectType>) => state.loading
    );
  }
}
