import { Observable } from 'rxjs';

type WithLoadingFunc = () => Observable<any>;

class WithLoadingActions {
  constructor(public func: WithLoadingFunc, public action: string) {}
}

type WithLoadingRecord = Record<string, WithLoadingActions[]>;

/**
 * To configure the load function used by the effect
 */
export abstract class ObjectStateConfig {
  constructor(public config: WithLoadingRecord) {}
}
