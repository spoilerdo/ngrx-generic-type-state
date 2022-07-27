import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  LoadObjectFacade,
  ObjectStateConfig,
} from 'projects/ngrx-g-load-object/src/public-api';
import {
  ExampleConfig,
  ExampleEffects,
  ExampleFacade,
  fromExample,
} from '../public-api';
import { ExamplesComponent } from './examples.component';
import { Example } from './models/example';

@NgModule({
  declarations: [ExamplesComponent],
  imports: [
    StoreModule.forRoot({ example: fromExample.exampleModuleReducer }),
    EffectsModule.forRoot([ExampleEffects]),
  ],
  providers: [
    ExampleFacade,
    LoadObjectFacade,
    { provide: ObjectStateConfig, useExisting: ExampleConfig },
  ],
  exports: [ExamplesComponent],
})
export class ExamplesModule {}
