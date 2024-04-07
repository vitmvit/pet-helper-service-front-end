import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./view/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./view/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'index',
    loadChildren: () => import('./view/index/index.module').then(m => m.IndexPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./view/signup/signup.module').then(m => m.SignupPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
