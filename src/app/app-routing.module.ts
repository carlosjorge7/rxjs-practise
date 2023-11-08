import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'unsubscribe',
    loadChildren: () =>
      import('./unsubscribe/unsubscribe.module').then(
        (m) => m.UnsubscribePageModule
      ),
  },
  {
    path: 'async-pipe',
    loadChildren: () => import('./async-pipe/async-pipe.module').then( m => m.AsyncPipePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
