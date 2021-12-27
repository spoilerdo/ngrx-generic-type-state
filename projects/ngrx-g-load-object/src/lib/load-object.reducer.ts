import { createReducer, on } from "@ngrx/store";
import { LoadObjectActions } from "./load-object.action";

export interface ObjectState<ObjectType> {
  object: ObjectType | null;
  loading: boolean;
  failure: Error | null;
}

export const objectInitialState: ObjectState<unknown> = {
  object: null,
  loading: false,
  failure: new Error
}

export function createLoadObjectReducer<ObjectType>() {
    const objectActions = new LoadObjectActions<ObjectType>();
    return createReducer(
      objectInitialState,
      on(objectActions.loadObject, (state) => ({
        ...state,
        loading: true
      })),
      on(objectActions.loadObjectSuccess, (state, action) => ({
        ...state,
        object: action.object,
        loading: false
      })),
      on(objectActions.loadObjectFailure, (state, action) => ({
        ...state,
        failure: action.failure,
        loading: false
      }))
    )
  }
