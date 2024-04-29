import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PedigreeCreatePage} from './pedigree-create.page';

const routes: Routes = [
  {
    path: '',
    component: PedigreeCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedigreeCreatePageRoutingModule {
}
