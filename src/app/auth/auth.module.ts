import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SheardModule } from '../sheard/sheard.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RequestResetPasswordComponent } from './request-reset-password/request-reset-password.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { ChangepasswordComponent } from '../admin/changepassword/changepassword.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'}, 
  
  {path:'login',component:LoginComponent},
  {path:'ResetPassword',component:ResetPasswordComponent},
  {path:'register',component:RegisterComponent },
  {path:'changepassword',component:ChangepasswordComponent},




];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SheardModule
  ],
  declarations: [AuthComponent,ChangepasswordComponent,LoginComponent,ResetPasswordComponent,RequestResetPasswordComponent,RegisterComponent,VerifyComponent],
})
export class AuthModule { }
