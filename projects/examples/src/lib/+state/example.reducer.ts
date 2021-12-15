import { ActionReducerMap, createReducer, on } from "@ngrx/store";
import { createLoadObjectReducer, ObjectState } from "projects/ngrx-g-load-object/src/public-api";
import { Example } from "../models/example";
import { Explanation } from "../models/explanation";

export const EXAMPLE_FEATURE_KEY = 'example';

type ExampleState = ObjectState<Example>;

export interface ExampleModuleState {
  readonly [EXAMPLE_FEATURE_KEY]: ExampleState;
}

export const exampleExtraInitialState: ExampleState = {
  //TODO: finish this but this is for the extra examples....
}

const example: unique symbol = Symbol();
const exampleExtra: unique symbol = Symbol();
const explanation: unique symbol = Symbol();
export interface ExampleReducerState {
  [example]: any;
  [exampleExtra]: any;
  [explanation]: any;
}

export function exampleModuleReducer() {
  const reducer: ActionReducerMap<ExampleReducerState> = {
    [example]: createLoadObjectReducer<Example>(),
    [exampleExtra]: createExampleExtraReducer(),
    [explanation]: createLoadObjectReducer<Explanation>()
  }
}

function createExampleExtraReducer() {
  //TODO: add reducer filling...
  return createReducer();
}
