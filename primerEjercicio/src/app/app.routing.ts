import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//componentes
import { TiendaComponent } from './components/tienda/tienda.component';
import { HomeComponent } from './components/home/home.component';
import { KeepersComponent } from './components/keepers/keepers.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
	// {path:'', component: TiendaComponent},
	// {path:'', redirectTo: 'tienda', pathMatch: 'full'},
	{path:'tienda', component: TiendaComponent},
	{path:'', component: HomeComponent},
	// {path:'', redirectTo: 'inicio', pathMatch: 'full'},
	{path:'inicio', component: HomeComponent},
	{path:'cuidadores', component: KeepersComponent},
	{path:'animales', component: AnimalsComponent},
	{path:'contacto', component: ContactComponent},
	{path:'registro', component: RegisterComponent},
	{path:'login', component: LoginComponent},
	{path:'**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);