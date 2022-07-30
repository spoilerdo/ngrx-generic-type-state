import { Injectable } from '@angular/core';
import {
  ObjectStateConfig,
  WithLoadingActions,
} from 'projects/ngrx-g-load-object/src/public-api';
import { ExampleService } from '../services/example.service';

@Injectable({
  providedIn: 'root',
})
export class ExampleConfig extends ObjectStateConfig {
  constructor(readonly exampleService: ExampleService) {
    super({
      ['example']: [
        new WithLoadingActions(
          (id: string) => exampleService.getExampleById(id),
          'get'
        ),
        new WithLoadingActions(
          (id: string, force: boolean) =>
            exampleService.deleteExampleById(id, force),
          'delete'
        ),
      ],
      ['explanation']: [
        new WithLoadingActions(
          (id: string) => exampleService.getExampleById(id),
          'get'
        ),
      ],
    });

    console.log(exampleService);
  }
}
