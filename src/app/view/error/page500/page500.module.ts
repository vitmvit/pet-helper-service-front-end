import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Page500PageRoutingModule } from './page500-routing.module';

import { Page500Page } from './page500.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Page500PageRoutingModule
  ],
  declarations: [Page500Page]
})
export class Page500PageModule {}
