import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent  {
  Message:string=''
  hideConfirm:boolean=true
  hide:boolean=true
  isLoading:boolean=false;
  useremail=localStorage.getItem('email');
  userEmail = localStorage.getItem('email');
  changePasswordForm = new FormGroup({
    oldPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$'
      ),
    ]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$'
      ),
    ]),
    confirmNewPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$'
      ),
    ]),
  });
  constructor(private _AuthService:AuthService,private  toastr: ToastrService) { }


  
  // matchpassword(form:any){
  //   let NewPassword=form.get('NewPassword');
  //   let confirmNewPassword =form.get('confirmNewPassword');
  //   if(NewPassword.value==confirmNewPassword.value){
  //     return null;
  //   }else{
  //     confirmNewPassword.setErrors({invalid:'pass w repass  not match'});
  //     return {invalid:'pass w repass'};
  //   }
  // }

  onSubmit(data:FormGroup){
    this.isLoading=true;
    console.log(data);
   // this.matchpassword(data);           
   return  this._AuthService.onChangePassword(data.value).subscribe({
        next:(res)=>{
             console.log(res);
             this.Message=res.message;

             
        },
        error:(err)=>{
          this.isLoading=false;
          this.toastr.error(err.error.message, ' Error');
    
          
        },
        complete:()=>{
          this.isLoading=false;
          this.toastr.success( this.Message,'Successfully');
         
    
        }
    
      })
    }
    
  }

 
  
