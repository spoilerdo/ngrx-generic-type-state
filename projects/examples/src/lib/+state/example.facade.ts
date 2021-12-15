import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ExampleModuleState } from "./example.reducer";

import * as ExampleActions from './example.actions';

@Injectable()
export class ExampleFacade {
  constructor(private exampleStore: Store<ExampleModuleState>) {}

  public deleteExample(id: string): void {
    this.exampleStore.dispatch(ExampleActions.deleteExample({ id }));
  }
}
