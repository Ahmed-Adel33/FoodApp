import { Component, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { ICategory, ICategoryTable } from './models/category';
import {PageEvent} from '@angular/material/paginator';
import { AddEditCategoryComponent } from './components/Add-Edit-category/Add-Edit-category.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeleteDialogComponent } from 'src/app/sheard/delete-dialog/delete-dialog.component';
import { HelperService } from 'src/app/services/helper.service';
import { ITag } from '../recipes/models/recipe';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  searchValue:string=''
  pageSize:number=20;
  isUpdatedpage:boolean=false;
  pageNumber:number|undefined=1;
  TableResponse:ICategoryTable|undefined;
  TableData:ICategory[]|undefined=[];


  constructor(private _CategoryService:CategoryService,private dialog:MatDialog,private ToastrService:ToastrService,private _HelperService:HelperService ) {
  }

  ngOnInit() {
    this.gettableData();
  }
  
gettableData(){
  let parms=
    {
      pageSize:this.pageSize,
      PageNumber: this.pageNumber,
      name:this.searchValue,

    }
  
  this._CategoryService.getCategories(parms).subscribe({
  next:(res)=>{
       this.TableResponse=res; 
       this.TableData=this.TableResponse?.data;   
  }    
  })
  
 
 
}

handlePageEvent(e: PageEvent) {
  console.log(e);
  
  this.pageSize=e.pageSize;
  this.pageNumber=this.TableResponse?.pageNumber;
  this.gettableData()
  
}

openAddDialog(): void {
  const dialogRef = this.dialog.open(AddEditCategoryComponent, {
    data: {},
    width:'40%'
  });

  
  

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    if(result){
     this.onAddCategory(result);
    }
    
  });

  

}
  onAddCategory(data:String){
    this._CategoryService.AddCategory(data).subscribe({
      next:(res)=>{
        this.TableResponse=res;
        this.TableData=this.TableResponse?.data
        
      },error:(err)=>{
        console.log(err);
        
      },complete:()=>{
          this.ToastrService.success('Category Added ','fun');
          this.gettableData();
      }
    })
  }
  
  ondeletCategory(id:number){
    this._CategoryService.deletCategory(id).subscribe({
      next:(res)=>{
        this.TableResponse=res;
        this.TableData=this.TableResponse?.data
        
      },error:(err)=>{
        console.log(err);
        
      },complete:()=>{
          this.ToastrService.success('Category deleted successfully');
          this.gettableData();
      }
    })
  }
  
  openDeleteDialog(CategoryData:any): void {
    console.log(CategoryData);
    
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: CategoryData,
      width:'40%'
    });
    
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    console.log(result.id);
    
    if(result){
       this.ondeletCategory(result.id);      
    }
    
  });
  
}


}

  

