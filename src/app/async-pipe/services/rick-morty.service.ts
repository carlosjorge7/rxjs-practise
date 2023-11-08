import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, catchError, map, of, retry } from 'rxjs';
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
}
