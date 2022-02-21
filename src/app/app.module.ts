import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';






import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { OrderService } from './services/order.service';
import { AuthService } from './services/auth.service';
import { fakeBackendProvider } from './helpers/fake-backend';
import { AuthGuard } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NotFoundComponent,
    NoAccessComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path:'',
        component: HomeComponent
      },
      {
        path:'admin',
        component: AdminComponent,
        canActivate:[AuthGuard,AdminAuthGuard]
      },
      {
        path:'login',
        component: LoginComponent
      },
      {
        path:'no-access',
        component: NoAccessComponent
      },
      
    ])
  ],
  providers: [
    OrderService,
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    fakeBackendProvider,
    
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
