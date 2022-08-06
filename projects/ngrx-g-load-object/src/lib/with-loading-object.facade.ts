import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { nameof } from 'ts-simple-nameof';
import { WithLoadingObjectActions } from './with-loading-object.actions';
import { ObjectStateConfig, ObjectType } from './with-loading-object.config';
import { ObjectState } from './with-loading-object.reducer';
import { LoadObjectSelector } from './with-loading-object.selector';

class WithLoadingObjectSelection {
  constructor(
    public object$: Observable<ObjectType | null>,
    public failure$: Observable<Error | null>,
    public isLoading$: Observable<boolean>
  ) {}
}

/**
 * The facade for loading the object
 * Imported in the module to be used
 */
@Injectable()
export class LoadObjectFacade {
  private objectsActions = new Map<string, WithLoadingObjectActions>();
  public objectSelectors = new Map<string, WithLoadingObjectSelection>();

  constructor(
    { config, keys }: ObjectStateConfig,
    private readonly objectStore: Store<ObjectState<any>>
  ) {
    for (const object of keys) {
      for (const { action, type } of config[object]) {
        this.objectsActions.set(
          `${object} ${action}`,
          new WithLoadingObjectActions(object, action, type)
        );

        const selector = new LoadObjectSelector(object, action, type);
        this.objectSelectors.set(
          `${object} ${action}`,
          new WithLoadingObjectSelection(
            this.objectStore.select(selector.getObject),
            this.objectStore.select(selector.getFailure),
            this.objectStore.select(selector.isLoading)
          )
        );
      }
    }
  }

  public getObject<T>(action: string) {
    const selected = this.objectSelectors.get(
      `${nameof<T>((o) => o)} ${action}`
    );
    return selected ? (selected.object$ as Observable<T>) : null;
  }

  public getFailure<T>(action: string) {
    const selected = this.objectSelectors.get(
      `${nameof<T>((o) => o)} ${action}`
    );
    return selected ? selected.failure$ : null;
  }

  public getIsLoading<T>(object: string, action: string) {
    const selected = this.objectSelectors.get(
      `${nameof<T>((o) => o)} ${action}`
    );
    return selected ? selected.isLoading$ : null;
  }

  public executeAction(object: string, action: string, args: any[]) {
    const withLoading = this.objectsActions.get(`${object} ${action}`);
    withLoading
      ? this.objectStore.dispatch(withLoading.objectAction(args))
      : console.error(
          `no action found with specified action (${action}) and object (${object}) `
        );
  }
}
