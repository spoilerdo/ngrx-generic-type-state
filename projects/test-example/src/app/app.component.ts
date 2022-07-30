import { Component, OnInit } from '@angular/core';
import { LoadObjectFacade } from 'projects/ngrx-g-load-object/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly facade: LoadObjectFacade) {}

  ngOnInit() {
    // this.facade.executeAction('example', 'get', [1]);
    this.facade.executeAction('example', 'delete', [1, true]);
  }
}
