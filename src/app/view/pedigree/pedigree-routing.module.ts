import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PedigreePage} from './pedigree.page';

const routes: Routes = [
  {
    path: '',
    component: PedigreePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedigreePageRoutingModule {
}
