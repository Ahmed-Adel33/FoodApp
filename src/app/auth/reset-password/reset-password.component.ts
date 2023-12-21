import { Component, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import {  MatDialogRef } from '@angular/material/dialog';
import { RequestResetPasswordComponent } from '../request-reset-password/request-reset-password.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],

})
export class ResetPasswordComponent implements OnInit {
  email:string=''
  Message:string=''
  hide:boolean=true;
  hideConfirm:boolean=true
  isLoading:boolean=false;

  userEmail=localStorage.getItem('email');
  ResetForm=new FormGroup({
    email:new FormControl(this.userEmail,[Validators.required,Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$'
      ),
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$'
      ),
    ]),
    seed:new FormControl(null,[Validators.required]),

  });

  constructor( private router:Router ,private _AuthService:AuthService,private toastr: ToastrService, @Optional() public dialogRef:MatDialogRef<RequestResetPasswordComponent>) { }

  ngOnInit() {
  }
  onSubmit(data:FormGroup){
    this.isLoading=true;
    console.log(data);
    this._AuthService.onRestPassword(data.value).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.Message=res.message;

       
        
      },error:(err:any)=>{
        this.isLoading=false;
        this.toastr.error(err.error.message, 'Toastr fun!');


        
      },complete:()=>{
        this.isLoading=false;
        this.router.navigate(['/auth/login']);
        this.toastr.success(this.Message, 'Toastr fun!');


      }
    })
    
    
  }
    

  
  onNoclick(){
    this.dialogRef.close();
  }
   
}


