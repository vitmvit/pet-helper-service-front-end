import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {EventDictionaryCreatePageRoutingModule} from './event-dictionary-create-routing.module';

import {EventDictionaryCreatePage} from './event-dictionary-create.page';
import {StateDictionaryCreatePageModule} from "../state-dictionary-create/state-dictionary-create.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventDictionaryCreatePageRoutingModule,
    StateDictionaryCreatePageModule
  ],
  declarations: [EventDictionaryCreatePage]
})
export class EventDictionaryCreatePageModule {
}
