import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StateDictionaryPage} from './state-dictionary.page';

const routes: Routes = [
  {
    path: '',
    component: StateDictionaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StateDictionaryPageRoutingModule {
}
