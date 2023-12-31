import { Component, OnInit, inject } from '@angular/core';
import { Character } from '../utils/utils';
import { Observable } from 'rxjs';
import { RickMortyService } from '../services/rick-morty.service';

@Component({
  selector: 'app-async-pipe',
  templateUrl: './async-pipe.page.html',
  styleUrls: ['./async-pipe.page.scss'],
})
export class AsyncPipePage implements OnInit {
  data$!: Observable<Character[]>;
  private rickMortySvr = inject(RickMortyService);

  ngOnInit() {
    this.data$ = this.rickMortySvr.getData();
  }
}
