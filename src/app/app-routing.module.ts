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
    path: 'home/:id',
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
  // pet-create
  {
    path: 'pet-create',
    loadChildren: () => import('./view/pet-create/pet-create.module').then(m => m.PetCreatePageModule)
  },
  // pedigree
  {
    path: 'pedigree',
    loadChildren: () => import('./view/pedigree/pedigree.module').then(m => m.PedigreePageModule)
  },
  {
    path: 'pedigree/:id',
    loadChildren: () => import('./view/pedigree/pedigree.module').then(m => m.PedigreePageModule)
  },
  // pedigree-create
  {
    path: 'pedigree-create',
    loadChildren: () => import('./view/pedigree-create/pedigree-create.module').then(m => m.PedigreeCreatePageModule)
  },
  {
    path: 'pedigree-create/:id',
    loadChildren: () => import('./view/pedigree-create/pedigree-create.module').then(m => m.PedigreeCreatePageModule)
  },
  // list-medical-chats
  {
    path: 'list-medical-chats',
    loadChildren: () => import('./view/chat/list-medical-chats/list-medical-chats.module').then(m => m.ListMedicalChatsPageModule)
  },
  // state-dictionary
  {
    path: 'state-dictionary',
    loadChildren: () => import('./view/state-dictionary/state-dictionary.module').then(m => m.StateDictionaryPageModule)
  },
  {
    path: 'state-dictionary/:id',
    loadChildren: () => import('./view/state-dictionary/state-dictionary.module').then(m => m.StateDictionaryPageModule)
  },
  {
    path: 'state-dictionary/:id/:uuid',
    loadChildren: () => import('./view/state-dictionary/state-dictionary.module').then(m => m.StateDictionaryPageModule)
  },
  // state-dictionary-create
  {
    path: 'state-dictionary-create',
    loadChildren: () => import('./view/state-dictionary-create/state-dictionary-create.module').then(m => m.StateDictionaryCreatePageModule)
  },
  {
    path: 'state-dictionary-create/:id',
    loadChildren: () => import('./view/state-dictionary-create/state-dictionary-create.module').then(m => m.StateDictionaryCreatePageModule)
  },
  {
    path: 'page500',
    loadChildren: () => import('./view/error/page500/page500.module').then(m => m.Page500PageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./view/error/page404/page404.module').then(m => m.Page404PageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
