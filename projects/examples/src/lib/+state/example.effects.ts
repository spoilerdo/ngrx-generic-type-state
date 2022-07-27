import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  LoadObjectEffects,
  ObjectStateConfig,
} from 'projects/ngrx-g-load-object/src/public-api';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { ExampleService } from '../example.service';
import { Example } from '../models/example';

import * as ExampleActions from './example.actions';

@Injectable()
export class ExampleEffects extends LoadObjectEffects<Example> {
  deleteExample$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExampleActions.deleteExample),
      concatMap((action) =>
        this.exampleService.deleteExampleById(action.id).pipe(
          map(() => ExampleActions.deleteExampleSuccess({ id: action.id })),
          catchError((error) =>
            of(ExampleActions.deleteExampleFailure({ failure: error }))
          )
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
