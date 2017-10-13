import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { appRoutingProviders, routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//se importa el modulo creado
import { EmailModuleModule } from './emailmodule/emailmodule.module';
import { AdminModule } from './admin/admin.module';

//componentes
import { AppComponent } from './app.component';
import { SimpleTinyComponent } from './components/simple-tiny/simple-tiny.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ParquesComponent } from './components/parques/parques.component';

import { HomeComponent } from './components/home/home.component';
import { KeepersComponent } from './components/keepers/keepers.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

//servicios
// import {UserService} from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    TiendaComponent,
    ParquesComponent,
    HomeComponent,
    KeepersComponent,
    AnimalsComponent,
    ContactComponent,
    SimpleTinyComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    EmailModuleModule,
    AdminModule,
    BrowserAnimationsModule
  ],
  providers: [
    appRoutingProviders
    // UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
