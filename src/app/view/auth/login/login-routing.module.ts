import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginPage} from './login.page';
import {AuthService} from "../../../service/auth.service";

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class LoginPageRoutingModule {
}
