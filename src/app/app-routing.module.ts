import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/auth.guard';
import { ProfileGuard } from 'src/profile.guard';
import { ErrorComponent } from './error/error.component';
import { FindFriendsComponent } from './find-friends/find-friends.component';
import { HomeGuard } from './home.guard';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MessengerComponent } from './messenger/messenger.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [HomeGuard]},
  {path: 'home', component: HomeComponent, canActivate: [HomeGuard]},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'logout', component: LogoutComponent},
  {path: 'profile/:id', component: ProfileComponent, canActivate: [ProfileGuard]},
  {path: 'messenger/:id', component: MessengerComponent, canActivate: [ProfileGuard]},
  {path: 'findFriends/:id', component: FindFriendsComponent, canActivate: [ProfileGuard]},
  {path: '**', component: ErrorComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
