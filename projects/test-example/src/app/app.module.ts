import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  LoadObjectFacade,
  ObjectStateConfig,
  WithLoadingObjectEffects,
} from 'projects/ngrx-g-load-object/src/public-api';

import * as fromExample from './+state/state.reducer';
import { ExampleConfig } from './+state/state.config';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ExampleService } from './services/example.service';
import { ExplanationService } from './services/explanation.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({ example: fromExample.exampleModuleReducer }),
    EffectsModule.forRoot([WithLoadingObjectEffects]),
  ],
  providers: [
    ExampleService,
    ExplanationService,
    LoadObjectFacade,
    { provide: ObjectStateConfig, useExisting: ExampleConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
