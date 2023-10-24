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
  concatAll,
  interval,
  map,
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

  ngOnInit(): void {
    this.data$ = this.http.get<Post>(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    this.getCharacter();
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
