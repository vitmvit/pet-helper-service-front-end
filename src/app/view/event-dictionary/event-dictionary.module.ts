import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {EventDictionaryPageRoutingModule} from './event-dictionary-routing.module';

import {EventDictionaryPage} from './event-dictionary.page';
import {StateDictionaryCreatePageModule} from "../state-dictionary-create/state-dictionary-create.module";
import {CalendarModule} from "ion7-calendar";
import {MbscDatepickerModule} from "@mobiscroll/angular";
import {ColorPickerModule} from 'ngx-color-picker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventDictionaryPageRoutingModule,
    StateDictionaryCreatePageModule,
    CalendarModule,
    MbscDatepickerModule,
    ColorPickerModule
  ],
  declarations: [EventDictionaryPage]
})
export class EventDictionaryPageModule {
}
