import { Injectable } from '@angular/core';
import {
  ObjectStateConfig,
  WithLoadingActions,
} from 'projects/ngrx-g-load-object/src/public-api';
import { Observable } from 'rxjs';
import { ExampleService } from '../example.service';
import { Example } from '../models/example';

@Injectable({
  providedIn: 'root',
})
export class ExampleConfig extends ObjectStateConfig {
  constructor(private readonly exampleService: ExampleService) {
    super({
      ['example']: [
        new WithLoadingActions(exampleService.getExampleById, 'get'),
      ],
    });
  }
}
