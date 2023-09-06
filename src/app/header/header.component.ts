import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(public rtr: Router) {}

  handleclick() {
    console.log('Button clicked!');
  }
  
  logoutUser() {
    // Display a confirmation dialog using SweetAlert
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, clear localStorage and navigate to login page
        localStorage.clear();
        this.rtr.navigate(['']);
      }
    });
  }
}
  
  
  
  
  