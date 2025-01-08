import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegistratiComponent } from "./pages/registrati/registrati.component";
import { DetailsComponent } from "./pages/details/details.component";
const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login Page'
    },
    {
        path: 'registrati',
        component: RegistratiComponent,
        title: 'Registrati Page'
    },
    {
        path: 'dettagliEvento',
        component: DetailsComponent,
        title: 'Dettagli Evento'
    }
];

export default routeConfig;