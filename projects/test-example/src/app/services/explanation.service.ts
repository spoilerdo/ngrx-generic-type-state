import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Explanation } from '../models/explanation';

@Injectable({
  providedIn: 'root',
})
export class ExplanationService {
  constructor(private readonly httpClient: HttpClient) {}

  public getExplanationById(id: string): Observable<Explanation> {
    console.log(id);
    console.log('get example by id');
    return this.httpClient.get('url').pipe(pluck('explanation'));
  }
}
