import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

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
    loadChildren: () => import('./view/auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'index',
    loadChildren: () => import('./view/index/index.module').then(m => m.IndexPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./view/auth/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'list-chats',
    loadChildren: () => import('./view/chat/list-chats/list-chats.module').then(m => m.ListChatsPageModule)
  },
  // chat
  {
    path: 'chat',
    loadChildren: () => import('./view/chat/chat/chat.module').then(m => m.ChatPageModule)
  },
  {
    path: 'chat/:id',
    loadChildren: () => import('./view/chat/chat/chat.module').then(m => m.ChatPageModule)
  },
  {
    path: 'chat-list',
    loadChildren: () => import('./view/chat/chat/chat.module').then(m => m.ChatPageModule)
  },
  // security
  {path: '', redirectTo: 'chat-list', pathMatch: 'full'},
  {
    path: 'security',
    loadChildren: () => import('./view/security/security.module').then(m => m.SecurityPageModule)
  },
  // pet-properties
  {
    path: 'pet-properties',
    loadChildren: () => import('./view/pet-properties/pet-properties.module').then(m => m.PetPropertiesPageModule)
  },
  {
    path: 'pet-properties/:id',
    loadChildren: () => import('./view/pet-properties/pet-properties.module').then(m => m.PetPropertiesPageModule)
  },
  {
    path: 'pet-properties',
    loadChildren: () => import('./view/pet-properties/pet-properties.module').then(m => m.PetPropertiesPageModule)
  },
  {
    path: 'pet-create',
    loadChildren: () => import('./view/pet-create/pet-create.module').then(m => m.PetCreatePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
