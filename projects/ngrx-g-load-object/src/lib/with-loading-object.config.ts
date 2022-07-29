import { Observable } from 'rxjs';

type WithLoadingFunc = (...args: any[]) => Observable<any>;

export class WithLoadingActions {
  constructor(public func: WithLoadingFunc, public action: string) {}
}

type WithLoadingRecord = Record<string, WithLoadingActions[]>;

/**
 * To configure the load function used by the effect
 */
export class ObjectStateConfig {
  constructor(public config: WithLoadingRecord) {}
}
