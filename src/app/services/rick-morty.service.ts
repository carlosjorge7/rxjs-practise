import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, catchError, map, retry, share } from 'rxjs';
import { Character, ResponseInforResult } from 'src/app/utils/utils';

@Injectable({
  providedIn: 'root',
})
export class RickMortyService {
  private readonly http = inject(HttpClient);

  getData(): Observable<Character[]> {
    return this.http
      .get<ResponseInforResult>('https://rickandmortyapi.com/api/character')
      .pipe(
        retry(1),
        map((res: ResponseInforResult) => res.results),
        catchError(() => EMPTY)
      );
  }

  // Cachea 3 peticiones en 1
  getDataCaching(): Observable<Character[]> {
    return this.http
      .get<ResponseInforResult>('https://rickandmortyapi.com/api/character')
      .pipe(
        map((res: ResponseInforResult) => res.results),
        share(),
        catchError(() => EMPTY)
      );
  }
}
