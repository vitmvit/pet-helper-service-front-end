import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StateDictionaryCreatePage} from './state-dictionary-create.page';

const routes: Routes = [
  {
    path: '',
    component: StateDictionaryCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StateDictionaryCreatePageRoutingModule {
}
