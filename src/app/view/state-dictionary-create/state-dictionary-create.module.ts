import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {StateDictionaryCreatePageRoutingModule} from './state-dictionary-create-routing.module';

import {StateDictionaryCreatePage} from './state-dictionary-create.page';
import {DictionaryImageComponent} from "../component/dictionary-image/dictionary-image.component";
import {TemplateImageComponent} from "../component/template-image/template-image.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StateDictionaryCreatePageRoutingModule
  ],
  declarations: [StateDictionaryCreatePage, DictionaryImageComponent, TemplateImageComponent]
})
export class StateDictionaryCreatePageModule {
}
