import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EventDictionaryCreatePage} from './event-dictionary-create.page';

const routes: Routes = [
  {
    path: '',
    component: EventDictionaryCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventDictionaryCreatePageRoutingModule {
}
