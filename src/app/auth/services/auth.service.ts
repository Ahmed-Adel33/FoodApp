import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { ILogin } from 'src/app/models/login';
import { NgxSpinnerService } from 'ngx-spinner';

HttpClient
@Injectable({
  providedIn: 'root'
})
export class AuthService {
role:string|null='';
constructor(private _HttpClient:HttpClient) {
  if(localStorage.getItem('userToken')!==null){
    this.getProfile();
  }
  
 }

onlogin(data:ILogin){
  return this._HttpClient.post('Users/Login',data)
}
onRegister(data:any){
  return this._HttpClient.post('Users/Register',data)
}
onVerifyAccount(data:any){
  return this._HttpClient.put('Users/verify',data)
}
onRequestRestPassword(data:string){
  return this._HttpClient.post('Users/Reset/Request',{email:data})
}

onRestPassword(data:string){
  return this._HttpClient.post('Users/Reset',data)
}

onChangePassword(data:string):Observable<any>{
  return this._HttpClient.put('Users/ChangePassword',data);
}
getProfile(){
 let enecode:any= localStorage.getItem('userToken');
 let decode:any=jwtDecode(enecode);
 console.log(decode.userGroup);
 console.log(decode.userName);
 localStorage.setItem('role',decode.userGroup);
 localStorage.setItem('userName',decode.userName);
 this.getRole();

 
 
}
getRole(){
  if(localStorage.getItem('role')!==null&&localStorage.getItem('role')){

   this.role= localStorage.getItem('role');
  }
}

edituser(data:any):Observable<any>{
  return this._HttpClient.put('Users',data);
}

}
