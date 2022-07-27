import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadObjectActions } from './with-loading-object.actions';
import { ObjectState } from './load-object.reducer';
import { LoadObjectSelector } from './load-object.selector';

class LoadObjectSelection<ObjectType> {
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
export class LoadObjectFacade<ObjectType> {
  private selector: LoadObjectSelector<ObjectType>;
  private objectActions: LoadObjectActions<ObjectType>;

  public loadObjectSelector: LoadObjectSelection<ObjectType>[];

  constructor(private objectStore: Store<ObjectState<ObjectType>>) {
    this.selector = new LoadObjectSelector<ObjectType>();
    this.objectActions = new LoadObjectActions<ObjectType>();

    this.object$ = this.objectStore.select(this.selector.getObject);
    this.failure$ = this.objectStore.select(this.selector.getFailure);
    this.isLoading$ = this.objectStore.select(this.selector.isLoading);
  }

  public loadObject(): void {
    this.objectStore.dispatch(this.objectActions.loadObject());
  }
}
