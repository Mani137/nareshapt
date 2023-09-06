import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MainserviceService } from 'src/mainservice.service'; 
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-tableqr',
  templateUrl: './tableqr.component.html',
  styleUrls: ['./tableqr.component.css']
})
export class TableqrComponent {


  registrationForm: FormGroup;
  qrCode: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private tableService: MainserviceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TableqrComponent>
  ) {
    this.registrationForm = this.formBuilder.group({
      qrCode: [''],
    });
  }

  ngOnInit() {
    this.patchValue();
  }

  patchValue() {
    if (this.data && this.data.QRDetails) {
      this.registrationForm.patchValue(this.data.QRDetails);
      this.qrCode = this.data.QRDetails.qrCode;
    }
  }

  onFileSave(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.qrCode = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

   getBase64Image(base64String: string): string {
     return 'data:image/jpeg;base64,' + base64String;
   }


   downloadQRCode(qrCode: string) {
    const link = document.createElement('a');
    link.href = 'data:image/jpeg;base64,' + qrCode;
    link.download = 'qrcode.png';
    link.click();
  }
  




}

