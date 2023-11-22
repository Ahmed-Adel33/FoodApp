import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { SheardModule } from '../sheard/sheard.module';


const routes:Routes=[
  {path:'',component:UserComponent},
]

@NgModule({
  
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SheardModule,
  ],
  declarations:[]
})
export class UserModule { }
