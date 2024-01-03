import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { VerProyectoComponent } from './componentes/ver-proyecto/ver-proyecto.component';
import { ImprimirComponent } from './componentes/imprimir/imprimir.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { DashboardSingletonComponent } from './componentes/dashboard-singleton/dashboard-singleton.component';

const routes: Routes = [
  {path: '',redirectTo:'dashboard', pathMatch: 'full'},
  {path: 'dashboard',component:DashboardComponent},
  {path: 'ver-proyecto/:id',component:VerProyectoComponent},
  {path: 'imprimir',component:ImprimirComponent},
  {path: 'login',component:IniciarSesionComponent},
  {path: 'dashboard-singleton', component:DashboardSingletonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
