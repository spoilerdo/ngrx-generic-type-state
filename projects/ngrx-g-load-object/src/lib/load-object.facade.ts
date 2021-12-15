import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { LoadObjectActions } from "./load-object.action";
import { ObjectState } from "./load-object.reducer";
import { LoadObjectSelector } from "./load-object.selector";

@Injectable()
export class LoadObjectFacade<ObjectType> {
  private selector: LoadObjectSelector<ObjectType>;
  private objectActions: LoadObjectActions<ObjectType>;

  public object$: Observable<ObjectType>;
  public failure$: Observable<Error>;
  public isLoading$: Observable<boolean>;

  constructor(
    private objectStore: Store<ObjectState<ObjectType>>
  ) {
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
