import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import {LeaveTableComponent} from "./leave-table/leave-table.component";
import {AccountValidateComponent} from "./account-validate/account-validate.component";
import {ChatComponent} from "./chat/chat.component";

const appRoutes: Routes = [
  { path: '', component: LeaveTableComponent, canActivate: [AuthGuard] },
  { path: 'login', component: ChatComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'chatlive', component: ChatComponent },
  { path: 'validate', component: AccountValidateComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
