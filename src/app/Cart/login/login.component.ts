import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from './login';

import Swal from 'sweetalert2';
import { MainserviceService } from 'src/mainservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private Mainserve: MainserviceService
  ) { }

  loginForm = this.formBuilder.group({
    businessId: [null, Validators.required],
    password: [null, [Validators.required, Validators.minLength(3)]],
  });

  ngOnInit(): void { }

  login() {
    const username = "srinivas";
    const password = "srinivas1234";
    const username1 = "kuladeep";
    const password1 = "kuladeep1234";



    if (this.loginForm.valid) {
      const formData: Login = {
        businessId: this.loginForm.value.businessId!,
        password: this.loginForm.value.password!,
      };
      console.log(formData);
      if (
        (formData.businessId === username && formData.password === password) ||
        (formData.businessId === username1 && formData.password === password1)
      ) {
        localStorage.setItem("uname", formData.businessId);
        localStorage.setItem("password", formData.password);

        Swal.fire({
          icon: "success",
          title: "Admin Login Successfully",
          text: "Admin login successfully.",
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          this.router
            .navigateByUrl("/", { skipLocationChange: true })
            .then(() => this.router.navigate(["/header"]));
        });
      } else {


        this.Mainserve.saveLogin(formData).subscribe(
          (token: string) => {
            // Token received, handle successful login
            localStorage.setItem('token', token);
            localStorage.setItem('businessId', formData.businessId);
            localStorage.setItem('password', formData.password);

            Swal.fire({
              icon: 'success',
              title: 'Login Successful',
              text: 'User login successful.',
              timer: 3000,
              showConfirmButton: false,
            }).then(() => {
              this.router
                .navigateByUrl('/', { skipLocationChange: true })
                .then(() => this.router.navigate(['/cart', formData.businessId]));
            });
          },
          (error: any) => {
            // Error occurred during login
            Swal.fire({
              icon: 'error',
              title: 'Invalid Credentials',
              text: 'Please enter valid credentials.',
              timer: 3000,
              showConfirmButton: false,
            });
          }
        );
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Credentials',
        text: 'Please enter valid credentials.',
        timer: 3000,
        showConfirmButton: false,
      });
    }
  }
}