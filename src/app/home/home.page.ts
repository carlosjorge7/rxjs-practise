interface Post {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface Response {
  info: Info;
  results: Character[];
}

interface Info {
  count: number;
  pages: number;
  next: string;
  prev: any;
}

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: any;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  Subscription,
  concat,
  filter,
  interval,
  map,
  merge,
  of,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // Cold observable
  data$!: Observable<Post>;
  private readonly http = inject(HttpClient);

  // Hot observable
  cont = 0;
  intervalSubs!: Subscription;

  // High order observables
  private readonly API = 'https://rickandmortyapi.com/api/character';
  dataCharacter$!: Observable<Character>;

  // Operators: map, filter
  numbers1 = of(1, 2, 3, 4, 5, 6);
  numbers2 = of(7, 8, 9);

  // Tipos de operadores

  /**
   * Creacion: of, from, interval
   * Tranformacion: tranforma elmobservable original los valores emituidos; map
   * Filtrado: tranforma el observable original con una condicion: filter
   * Combinación: merge, concat
   * Agrupación: agrupa valores emitidos por un observable. Groupby
   * Error handling: nos permite manejrar errores en observables: retry, catchError
   * Terminal: marcan el final de un observbale: first, last, takeWhile
   */

  ngOnInit(): void {
    this.data$ = this.http.get<Post>(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    this.getCharacter();

    // map tranforma el observable original en otro
    const squaredNumbers = this.numbers1.pipe(map((x) => x * 2));
    console.log('***MAP***');
    squaredNumbers.subscribe((res) => console.log(res));

    // filter pone una condcion para el flujo de dtos del observable
    const paresNumbers = this.numbers1.pipe(filter((x) => x % 2 === 0));
    console.log('***FILTER***');
    paresNumbers.subscribe((res) => console.log(res));

    // merge: une dos observables en uno solo, se revuelven los dos ala vez
    const mergerNumbers = merge(this.numbers1, this.numbers2);
    console.log('***MERGE***');
    mergerNumbers.subscribe((res) => console.log(res));

    // concat: es secuencial, hasta que no se resuelve uno, no empieza la resolucion del otro
    const concatNumbers = concat(this.numbers1, this.numbers2);
    console.log('***CONCAT***');
    concatNumbers.subscribe((res) => console.log(res));
  }

  start() {
    this.intervalSubs = interval(1000).subscribe(
      (value) => (this.cont = value)
    );
  }
  stop() {
    this.intervalSubs.unsubscribe();
  }

  // Higth order observables
  getCharacter() {
    this.dataCharacter$ = this.http.get<Response>(this.API).pipe(
      map((response: Response) => response.results),
      map(() => Math.floor(Math.random() * 20)),
      switchMap((id: number) => this.http.get<Character>(`${this.API}/${id}`))
    );
  }
}
