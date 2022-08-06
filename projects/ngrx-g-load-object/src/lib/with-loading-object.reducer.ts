import { ActionReducer, createReducer, on } from '@ngrx/store';
import { WithLoadingObjectActions } from './with-loading-object.actions';
import { ObjectStateConfig } from './with-loading-object.config';

export interface ObjectState<ObjectType> {
  object: ObjectType | null;
  loading: boolean;
  failure: Error | null;
}

export const objectInitialState: ObjectState<unknown> = {
  object: null,
  loading: false,
  failure: new Error(),
};

/**
 * The reducer of the load object
 * Extended by own reducer implementation
 * Reduce objectType needs to be equal to the config key of the record
 */
export function createWithLoadingObjectReducers({ config }: ObjectStateConfig) {
  const actionReducerMap = new Map<string, ActionReducer<any>>();

  for (const object of Object.keys(config) as Array<string>) {
    for (const { action, type } of config[object]) {
      const objectActions = new WithLoadingObjectActions(object, action, type);

      actionReducerMap.set(
        `${object} ${action}`,
        createReducer(
          objectInitialState,
          on(objectActions.objectAction, (state) => ({
            ...state,
            loading: true,
          })),
          on(objectActions.objectActionSuccess, (state, action) => ({
            ...state,
            object: action.object,
            loading: false,
          })),
          on(objectActions.objectActionFailure, (state, action) => ({
            ...state,
            failure: action.failure,
            loading: false,
          }))
        )
      );
    }
  }

  return actionReducerMap;
}
