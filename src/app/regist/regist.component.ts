import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Login } from '../Cart/login/login';
import { MainserviceService } from 'src/mainservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css'],
})
export class RegistComponent {
  logo!: File;
  password!: string;
  confirmPassword!: string;
  passwordMatch!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private RegistService: MainserviceService,
    public dialog: MatDialog,
    private router: Router
  ) { }
  registrationForm = this.formBuilder.group({
    businessName: [null, [Validators.required, Validators.minLength(4)]],

    typeOfBusiness: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    contactpersonName: [null, Validators.required],
    address: [],
    phoneNo: [null, Validators.required],
    about: [null, Validators.required],
    registrationDate: [null, Validators.required],
    password: [null, Validators.required],
    confirmPassword: [null, Validators.required],
  });

  checkPassword() {
    if (this.password === this.confirmPassword) {
      return (this.passwordMatch = false);
    } else {
      return (this.passwordMatch = true);
    }
  }

  onFileSave(event: any) {
    this.logo = event.target.files[0];
  }
  register() {
    const registratinFormData = this.registrationForm.value;

    const formData: FormData = new FormData();

    formData.append('logoFile', this.logo);

    formData.append(
      'businessName',
      this.registrationForm.get('businessName')?.getRawValue()
    );
    formData.append(
      'businessType',
      this.registrationForm.get('typeOfBusiness')?.getRawValue()
    );
    formData.append(
      'emailId',
      this.registrationForm.get('email')?.getRawValue()
    );
    formData.append(
      'contactpersonName',
      this.registrationForm.get('contactpersonName')?.getRawValue()
    );
    formData.append(
      'address',
      this.registrationForm.get('address')?.getRawValue()
    );
    formData.append(
      'phoneNo',
      this.registrationForm.get('phoneNo')?.getRawValue()
    );
    formData.append('about', this.registrationForm.get('about')?.getRawValue());
    formData.append(
      'registrationDate',
      this.registrationForm.get('registrationDate')?.getRawValue()
    );
    formData.append(
      'password',
      this.registrationForm.get('password')?.getRawValue()
    );
    this.RegistService.saveRegistration(formData).subscribe(
      (response) => {
        console.log(response);

        Swal.fire({
          icon: 'success',
          title: 'Registration Successfully updated',
          text: 'Details have been successfully updated.',
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['header/table']));
        });
      },

      (error) => {
        console.log(error);
      }
    );

    setTimeout(() => {
      this.dialog.closeAll(), 10000;
    });
  }
}
