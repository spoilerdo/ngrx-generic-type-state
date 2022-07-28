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
export class WithLoadingObjectEffects<ObjectType> {
  loadObjects$: unknown[] = [];

  constructor(
    protected readonly actions$: Actions,
    protected readonly stateConfig: ObjectStateConfig
  ) {
    const { config } = this.stateConfig;

    for (const object of Object.keys(config) as Array<string>) {
      for (const { action, func } of config[object]) {
        const objectActions = new WithLoadingObjectActions(object, action);

        this.loadObjects$.push(
          createEffect(() =>
            this.actions$.pipe(
              ofType(objectActions.objectAction),
              concatMap(() => {
                const localObject: ObjectType | null = JSON.parse(
                  sessionStorage.getItem(object)!
                );

                //TODO: get args from config trough facade and action
                if (!localObject) {
                  return func.apply().pipe(
                    map((object: ObjectType) => {
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
  }
}
