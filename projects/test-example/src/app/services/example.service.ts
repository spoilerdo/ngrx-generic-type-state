import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Example } from '../models/example';

@Injectable({
  providedIn: 'root',
})
export class ExampleService {
  constructor(private readonly httpClient: HttpClient) {}

  public getExampleById(id: string): Observable<Example> {
    console.log(id);
    console.log('get example by id');
    return this.httpClient.get('url').pipe(pluck('example'));
  }

  public deleteExampleById(id: string, force: boolean): Observable<Object> {
    console.log(id);
    console.log(force);
    console.log('delete example by id');
    return this.httpClient.delete('url');
  }
}
