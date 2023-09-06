import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";



import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { MainserviceService } from "src/mainservice.service";

@Component({
  selector: "app-edit-details",
  templateUrl: "./edit-details.component.html",
  styleUrls: ["./edit-details.component.css"],
})
export class EditDetailsComponent {
  registrationForm: FormGroup;
  updateObj: any = {};
  tableData: any[] = [];
  logo!: File;
  logo1!: string;

  constructor(
    private formBuilder: FormBuilder,
    private tableService: MainserviceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private editDetailsService: MainserviceService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.registrationForm = this.formBuilder.group({
      businessName: ["", Validators.required],
      businessType: ["", Validators.required],
      emailId: ["", [Validators.required, Validators.email]],
      contactpersonName: ["", Validators.required],
      address: ["", Validators.required],
      password: ["", Validators.required],
      registrationDate: ["", Validators.required],
      phoneNo: ["", Validators.required],
      about: ["", Validators.required],
      // confirmPassword: ['', Validators.required],
      logo: [""],
    });
  }
  ngOnInit() {
    this.patchValue();
    console.log(this.data.EditDetails);

    this.tableService.getData().subscribe((data) => (this.tableData = data));
  }

  patchValue() {
    this.registrationForm.patchValue(this.data.EditDetails);
    this.logo1 = this.data.EditDetails.logo;
  }

  // onFileSave(event: any) {
  //   this.logo = event.target.files[0];
  // }

  onFileSave(event: any) {
    this.logo = event.target.files[0];
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.logo1 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  getBase64Image(base64String: string): string {
    return "data:image/jpeg;base64," + base64String;
  }

  updateDetails() {
    const formData: FormData = new FormData();

    formData.append("logoFile", this.logo);
    formData.append(
      "businessName",
      this.registrationForm.get("businessName")?.getRawValue()
    );
    formData.append(
      "businessType",
      this.registrationForm.get("businessType")?.getRawValue()
    );
    formData.append(
      "emailId",
      this.registrationForm.get("emailId")?.getRawValue()
    );
    formData.append(
      "contactpersonName",
      this.registrationForm.get("contactpersonName")?.getRawValue()
    );
    formData.append(
      "address",
      this.registrationForm.get("address")?.getRawValue()
    );
    formData.append(
      "password",
      this.registrationForm.get("password")?.getRawValue()
    );
    formData.append(
      "phoneNo",
      this.registrationForm.get("phoneNo")?.getRawValue()
    );
    formData.append("about", this.registrationForm.get("about")?.getRawValue());
    formData.append(
      "registrationDate",
      this.registrationForm.get("registrationDate")?.getRawValue()
    );

    this.editDetailsService
      .updateDetails(this.data.EditDetails.businessId, formData)
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
              .then(() => this.router.navigate(["header/table"]));
          });
        },
        (error) => {}
      );
    setTimeout(() => {
      this.dialog.closeAll(), 10000;
    });
  }
}
