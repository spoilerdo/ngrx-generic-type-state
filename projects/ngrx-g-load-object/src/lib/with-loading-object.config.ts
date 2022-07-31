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
  public keys: string[];
  constructor(public config: WithLoadingRecord) {
    this.keys = Object.keys(this.config) as Array<string>;
  }

  static getType(obj: string, keys: string[]): any | undefined {
    console.log(keys);
    console.log(obj);
    const key = keys.find((v) => v === obj);
    // if (key) {
    //   console.log(key);
    //   console.log(window);
    //   console.log((<any>window)[key]);
    //   return new (<any>window)[key]();
    // }

    return undefined;
  }
}
