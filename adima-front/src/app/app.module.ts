// noinspection TsLint

import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BaseRequestOptions} from '@angular/http';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MockBackend} from '@angular/http/testing';
import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {Router} from '@angular/router';
import { ReactiveFormsModule }    from '@angular/forms';

// Components
import {AlertComponent} from './_directives/index';
import {HomeComponent} from './home/index';
import {LoginComponent} from './login/index';
import {RegisterComponent} from './register/index';
import {LeaveTableComponent} from './leave-table/leave-table.component';
// Custom Injectable
import {AuthGuard, TokenInterceptor} from './_guards/index';
import {AlertService, AuthenticationService, AgendaService, UserService} from './_services/index';
import {fakeBackendProvider} from './_helpers/index';
import {AccountValidateComponent} from './account-validate/account-validate.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
     ReactiveFormsModule,
    routing

  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    LeaveTableComponent,
    AccountValidateComponent
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    AgendaService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
