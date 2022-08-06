import { Injectable } from '@angular/core';
import {
  ObjectStateConfig,
  WithLoadingActions,
} from 'projects/ngrx-g-load-object/src/public-api';
import { Example } from '../models/example';
import { Explanation } from '../models/explanation';
import { ExampleService } from '../services/example.service';

@Injectable({
  providedIn: 'root',
})
export class ExampleConfig extends ObjectStateConfig {
  constructor(readonly exampleService: ExampleService) {
    super({
      ['Example']: [
        new WithLoadingActions(
          Example,
          (id: string) => exampleService.getExampleById(id),
          'get'
        ),
        new WithLoadingActions(
          Example,
          (id: string, force: boolean) =>
            exampleService.deleteExampleById(id, force),
          'delete'
        ),
      ],
      ['Explanation']: [
        new WithLoadingActions(
          Explanation,
          (id: string) => exampleService.getExampleById(id),
          'get'
        ),
      ],
    });

    console.log(exampleService);
  }
}
