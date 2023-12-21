import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RequestResetPasswordComponent } from '../request-reset-password/request-reset-password.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

   Message:string='';
  loginForm=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
  })
  isLoading:boolean=false;
  constructor( private _AuthService:AuthService,private toastr: ToastrService,private dialog: MatDialog,private router:Router) { }

  ngOnInit() {

  }

  onSubmit(data:FormGroup){
    this.isLoading=true;
    this._AuthService.onlogin(data.value).subscribe({
      next:(res:any)=>{
        console.log(res); 
        this.Message=res.message;

       
               
       localStorage.setItem('userToken',res.token);      
        this._AuthService.getProfile();
       
        
      },error:(err)=>{
        this.isLoading=false;

        this.toastr.error(err.error.message, ' Error!');
   
      },complete:()=>{
        this.isLoading=false;

        this.router.navigate(['/dashboard'])
       // console.log(this.Message);
        
        this.toastr.success(this.Message, 'Login successfully!');


      }
    })
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RequestResetPasswordComponent, {
      data: {},
      width:'40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result){
        this.onResetRequest(result);

      }
      
    });
  }

  onResetRequest(data:string){
    this._AuthService.onRequestRestPassword(data).subscribe({
      next:(res:any)=>{
           console.log(res);
           this.Message=res.message;

      },
      error:(err)=>{
        this.toastr.error(err.error.message, ' Error');

        
      },
      complete:()=>{
        this.toastr.success(this.Message, 'Successfully!');
        this.router.navigate(['/auth/ResetPassword']);
        localStorage.setItem('email',data);

      }
    })
    }

    


    

}
