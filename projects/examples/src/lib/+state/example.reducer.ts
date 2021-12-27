import { ActionReducerMap, createReducer, on } from "@ngrx/store";
import { createLoadObjectReducer, ObjectState } from "projects/ngrx-g-load-object/src/public-api";
import { Example } from "../models/example";
import { Explanation } from "../models/explanation";

import * as ExampleActions from './example.actions';

export const EXAMPLE_FEATURE_KEY = 'example';

type ExampleState = ObjectState<Example>;

export interface ExampleModuleState {
  readonly [EXAMPLE_FEATURE_KEY]: ExampleState;
}

export const exampleExtraInitialState: ExampleState = {
  object: null,
  loading: false,
  failure: null
}

const example: unique symbol = Symbol();
const exampleExtra: unique symbol = Symbol();
const explanation: unique symbol = Symbol();
export interface ExampleReducerState {
  [example]: any;
  [exampleExtra]: any;
  [explanation]: any;
}

export function exampleModuleReducer(): ActionReducerMap<ExampleReducerState> {
  return {
    [example]: createLoadObjectReducer<Example>(),
    [exampleExtra]: createExampleExtraReducer(),
    [explanation]: createLoadObjectReducer<Explanation>()
  }
}

function createExampleExtraReducer() {
  return createReducer(
    exampleExtraInitialState,
    on(ExampleActions.deleteExample, (state) => ({
      ...state,
      loading: true
    })),
    on(ExampleActions.deleteExampleSuccess, (state) => ({
      ...state,
      object: null,
      loading: false
    })),
    on(ExampleActions.deleteExampleFailure, (state) => ({
      ...state,
      loading: false
    }))
  );
}
