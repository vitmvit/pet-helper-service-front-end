import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PetPropertiesPageRoutingModule} from './pet-properties-routing.module';

import {PetPropertiesPage} from './pet-properties.page';
import {ImageComponentComponent} from "../component/image-component/image-component.component";
import {HomePageModule} from "../home/home.module";
import {StateComponentComponent} from "../component/state-component/state-component.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetPropertiesPageRoutingModule,
    HomePageModule
  ],
  exports: [
    ImageComponentComponent
  ],
  declarations: [PetPropertiesPage, ImageComponentComponent, StateComponentComponent]
})
export class PetPropertiesPageModule {
}
