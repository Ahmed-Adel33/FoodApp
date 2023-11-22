import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';

interface IMenu{
  title:string,
  icon:string,
  link:string,
  isActive:boolean,
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isOpened:boolean=true;
  

  constructor( private  _AuthService:AuthService,private router:Router,private dialog: MatDialog) {



   }

  ngOnInit() {
  }

  isAdmin():boolean{
   return this._AuthService.role=='SuperAdmin'?true:false
  }

  isUser():boolean{
    return this._AuthService.role=='SystemUser'?true:false
   }
menu:IMenu[]=[
  {
    title:'Home',
    icon:'fa-solid fa-house',
    link:'/dashboard/home',
    isActive:this.isAdmin()||this.isUser()
  },
  {
    title:'Users',
    icon:'fa-solid fa-user-group',
    link:'/dashboard/admin/users',
    isActive:this.isAdmin()
  },
  {
    title:'Recipes',
    icon:'fa-solid fa-bowl-food',
    link:'/dashboard/admin/recipes',
    isActive:this.isAdmin()
  },
  {
    title:'Categories',
    icon:'fa-solid fa-calendar-days',
    link:'/dashboard/admin/categories',
    isActive:this.isAdmin()
  },
  {
    title:'User Recipes',
    icon:'fa-solid fa-calendar-days',
    link:'/dashboard/admin/categories',
    isActive:this.isUser()
  },
  {
    title:'favoriets',
    icon:'fa-solid fa-calendar-days',
    link:'/dashboard/admin/categories',
    isActive:this.isUser()
  },
]

logout(){
 localStorage.removeItem('role');
 localStorage.removeItem('userToken');
 localStorage.removeItem('userName');
 this.router.navigate(['/auth'])

}


openDialog(): void {
  const dialogRef = this.dialog.open(ChangePasswordComponent, {
    data: {},
    width:'40%'
  });

  dialogRef.afterClosed().subscribe((result: any) => {
    console.log('The dialog was closed');
    console.log(result);
    
  });
}


}
