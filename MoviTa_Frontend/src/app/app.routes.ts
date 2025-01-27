
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';
import {HomeComponent} from './pages/home/home.component';
import {Routes} from '@angular/router';
import {RegistratiComponent} from './pages/registrati/registrati.component';
import {LoginComponent} from './pages/login/login.component';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import {EventsComponent} from './pages/events/events.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children:[
      {path: '', component:HomeComponent},
      {path: 'events', component: EventsComponent}
    ]
    //canActivate:[authGuard] <-- per evitare accessi se non presente il token
  },

  /*{
    path:'admin',
    component:
    children:[]
    canActivate:[authGuard]
  }*/
  {
    path: '',
    component: AuthLayoutComponent,
    children:[
      {path: 'login', component:LoginComponent},
      {path: 'register', component: RegistratiComponent}
    ]
  }
];
