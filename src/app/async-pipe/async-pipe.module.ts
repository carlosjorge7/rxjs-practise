import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsyncPipePageRoutingModule } from './async-pipe-routing.module';

import { AsyncPipePage } from './async-pipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsyncPipePageRoutingModule
  ],
  declarations: [AsyncPipePage]
})
export class AsyncPipePageModule {}
