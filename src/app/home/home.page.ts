import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  Subject,
  Subscription,
  catchError,
  concat,
  concatWith,
  delay,
  filter,
  fromEvent,
  interval,
  map,
  merge,
  of,
  retry,
  single,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
  throwError,
  timestamp,
  withLatestFrom,
} from 'rxjs';
import {
  Character,
  Post,
  User,
  allUsers,
  countryCodes,
  Response,
} from '../utils/utils';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  // switchmap: nos permite cambiar un nuevo observable cada vez que se emite un valor, es como un map + first. Cancela la peticinon anterior
  searchTerm$ = new Subject<string>();
  results$!: Observable<User>;

  constructor() {
    // switchmap
    this.results$ = this.searchTerm$.pipe(
      switchMap((term: string) => this.search$(term))
    );
  }

  private search$(user: string): Observable<User> {
    const found = allUsers.find((item: User) => item.name === user);
    return found ? of(found) : EMPTY;
  }

  // takeunitl: es util para cancelar o compoletar la emision de un observable
  private stop$ = new Subject<number>();
  count = 0;

  // single: pone una condicion en el observable y completa la subscripcion (la cierra)

  // startWith: antes de que se emita ekl observable original, pone un valor inicial

  // fromEvent: Es un operador que permite crear un pbservable a partir de un evento de un elemento html del DOM
  @ViewChild('myButton', { static: true }) myButton!: ElementRef;

  // witLatestFrom
  formProfile!: FormGroup;
  combinedValues$!: Observable<[string, string] | undefined>;
  private readonly fb = inject(FormBuilder);

  // concatWith: se usa para contatenar 2 o mas observables. Es secuencial, hasta que no termina de emitir el observable fuente, no empieza la emision del segundo. Recibe argumernts observables
  apiTodos = 'https://jsonplaceholder.typicode.com/todos';

  // Subject: podemos subscribirnos a el y para emitir valores. Es observable y observer
  subject = new Subject<string>();

  // BehaviorSubject: es como el subject, pero con valor inicial.
  behaviorSubject = new BehaviorSubject<string>('init value');

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

    // Single operatos
    console.log('SINGLE');
    this.dataFlow$
      .pipe(
        single((number: number) => number === 3),
        tap((res) => console.log(res))
      )
      .subscribe();

    console.log('STARTWITH');
    this.dataFlow$
      .pipe(
        startWith(9),
        tap((res) => console.log(res))
      )
      .subscribe();

    console.log('FROMEVENT');
    const document$ = fromEvent(this.myButton.nativeElement, 'click');
    document$.pipe(tap((res) => console.log(res))).subscribe();

    // take: coge los n primeros valores del observable
    console.log('TAKE ');
    this.dataFlow$.pipe(take(2)).subscribe((res) => console.log(res));

    /*combineLatestAll: combina valores de observables
    const clicks = fromEvent(document, 'click');
    const higherOrder = clicks.pipe(
      map(() => interval(Math.random() * 2000).pipe(take(3))),
      take(2)
    );
    const result = higherOrder.pipe(combineLatestAll());

    result.subscribe((x) => console.log(x));*/

    // withLatestFrom: el un observable que combina el valor mas reciente del observable principal con el valor mas reciente de un observable secundario
    this.formProfile = this.fb.group({
      nombre: '',
      apellidos: '',
    });

    this.combinedValues$ = this.formProfile.controls[
      'apellidos'
    ].valueChanges.pipe(
      withLatestFrom(this.formProfile.controls['nombre'].valueChanges)
    );

    // Concact
    this.getTodos()
      .pipe(tap((res) => console.log(res)))
      .subscribe();

    // catch error
    this.getData()
      .pipe(tap((res) => console.log(res)))
      .subscribe({
        error: (error) => {
          console.log(error);
        },
      });
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

  search($event: Event) {
    const element = $event.currentTarget as HTMLIonSearchbarElement;
    this.searchTerm$.next(element.value as string);
  }

  startCount() {
    interval(1000)
      .pipe(
        takeUntil(this.stop$), // Va a emitir valores hasta que se pulse stop
        tap((val: number) => (this.count = val))
      )
      .subscribe((val: number) => console.log(val));
  }

  stopCount() {
    this.stop$.next(0);
  }

  getTodos(): Observable<any> {
    const obs1 = this.http.get(`${this.apiTodos}/1`);
    const obs2 = this.http.get(`${this.apiTodos}/2`);
    return obs1.pipe(concatWith(obs2));
  }

  getData(): Observable<Character[]> {
    return this.http.get<Response>(this.API + 'kj').pipe(
      retry(3),
      map((res: Response) => res.results),
      catchError((error) => of(error))
      // catchError(() => throwError(() => new Error('Algo ha salido mal')))
      // catchError(() => EMPTY)
    );
  }
}
