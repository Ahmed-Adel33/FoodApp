import { ToastrService } from 'ngx-toastr';
import { IRecipe, ITag } from './../../models/recipe';
import { Component,  OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HelperService } from 'src/app/services/helper.service';
import { RecipeService } from '../../services/recipe.service';
import { ICategory } from 'src/app/admin/categories/models/category';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-editRecipe',
  templateUrl: './add-editRecipe.component.html',
  styleUrls: ['./add-editRecipe.component.css']
})
export class AddEditRecipeComponent implements OnInit {
  isEditMode: boolean = false;
  isAddMode: boolean = true;
  isUpdate: boolean = false;

  Message:string=''
  imgSrc:any;
  tags:ITag[]=[];
  Categories:ICategory[]=[];
  recipeId:any;
  isUpdatedPage:boolean=false;
  recipeData:any;

RecipeForm=new FormGroup({
  name:new FormControl(null),

  description:new FormControl(null),
  price:new FormControl(null),
  tagId:new FormControl(null),
  categoriesIds:new FormControl(null),

})
isLoading:boolean=false;

  constructor( private route:ActivatedRoute,   private _HelperService:HelperService,private _RecipeService:RecipeService,private _ActivatedRoute:ActivatedRoute,private router:Router,private toastr:ToastrService) { 
 this.recipeId=_ActivatedRoute.snapshot.params['id'];
 if(this.recipeId){
  this.getRecipesById(this.recipeId);

  this.isUpdatedPage=true;
  this.route.url.subscribe(url=>{
    this.isEditMode=url.some(segment=> segment.path ==='edit')
    this.disableFormControls();
  })
  this.route.url.subscribe(url=>{
    this.isAddMode=url.some(segment=> segment.path ==='add')
    this.enableFormControls();
  });
 }else{
  this.isUpdatedPage=false;
 }

  }

  ngOnInit() {
    this.getAllTags()
    this.getAllCategories()
  }

  disableFormControls() {
    if (!this.isEditMode) {
      this.RecipeForm.get('name')?.disable();
      this.RecipeForm.get('price')?.disable();
      this.RecipeForm.get('description')?.disable();
      this.RecipeForm.get('tagId')?.disable();
      this.RecipeForm.get('categoriesIds')?.disable();
      this.RecipeForm.get('recipeImage')?.disable();
    }
  }
enableFormControls() {
  if (this.isAddMode) {
    this.RecipeForm.get('name')?.enable();
    this.RecipeForm.get('price')?.enable();
    this.RecipeForm.get('description')?.enable();
    this.RecipeForm.get('tagId')?.enable();
    this.RecipeForm.get('categoriesIds')?.enable();
    this.RecipeForm.get('recipeImage')?.enable();
  }
}
getRecipesById(id:number){
  this._RecipeService.getRecipeById(id).subscribe({
    next:(res)=>{
        console.log(res);
        this.recipeData=res
        
    },error:(err)=>{

    },complete:()=>{
      this.imgSrc='https://upskilling-egypt.com:443/api/v1/'+this.recipeData+this.imgSrc;
      this.RecipeForm.patchValue({
        name:this.recipeData?.name,
        price:this.recipeData?.price,
        description:this.recipeData?.description,
        tagId:this.recipeData?.tag.id,
        categoriesIds:this.recipeData?.category[0].id,
 

      })
    }
  })

}


onSubmit(data:FormGroup){
  this.isLoading=true;

  console.log(data.value);
  let myData=new FormData;
  myData.append('name',data.value.name);
  myData.append('price',data.value.price);
  myData.append('description',data.value.description);
  myData.append('categoriesIds',data.value.categoriesIds);
  myData.append('tagId',data.value.tagId);
  myData.append('recipeImage',this.imgSrc,this.imgSrc.name);
  
  if(this.recipeId){
  this._RecipeService.editRecipe(this.recipeId,myData).subscribe({
    next:(res)=>{
      console.log(res);
      
    },error:()=>{
      this.isLoading=false;

    },complete:()=>{
      this.isLoading=false;

      this.toastr.success('Recipe updated','successfuly');
      this.router.navigate(['/dashboard/admin/recipes'])
    }
  })
}else{
  this._RecipeService.addRecipe(myData).subscribe({
    next:(res)=>{
      console.log(res);
      
    },error:()=>{
  
    },complete:()=>{
    
    
      this.router.navigate(['/dashboard/admin/recipes']);
      this.toastr.success(this.Message, 'successfully!');

    }
  })
}
  }
getAllTags(){
  this._HelperService.getTags().subscribe({
  next:(res)=>{
    this.tags=res;
    console.log(res);

  }
  })
  
}

getAllCategories(){
  this._HelperService.getCategories().subscribe({
  next:(res)=>{
    this.Categories=res.data;
    console.log(res);

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