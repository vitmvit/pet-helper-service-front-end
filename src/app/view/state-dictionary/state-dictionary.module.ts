import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {StateDictionaryPageRoutingModule} from './state-dictionary-routing.module';

import {StateDictionaryPage} from './state-dictionary.page';
import {StateDictionaryCreatePageModule} from "../state-dictionary-create/state-dictionary-create.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StateDictionaryPageRoutingModule,
        StateDictionaryCreatePageModule
    ],
  declarations: [StateDictionaryPage]
})
export class StateDictionaryPageModule {

}
