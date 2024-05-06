import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Page500Page } from './page500.page';

const routes: Routes = [
  {
    path: '',
    component: Page500Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Page500PageRoutingModule {}
