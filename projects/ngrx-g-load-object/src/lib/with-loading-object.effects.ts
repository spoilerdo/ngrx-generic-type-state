import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { WithLoadingObjectActions } from './with-loading-object.actions';
import { ObjectStateConfig } from './with-loading-object.config';

/**
 * The effect that takes place when loading an object.
 * Extended by the implementing effect
 */
@Injectable()
export class WithLoadingObjectEffects {
  constructor(
    protected readonly actions$: Actions,
    protected readonly stateConfig: ObjectStateConfig
  ) {
    const { config } = this.stateConfig;
    const loadObjects$: unknown[] = [];

    for (const object of Object.keys(config) as Array<string>) {
      for (const { action, func, type } of config[object]) {
        const objectActions = new WithLoadingObjectActions(
          object,
          action,
          type
        );

        loadObjects$.push(
          createEffect(() =>
            this.actions$.pipe(
              ofType(objectActions.objectAction),
              concatMap((value) => {
                const localObject: any | null = JSON.parse(
                  sessionStorage.getItem(object)!
                );

                if (!localObject) {
                  const args = Object.values(value);
                  args.pop();

                  return func.apply(null, args).pipe(
                    map((object: any) => {
                      return objectActions.objectActionSuccess({ object });
                    }),
                    catchError((error: Error) =>
                      of(objectActions.objectActionFailure({ failure: error }))
                    )
                  );
                }

                return of(
                  objectActions.objectActionSuccess({ object: localObject })
                );
              })
            )
          )
        );
      }
    }

    Object.assign(this, loadObjects$);
  }
}
