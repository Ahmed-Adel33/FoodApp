import { Component } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isDarkMode: boolean;

  currentUser:any;
  userName=localStorage.getItem('userName')?localStorage.getItem('userName'):'Guest';

  constructor(private _HelperService:HelperService){
    this.isDarkMode = this._HelperService.isDarkMode();


    this._HelperService.getCurrentUser().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.currentUser=res;
        
      },error:(err)=>{

      },complete:()=>{
      }
    })
  }
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this._HelperService.setDarkMode(this.isDarkMode);
  }
  }
 


