import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ChatPageRoutingModule} from './chat-routing.module';

import {ChatPage} from './chat.page';
import {DateFormatPipe} from "../../../service/date.format";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule
  ],
  exports: [
    DateFormatPipe
  ],
  declarations: [ChatPage, DateFormatPipe]
})
export class ChatPageModule {
}
