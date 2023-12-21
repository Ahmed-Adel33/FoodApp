import { Component, OnInit} from '@angular/core';
import { IRecipe, IRecipeTable, ITag } from './models/recipe';
import { RecipeService } from './services/recipe.service';
import { HelperService } from 'src/app/services/helper.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/sheard/delete-dialog/delete-dialog.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  Message:string=''
  searchValue:string=''
  pageSize:number=20;
  pageNumber:number|undefined=1;
  TableResponse:IRecipeTable|undefined;
  TableData:IRecipe[]|undefined=[]=[];
  tagId:any;
  RecipeData:any;
  tags:ITag[]=[];
data: any;

  constructor(private _RecipeService:RecipeService,private _HelperService:HelperService
  , private dialog:MatDialog,private _ToastrService:ToastrService  ) { }

  ngOnInit() {
    this.getAllTags();
    this.gettableData();
  }
  gettableData(){
    let parms=
      {
        pageSize:this.pageSize,
        PageNumber: this.pageNumber,
        name:this.searchValue,
       tagId: this.tagId
      }
    
    this._RecipeService.getRecipes(parms).subscribe({
    next:(data:IRecipeTable)=>{
         this.TableResponse=data; 
         this.TableData=this.TableResponse?.data;   
         console.log(this.TableData?.length);
         
    }    
    })
  
  }
getAllTags(){
  this._HelperService.getTags().subscribe({
  next:(res)=>{
    console.log(res);
    this.tags=res;
  }
  })
  
}

ondeleteRecipe(id:number){
  this._RecipeService.deleteRecipes(id).subscribe({
    next:(res)=>{
      this.TableResponse=res;
      this.TableData=this.TableResponse?.data
      this.Message=res.message;

    },error:(err)=>{
      console.log(err.error.message);
      
    },complete:()=>{
        this._ToastrService.success(this.Message,' successfully');
        this.gettableData();
    }
  })
}

openDeleteDialog(RecipeData:any): void {
  console.log(RecipeData);
  
  const dialogRef = this.dialog.open(DeleteDialogComponent, {
    data: RecipeData,
    width:'40%'
  });
  
dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');
  console.log(result);
  console.log(result.id);
  
  if(result){
     this.ondeleteRecipe(result.id);      
  }
  
});

}
handlePageEvent(e: PageEvent) {
  console.log(e);
  
  this.pageSize=e.pageSize;
  this.pageNumber=this.TableResponse?.pageNumber;
  this.gettableData()
  
}


}



