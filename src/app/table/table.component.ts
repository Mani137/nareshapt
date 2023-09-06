import { Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MainserviceService } from 'src/mainservice.service'; 
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EditDetailsComponent } from '../edit-details/edit-details.component';
import { TableqrComponent } from '../tableqr/tableqr.component';

export interface PeriodicElement {
  businessId: string;
  businessName: string;
  emailId: string;
  contactpersonName: string;
  businessType: string;
  phoneNo: number;
  password: string;
  address: string;
  about: string;
  registrationDate: string;
  logo: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  displayedColumns: string[] = [
    'businessId',
    'businessName',
    'businessType',
    'emailId',
    'registrationDate',
    'phoneNo',
    'password',
    'logo',
    'actions',
    'viewQR',
  ];
  dataSource: MatTableDataSource<PeriodicElement> = new MatTableDataSource<PeriodicElement>();

  @Input() tableData: any[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  data: any;

  searchText: any;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private tableService: MainserviceService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.tableService.getData().subscribe((data) => {
      this.tableData= data;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.tableData);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  

  deleteRow(businessId: string): void {
    this.tableService.Delete(businessId).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Deleted Successful',
          text: 'Details have been successfully updated.',
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['header/table']));
        });
      },
      (error) => {}
    );
    setTimeout(() => {
      this.dialog.closeAll();
    }, 10000);
  }

  openDialog(elementId: any) {
    this.tableService.editData(elementId).subscribe((data) => {
      this.dialog.open(EditDetailsComponent, {
        data: { EditDetails: data },
      });
    });
  }

  openDialog1(elementId: any) {
    this.tableService.editData(elementId).subscribe((data) => {
      this.dialog.open(TableqrComponent, {
        data: { QRDetails: data },
      });
    });
  }

  getBase64Image(base64String: string): string {
    return 'data:image/jpeg;base64,' + base64String;
  }



  onPageChange(event: any) {
    this.currentPage= event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
  }

  applyFilter() {
    const filterValue = this.searchText.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource.paginator?.firstPage();
  }
  
}