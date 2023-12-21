import { Component, Inject, OnInit } from '@angular/core';
import {   MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICategory } from '../../models/category';

@Component({
  selector: 'app-Add-Edit-category',
  templateUrl: './Add-Edit-category.component.html',
  styleUrls: ['./Add-Edit-category.component.css']
})
export class AddEditCategoryComponent implements OnInit {
categoryName:string=''
isLoading:boolean=false;

constructor(
  public dialogRef: MatDialogRef<AddEditCategoryComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
) {
  this.categoryName = this.data.categoryName || '';

        // this.categoryName = this.data.categoryName || '';
 
  }

  ngOnInit() {

  }
  onSubmit(){

  }
onclose(){

  this.dialogRef.close();
}


}
