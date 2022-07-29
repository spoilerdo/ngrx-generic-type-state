import { ConstructorProvider, Injector, StaticProvider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import {
  createWithLoadingObjectReducers,
  ObjectStateConfig,
} from 'projects/ngrx-g-load-object/src/public-api';
import { ExampleConfig } from './state.config';

const option: ConstructorProvider = { provide: ExampleConfig, deps: [] };
const options: StaticProvider[] = [option];
const injector = Injector.create(options);
export function exampleModuleReducer(): ActionReducerMap<any> {
  const actionReducerMap = createWithLoadingObjectReducers(
    injector.get(ExampleConfig)
  );

  const keys = [...actionReducerMap.keys()];

  return {
    [keys[0]]: actionReducerMap.get(keys[0])!,
    [keys[1]]: actionReducerMap.get(keys[1])!,
    [keys[2]]: actionReducerMap.get(keys[2])!,
  };
}
