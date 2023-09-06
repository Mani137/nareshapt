import { Component, Inject } from '@angular/core';
import { MainserviceService } from 'src/mainservice.service'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-type',
  templateUrl: './edit-type.component.html',
  styleUrls: ['./edit-type.component.css']
})
export class EditTypeComponent {


  EditForm: FormGroup;
  tableData: any;
  typeId! : number;

  constructor(
    private formBuilder: FormBuilder,
    private menuService: MainserviceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private editDetailsService: MainserviceService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.EditForm = this.formBuilder.group({

      typeid :[""],
      typeName: ["", Validators.required],
     
    });
  }
  ngOnInit() {

  
    this.EditForm.patchValue({
      typeName: this.data.EditDetails1.typeName,
    });

   this.patchValue()
  }
  
  patchValue() {
    this.EditForm.patchValue(this.data.EditDetails);
    this.typeId= this.data.EditDetails1.typeId;
  }



  updateDetails1() {


    const formData: FormData = new FormData();

   
    formData.append(
      "typeName",
      this.EditForm.get("typeName")?.getRawValue()
    );
   
    this.editDetailsService
      .updateDetails1(this.typeId, formData)
      .subscribe(
        (response) => {
          Swal.fire({
            icon: "success",
            title: "Update Successful",
            text: "Details have been successfully updated.",
            timer: 3000,
            showConfirmButton: false,
          }).then(() => {
            this.router
              .navigateByUrl("/", { skipLocationChange: true })
              .then(() => this.router.navigate(["cart/:bussinessId"]));
          });
        },
        (error) => {}
      );
    setTimeout(() => {
      this.dialog.closeAll(), 10000;
    });
  }
}
