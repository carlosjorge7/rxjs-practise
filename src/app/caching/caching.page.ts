import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../utils/utils';
import { RickMortyService } from '../services/rick-morty.service';

@Component({
  selector: 'app-caching',
  templateUrl: './caching.page.html',
  styleUrls: ['./caching.page.scss'],
})
export class CachingPage implements OnInit {
  data$!: Observable<Character[]>;
  private rickMortySvr = inject(RickMortyService);

  ngOnInit() {
    this.data$ = this.rickMortySvr.getDataCaching();
  }
}
