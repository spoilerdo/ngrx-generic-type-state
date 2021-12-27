import { Component, OnInit } from '@angular/core';
import { LoadObjectFacade } from 'projects/ngrx-g-load-object/src/public-api';
import { ExampleFacade } from '../public-api';
import { Example } from './models/example';

@Component({
  selector: 'lib-examples',
  template: `
    <p>
      examples works!
    </p>
  `,
  styles: [
  ]
})
export class ExamplesComponent implements OnInit {

  constructor(
    private readonly facade: LoadObjectFacade<Example>,
    private readonly extraFacade: ExampleFacade
  ) { }

  ngOnInit(): void {
    this.facade.loadObject();
  }

}
