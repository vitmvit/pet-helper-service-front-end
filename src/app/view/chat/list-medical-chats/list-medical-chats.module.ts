import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ListMedicalChatsPageRoutingModule} from './list-medical-chats-routing.module';

import {ListMedicalChatsPage} from './list-medical-chats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListMedicalChatsPageRoutingModule,
  ],
  declarations: [ListMedicalChatsPage]
})
export class ListMedicalChatsPageModule {
}
