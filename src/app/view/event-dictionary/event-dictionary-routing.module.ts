import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EventDictionaryPage} from './event-dictionary.page';

const routes: Routes = [
  {
    path: '',
    component: EventDictionaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventDictionaryPageRoutingModule {
}
