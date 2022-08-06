import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadObjectFacade } from 'projects/ngrx-g-load-object/src/public-api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Example } from './models/example';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly facade: LoadObjectFacade) {}

  ngOnInit() {
    // this.facade
    //   .getObject<Example>('delete')
    //   ?.pipe(takeUntil(this.destroy$))
    //   .subscribe((value) => {
    //     console.log(value);
    //   });

    this.facade.executeAction('example', 'delete', [1, true]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
