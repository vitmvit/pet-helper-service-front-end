import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PedigreeCreatePageRoutingModule} from './pedigree-create-routing.module';

import {PedigreeCreatePage} from './pedigree-create.page';
import {HomePageModule} from "../home/home.module";
import {ListComponentComponent} from "../component/list-component/list-component.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedigreeCreatePageRoutingModule,
    HomePageModule
  ],
  declarations: [PedigreeCreatePage, ListComponentComponent]
})
export class PedigreeCreatePageModule {
}
