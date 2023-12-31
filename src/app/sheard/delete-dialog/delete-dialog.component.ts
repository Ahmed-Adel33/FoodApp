import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit  {

  constructor(private dialogRef:MatDialogRef<DeleteDialogComponent>, 
       @Inject(MAT_DIALOG_DATA) public data: any, ) { }


onNoClick():void{
  this.dialogRef.close();
}
ngOnInit(): void {
  
}
}
