import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { RegistrarProyectoComponent } from './componentes/registrar-proyecto/registrar-proyecto.component';
import { VerProyectoComponent } from './componentes/ver-proyecto/ver-proyecto.component';
import { InformePDFFactory } from './factory-pattern/informe-pdf.factory';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { ImprimirComponent } from './componentes/imprimir/imprimir.component';
import { DashboardSingletonComponent } from './componentes/dashboard-singleton/dashboard-singleton.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    RegistrarProyectoComponent,
    VerProyectoComponent,
    IniciarSesionComponent,
    ImprimirComponent,
    DashboardSingletonComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{ provide: 'InformeFactory', useClass: InformePDFFactory }],
  bootstrap: [AppComponent]
})
export class AppModule { }
