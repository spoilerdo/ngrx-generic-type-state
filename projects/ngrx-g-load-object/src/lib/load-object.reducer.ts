import { createReducer, on } from '@ngrx/store';
import { nameof } from 'ts-simple-nameof';
import { LoadObjectActions } from './with-loading-object.actions';

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
export function createLoadObjectReducer<ObjectType>() {
  const objectActions = new LoadObjectActions(nameof<ObjectType>((o) => o));
  return createReducer(
    objectInitialState,
    on(objectActions.loadObject, (state) => ({
      ...state,
      loading: true,
    })),
    on(objectActions.loadObjectSuccess, (state, action) => ({
      ...state,
      object: action.object,
      loading: false,
    })),
    on(objectActions.loadObjectFailure, (state, action) => ({
      ...state,
      failure: action.failure,
      loading: false,
    }))
  );
}
