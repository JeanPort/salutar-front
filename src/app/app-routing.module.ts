import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { MainComponent } from './componentes/main/main.component';
import { FichapacienteComponent } from './componentes/fichapaciente/fichapaciente.component';

const routes: Routes = [
  {path:"", component: LoginComponent},
  {path:"main", component: MainComponent},
  {path:"ficha", component:FichapacienteComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
