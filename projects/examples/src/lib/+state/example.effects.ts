import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { LoadObjectEffects, ObjectStateConfig } from "projects/ngrx-g-load-object/src/public-api";
import { catchError } from "rxjs/operators";
import { ExampleService } from "../example.service";
import { Example } from "../models/example";

import * as ExampleActions from './example.actions';

@Injectable()
export class ExampleEffects extends LoadObjectEffects<Example> {
  // TODO: finish this pls
  deleteExample$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExampleActions.deleteExample),
      concatMap((action) =>
        this.exampleService.deleteExampleById(action.id).pipe(
          catchError((error) => )
        )
      )
    )
  );

  constructor(
    protected readonly actions$: Actions,
    private readonly exampleService: ExampleService,
    protected readonly config: ObjectStateConfig<Example>
  ) {
    super(actions$, config);
  }
}
