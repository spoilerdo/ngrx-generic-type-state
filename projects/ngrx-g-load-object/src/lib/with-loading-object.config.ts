import { Observable } from 'rxjs';

type WithLoadingFunc = () => Observable<any>;

class WithLoadingObject {
  constructor(public func: WithLoadingFunc, public action: string) {}
}

type WithLoadingRecord = Record<string, WithLoadingObject>;

/**
 * To configure the load function used by the effect
 */
export abstract class ObjectStateConfig {
  constructor(public config: WithLoadingRecord) {}
}
