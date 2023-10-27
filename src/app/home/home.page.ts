const countryCodes: { [key: string]: string } = {
  nz: 'New Zealand',
  nl: 'Netherlands',
  ca: 'Canada',
  ua: 'Ukraine',
};

export interface Location {
  city: string;
  country: string;
  postcode: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  location: Location;
  countryName?: string;
}

export const users = [
  {
    id: 1,
    name: 'Aubree Ennis',
    email: 'aubree@example.com',
    phone: '(209)-062-0668"',
    gender: 'male',
    location: {
      city: 'Dunedin',
      country: 'nz',
      postcode: '64183',
    },
  },
  {
    id: 2,
    name: 'Annabelle Andersons',
    email: 'andersons@example.com',
    phone: '(250) 555-0199',
    gender: 'female',
    location: {
      city: 'Cochrane',
      country: 'ca',
      postcode: 'E4Y 1C2',
    },
  },
  {
    id: 3,
    name: 'Vitaliya Shimanovskogo',
    email: 'vitaliya@example.com',
    phone: '(098) 529-6958',
    gender: 'female',
    location: {
      city: 'Berezhani',
      country: 'ua',
      postcode: '21296',
    },
  },
  {
    id: 4,
    name: 'Noah Côté',
    email: 'noah@example.com',
    phone: '(020) 9492532',
    gender: 'female',
    location: {
      city: 'Loosbroek',
      country: 'nl',
      postcode: '1393 EY',
    },
  },
];

interface Post {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  country?: string;
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
    // this.getUsers()
    //   .pipe(
    //     tap((allUsers: User[]) => console.log('users')),
    //     map(allUsers=>{
    //       allUsers.map((user: User)=> ({

    //       }))
    //     }),
    //     tap((allUsers: User[]) => (this.users = allUsers))
    //   )
    //   .subscribe();
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
    return of(users);
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
