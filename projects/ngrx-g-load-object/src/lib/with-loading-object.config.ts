import { Observable } from 'rxjs';

type WithLoadingFunc = (...args: any[]) => Observable<any>;

export class WithLoadingActions<ObjectType> {
  constructor(
    public type: ObjectType,
    public func: WithLoadingFunc,
    public action: string
  ) {}
}

export type ObjectType = any;

type WithLoadingRecord = Record<string, WithLoadingActions<ObjectType>[]>;

/**
 * To configure the load function used by the effect
 */
export class ObjectStateConfig {
  public keys: string[];
  constructor(public config: WithLoadingRecord) {
    this.keys = Object.keys(this.config) as Array<string>;
  }
}
