import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PedigreePageRoutingModule} from './pedigree-routing.module';

import {PedigreePage} from './pedigree.page';
import {PetPropertiesPageModule} from "../pet-properties/pet-properties.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedigreePageRoutingModule,
    PetPropertiesPageModule
  ],
  declarations: [PedigreePage]
})
export class PedigreePageModule {
}
