import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';
import {HomeComponent} from './pages/home/home.component';
import {Routes} from '@angular/router';
import {RegistratiComponent} from './pages/registrati/registrati.component';
import {LoginComponent} from './pages/login/login.component';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import {EventsComponent} from './pages/events/events.component';
import {DetailsComponent} from './pages/details/details.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {PaymentComponent} from './pages/payment/payment.component';
import {SearchFriendsComponent} from './pages/search-friends/search-friends.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {authGuard} from './guard/auth.guard';
import {CreateEventComponent} from './pages/profile/create-event/create-event.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import { EventBookingComponent } from './pages/event-booking/event-booking.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children:[
      {path: '', component: HomeComponent},
      {path: 'events', component: EventsComponent},
      {path: 'event-details/:id', component: DetailsComponent},
      {path:'profile/:id', component: ProfileComponent},
      {path: 'payments/:id', component: PaymentComponent },
      {path: 'search-users', component: SearchFriendsComponent},
      {path: 'create-event', component: CreateEventComponent},
      {path: 'profile/settings/:id', component: SettingsComponent},
      {path: 'event-booking/:id', component: EventBookingComponent },
    ],
    canActivate:[authGuard],
    canActivateChild:[authGuard]
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
      {path: 'register', component: RegistratiComponent},
    ]
  },
  { path: '**', component: NotFoundComponent }
];
