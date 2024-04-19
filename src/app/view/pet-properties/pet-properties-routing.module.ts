import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PetPropertiesPage} from './pet-properties.page';

const routes: Routes = [
  {
    path: '',
    component: PetPropertiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetPropertiesPageRoutingModule {
}
