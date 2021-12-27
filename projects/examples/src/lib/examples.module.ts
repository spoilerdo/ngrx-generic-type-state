import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LoadObjectFacade } from 'projects/ngrx-g-load-object/src/public-api';
import { ExampleEffects, ExampleFacade, fromExample } from '../public-api';
import { ExamplesComponent } from './examples.component';
import { Example } from './models/example';

@NgModule({
  declarations: [
    ExamplesComponent
  ],
  imports: [
    StoreModule.forRoot({ example: fromExample.exampleModuleReducer }),
    EffectsModule.forRoot([ExampleEffects])
  ],
  providers: [
    ExampleFacade,
    LoadObjectFacade
  ],
  exports: [
    ExamplesComponent
  ]
})
export class ExamplesModule { }
