import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/auth.guard';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
