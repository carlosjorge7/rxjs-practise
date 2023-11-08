import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CachingPageRoutingModule } from './caching-routing.module';

import { CachingPage } from './caching.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CachingPageRoutingModule
  ],
  declarations: [CachingPage]
})
export class CachingPageModule {}
