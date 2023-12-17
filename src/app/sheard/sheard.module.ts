import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SheardComponent } from './sheard.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatSidenavModule} from '@angular/material/sidenav';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HomeComponent } from './home/home.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports:[
    CommonModule,
    
    MatButtonModule, MatDividerModule
    ,MatIconModule,HttpClientModule,FormsModule
    ,MatSidenavModule,ReactiveFormsModule,MatPaginatorModule,NgxDropzoneModule,RouterModule
    ,MatDialogModule],
  declarations: [SheardComponent, SidebarComponent, NavbarComponent, HomeComponent,DeleteDialogComponent],

  exports:[ MatButtonModule,SidebarComponent ,NavbarComponent
    ,HomeComponent,MatDividerModule, MatFormFieldModule,MatIconModule,RouterModule,MatSidenavModule,NgxDropzoneModule,HttpClientModule,DeleteDialogComponent,MatPaginatorModule,ReactiveFormsModule,MatDialogModule,FormsModule
  ]
})
export class SheardModule { }
