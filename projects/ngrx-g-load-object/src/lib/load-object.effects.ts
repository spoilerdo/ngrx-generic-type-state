import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, concatMap, map } from "rxjs/operators";
import { LoadObjectActions } from "./load-object.action";
import { ObjectStateConfig } from "./load-object.config";

@Injectable()
export class LoadObjectEffects<ObjectType> {
  private objectActions;

  loadObject$: unknown;

  constructor(
    protected readonly actions$: Actions,
    protected readonly config: ObjectStateConfig<ObjectType>,
  ) {
    this.objectActions = new LoadObjectActions();

    this.loadObject$ = createEffect(() =>
      this.actions$.pipe(
        ofType(this.objectActions.loadObject),
        concatMap(() => {
          const localObject: ObjectType | null = JSON.parse(sessionStorage.getItem(this.config.objectKey())!);

          if (!localObject) {
            return this.config.LoadObjectFunc().pipe(
              map((object: ObjectType) => {
                return this.objectActions.loadObjectSuccess({ object })
              }),
              catchError((error: Error) => of(this.objectActions.loadObjectFailure({ failure: error })))
            );
          }

          return of(this.objectActions.loadObjectSuccess({ object: localObject }));
        })
      )
    );
  }
}
