import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ListMedicalChatsPage} from './list-medical-chats.page';

const routes: Routes = [
  {
    path: '',
    component: ListMedicalChatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListMedicalChatsPageRoutingModule {
}
