import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Example } from './models/example';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  constructor(private readonly httpClient: HttpClient) { }

  public getExampleById(id: string): Observable<Example> {
    return this.httpClient
      .get("url")
      .pipe(pluck('example'));
  }

  public deleteExampleById(id: string): void {
    this.httpClient.delete('url');
  }
}
