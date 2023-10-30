import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  Subscription,
  concat,
  delay,
  filter,
  interval,
  map,
  merge,
  of,
  switchMap,
  tap,
  timestamp,
} from 'rxjs';
import {
  Character,
  Post,
  User,
  allUsers,
  countryCodes,
  Response,
} from '../utils/utils';

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

  // tap operator
  dataFlow$ = of(1, 2, 3, 4, 5);

  // map operatos
  users: User[] = [];

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

    // tap: es un ESPEJO de la fuente de datos anterior. Nos ayuda a debuggear
    console.log('*** TAP ***');
    this.dataFlow$
      .pipe(
        map((number: number) => number * number),
        tap((res: number) => res * res),
        tap((res: number) => console.log(res))
      )
      .subscribe();

    // delay: retrasa la emision de la fuente un tiempo determinado
    console.log('***DELAY***');
    this.dataFlow$
      .pipe(
        delay(5000),
        tap((res) => console.log(res))
      )
      .subscribe();

    // timestamp: añade marcas temporales en cada uno de los valores del observable
    console.log('***TIMESTAMP***');
    this.dataFlow$
      .pipe(
        timestamp(),
        tap((res) => console.log(res))
      )
      .subscribe();

    /**
     * Queremos tranformar los codes de las country a el nombre
     */
    // map: para tranformar el observable original
    this.getUsers()
      .pipe(
        tap((users: User[]) => console.log('users')),
        map((users) => {
          return users.map((user: User) => ({
            ...user,
            countryName: countryCodes[user.location.country] || 'Undefinde',
          }));
        }),
        tap((users: User[]) => (this.users = users))
      )
      .subscribe();
  }

  start() {
    this.intervalSubs = interval(1000).subscribe(
      (value) => (this.cont = value)
    );
  }
  stop() {
    this.intervalSubs.unsubscribe();
  }

  getUsers(): Observable<User[]> {
    return of(allUsers);
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
