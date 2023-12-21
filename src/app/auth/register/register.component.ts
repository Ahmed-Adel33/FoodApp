import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestResetPasswordComponent } from '../request-reset-password/request-reset-password.component';
import { AuthService } from '../services/auth.service';
import { VerifyComponent } from '../verify/verify.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  imgSrc:any;
  hide:boolean=true;
  hideConfirm:boolean=true
  Message:string='';
  isLoading:boolean=false;
  registerForm=new FormGroup({
    userName:new FormControl(null,[Validators.required]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    country:new FormControl(null,[Validators.required]),
    phoneNumber:new FormControl(null,[Validators.required,Validators.pattern('^01[0-2,5]{1}[0-9]{8}$')]),
    profileImage:new FormControl(null,[Validators.required]),
    password:new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
    confirmPassword:new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),

  },{validators:this.matchpasswords})
  constructor( private _AuthService:AuthService,private toastr: ToastrService,private dialog: MatDialog,private router:Router) { }

  matchpasswords(form:any){
    let pass=form.get('password');
    let confirmpass=form.get('confirmPassword');
    if(pass.value==confirmpass.value){
      return null;
    }else{
      confirmpass.setErrors({invalid:'pass w repass  not match'});
      return {invalid:'pass w repass'};
    }
  }
  ngOnInit() {
  }

  onSubmit(data:FormGroup){
    this.isLoading=true;
    let mydata=new FormData();
    mydata.append('userName',data.value.userName);
    mydata.append('email',data.value.email);
    mydata.append('country',data.value.country);
    mydata.append('phoneNumber',data.value.phoneNumber);
    mydata.append('profileImage',this.imgSrc,this.imgSrc.name);


    mydata.append('password',data.value.password);

    mydata.append('confirmPassword',data.value.confirmPassword);
   

    
    

    this._AuthService.onRegister(mydata).subscribe({
      next:(res:any)=>{
        console.log(res.message);
        this.Message=res.message;
        
       
        
      },error:(err)=>{
        this.isLoading=false;
        this.toastr.error(err.error.message, ' Error!');


        
      },complete:()=>{
        this.isLoading=false;
         this.openDialog()        
        this.toastr.success(this.Message, 'successfully!');


      }
    })
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VerifyComponent, {
      data: {},
      width:'40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      // this.onResetRequest(result);
      
    });
  }

  onResetRequest(data:string){
      
       
    this._AuthService.onRequestRestPassword(data).subscribe({
      next:(res)=>{
           console.log(res);
           
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
    files: File[] = [];

    onSelect(event:any) {
      console.log(event);
      this.imgSrc=event.addedFiles[0];
      this.files.push(...event.addedFiles);
    }
    
    onRemove(event:any) {
      console.log(event);
      this.files.splice(this.files.indexOf(event), 1);
    }
    

}
