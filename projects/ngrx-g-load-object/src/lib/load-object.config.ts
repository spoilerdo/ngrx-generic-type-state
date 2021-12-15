import { Observable } from "rxjs";
import { nameof } from "ts-simple-nameof";

export abstract class ObjectStateConfig<ObjectType> {
  objectKey() { return nameof<ObjectType>(o => o); }

  abstract LoadObjectFunc(): Observable<ObjectType>;
}
