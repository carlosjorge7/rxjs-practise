import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CachingPage } from './caching.page';

const routes: Routes = [
  {
    path: '',
    component: CachingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CachingPageRoutingModule {}
