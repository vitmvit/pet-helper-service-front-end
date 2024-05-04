import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {StateDictionaryPageRoutingModule} from './state-dictionary-routing.module';

import {StateDictionaryPage} from './state-dictionary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StateDictionaryPageRoutingModule
  ],
  declarations: [StateDictionaryPage]
})
export class StateDictionaryPageModule {

}
