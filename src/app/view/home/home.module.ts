import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import {HomePageRoutingModule} from './home-routing.module';
import {PetPropertiesPageModule} from "../pet-properties/pet-properties.module";
import {CardComponentComponent} from "../component/card-component/card-component.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    PetPropertiesPageModule
  ],
  exports: [
    CardComponentComponent
  ],
  declarations: [HomePage, CardComponentComponent]
})
export class HomePageModule {}
