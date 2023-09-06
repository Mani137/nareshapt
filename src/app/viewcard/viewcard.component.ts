import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MainserviceService } from 'src/mainservice.service';
import { PopupComponent } from '../popup/popup.component';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-viewcard',
  templateUrl: './viewcard.component.html',
  styleUrls: ['./viewcard.component.css']
})
export class ViewcardComponent implements OnInit{


  showList: any = "";
  saveImageItem!: any;
  editImageItem!: any;
  selectedItem: any = null;
  typeResponse: any[] = [];
  typeGetData: any[] = [];
  header: any;
  userDatalist: any[] = [];
  businessId!: string;
  userDatalist2!: string;
  businessId1!: any;
  viewImages: any[] = [];
  showTypeNamePopup: boolean = false;
  itemName: any;
  price: any;
  description: any;


  constructor(
    private userService: MainserviceService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog,
    private routes: Router
  ) {}
  private menuurl= 'http://localhost:8085/my/gett/';
  ngOnInit(): void {

    this.userService.currentBusinessId.subscribe(businessId => {
      if (businessId) {
        this.fetchData(businessId);
        console.log(this.fetchData(businessId),"no bussinessId");
        this.routes.navigate(["/view", businessId]);
      } else {
        console.warn('businessId has not been set yet.');
      }
    });
  }


  getDataFromBackend(businessId: string): Observable<any> {
    const url = `${this.menuurl}${businessId}`;
    return this.http.get(url).pipe(
      tap(data => {
        console.log('service data:', data);
      }),
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError(error);
      })
    );
  }


  showForm: boolean = false;
  newSectionName: string = "";

  toggleList(type: string): void {
    if (this.showList === type) {
      this.showList = "";
    } else {
      this.showList = type;
    }
  }

  buttonExists(typename: string): boolean {
    return this.userDatalist.some(
      (item) => item.typename === typename && item.displayed === true
    );
  }

  isItemSelected(item: any): boolean {
    return this.selectedItem === item;
  }

  toggleItem(item: any): void {
    if (this.isItemSelected(item)) {
      this.selectedItem = null;
    } else {
      this.selectedItem = item;
    }
  }

  openDetails(item: any) {
    this.selectedItem = item;
  }

  closeDetails() {
    this.selectedItem = null;
  }

  openSectionForm() {
    this.showForm = true;
  }

  //popup
  opentype() {
    this.showTypeNamePopup = true;
  }
  closeaddPopup() {
    this.showTypeNamePopup = false;
  }

  fetchData(businessId: string): void {
    this.getDataFromBackend(businessId).subscribe(response => {
      this.userDatalist = response;
    });
  }


  getFilteredItems(typeid: string): any[] {
    console.log(typeid);
    const filteredType = this.userDatalist.filter(
      (item: any) => item.typeid === typeid
    );
    console.log(filteredType);
    if (filteredType) {
      console.log(filteredType);
      return filteredType;
    }
    return [];
  }

  renderedTypeNames: string[] = [];

  isTypeRendered(type: string): boolean {
    return this.userDatalist.some(
      (item) => item.typename === type && item.rendered
    );
  }

  getUniqueTypes(): any[] {
    const uniqueTypes: any[] = [];
    this.userDatalist.forEach((item) => {
      const existingType = uniqueTypes.find(
        (type) => type.typeId === item.typeId
      );
      if (!existingType) {
        uniqueTypes.push(item);
      }
    });
    return uniqueTypes;
  }

  showPopup2: boolean = false;

  openDialog() {
    this.dialog.open(PopupComponent);
  }

  openAddItemPopup2() {
    this.showPopup2 = true;
  }
  closeaddPopup2() {
    this.showPopup2 = false;
  }

  showPopup3: boolean = false;

  openupdatePopup3() {
    this.showPopup3 = true;
  }
  closeupdatePopup3() {
    this.showPopup3 = false;
  }

  openaboutedit1: boolean = false;

  getAbout(): void {
    this.userService.currentBusinessId.subscribe(businessId => {
      if (businessId) {
        this.userService.getAbout(businessId).subscribe(data => {
          this.userDatalist2 = data.about;
          this.businessId = data.businessId;
        });
      }
    });
  }

  imageclcik(itemId: number) {
    console.log(itemId);
    this.userService.getimageforbackend(itemId).subscribe((data) => {
      console.log(data);
      // Assuming the response contains an array of image objects with a 'price' property.
      this.viewImages = data;
      this.viewImages = data.viewImages;
      //   this.itemName = data.itemName;
      //   this.price = data.price;
      //   this.description = data.description;
    });
  }
}
