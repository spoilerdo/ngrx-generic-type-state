import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WithLoadingObjectActions } from './with-loading-object.actions';
import { ObjectStateConfig } from './with-loading-object.config';
import { ObjectState } from './with-loading-object.reducer';
import { LoadObjectSelector } from './with-loading-object.selector';

class WithLoadingObjectSelection {
  constructor(
    public object$: Observable<any | null>,
    public failure$: Observable<Error | null>,
    public isLoading$: Observable<boolean>
  ) {}
}

/**
 * The facade for loading the object
 * Imported in the module to be used
 */
@Injectable()
export class LoadObjectFacade<ObjectType> {
  private objectsActions = new Map<string, WithLoadingObjectActions>;
  public objectSelectors = new Map<string, WithLoadingObjectSelection>;

  constructor(
    { config }: ObjectStateConfig,
    private readonly objectStore: Store<ObjectState<ObjectType>>
  ) {
    for (const object of Object.keys(config) as Array<string>) {
      for (const { action } of config[object]) {
        this.objectsActions.set(`${object} ${action}`, new WithLoadingObjectActions(object, action));

        const selector = new LoadObjectSelector(object, action);
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

  public getObject(object: string, action: string) {
    const selected = this.objectSelectors.get(`${object} ${action}`);
    selected ? selected.object$ : null;
  }

  public getFailure(object: string, action: string) {
    const selected = this.objectSelectors.get(`${object} ${action}`);
    selected ? selected.failure$ : null;
  }

  public getIsLoading(object: string, action: string) {
    const selected = this.objectSelectors.get(`${object} ${action}`);
    selected ? selected.isLoading$ : null;
  }

  public executeAction(object: string, action: string, args: any[]) {
    const withLoading = this.objectsActions.get(`${object} ${action}`);
    withLoading ? this.objectStore.dispatch(withLoading.objectAction(args)) : console.error(`no action found with specified action (${action}) and object (${object}) `)
  }
}
