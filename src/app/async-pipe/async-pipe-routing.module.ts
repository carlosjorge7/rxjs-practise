import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsyncPipePage } from './async-pipe.page';

const routes: Routes = [
  {
    path: '',
    component: AsyncPipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsyncPipePageRoutingModule {}
