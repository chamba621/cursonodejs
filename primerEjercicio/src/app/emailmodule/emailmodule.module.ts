//elementos necesarios para crear modulos
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
//componentes
import {GuardarEmailComponent} from './components/guardar-email/guardar-email.component';
import {MostrarEmailComponent} from './components/mostrar-email/mostrar-email.component';
import {MainEmailComponent} from './components/main-email/main-email.component';
//generar modulo con array de configuracion
//decorador NgModule para cargar componentes y configuracion del modulo

@NgModule({
	imports: [
		CommonModule,
		FormsModule
	],
	declarations: [
		GuardarEmailComponent,
		MostrarEmailComponent,
		MainEmailComponent
	],
	exports: [ //componente principal, componente que se pueda usar fuera del modulo
		MainEmailComponent
	]
})
export class EmailModuleModule{ }