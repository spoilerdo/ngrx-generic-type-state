import { Injectable } from '@angular/core';
import { ObjectStateConfig } from 'projects/ngrx-g-load-object/src/public-api';
import { Observable } from 'rxjs';
import { ExampleService } from '../example.service';
import { Example } from '../models/example';

@Injectable({
  providedIn: 'root',
})
export class ExampleConfig extends ObjectStateConfig<Example> {
  constructor(private readonly exampleService: ExampleService) {
    super();
  }

  loadObjectFunc(): Observable<Example> {
    return this.exampleService.getExampleById('give-id');
  }
}
