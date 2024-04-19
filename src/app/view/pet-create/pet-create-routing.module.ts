import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PetCreatePage} from './pet-create.page';

const routes: Routes = [
  {
    path: '',
    component: PetCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetCreatePageRoutingModule {
}
