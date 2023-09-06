import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MainserviceService } from 'src/mainservice.service';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MatButtonModule } from "@angular/material/button";
import Swal from "sweetalert2";
import { PopupComponent } from "src/app/popup/popup.component";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";


@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
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



  constructor(
    private userService: MainserviceService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog,
    private routes: Router
  ) { }

  ngOnInit(): void {
    this.getDataFromBackend();
    this.addtypeNamebutton();

    console.log(this.header);
    console.log(this.getDataFromBackend());

    this.getAbout();

    this.businessId1 = localStorage.getItem("businessId");
    console.log(this.businessId1);

    if (this.businessId1) {
      this.routes.navigate(["/user", this.businessId1]);
    }
  }

  addType = this.formBuilder.group({
    typeName: ["", Validators.required],
  });
  addItem = this.formBuilder.group({
    itemName: ["", Validators.required],
    itemImage: [""],
    description: ["", [Validators.required, Validators.maxLength(50)]],
    price: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
  });

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

  showTypeNamePopup: boolean = false;

  opentype() {
    this.showTypeNamePopup = true;
  }
  closeaddPopup() {
    this.showTypeNamePopup = false;
  }

  addtypeNamebutton() {
    this.addType.controls.typeName.setErrors(null);

    // Check if the typeName field is empty or contains only whitespace
    const typeName = this.addType.controls.typeName.value;
    if (!typeName || /^\s*$/.test(typeName)) {
      this.addType.controls.typeName.setErrors({ required: true });
      return;
    }

    // Check if the typeName field contains only numbers
    if (/^\d+$/.test(typeName)) {
      this.addType.controls.typeName.setErrors({ numeric: true });
      return;
    }

    // Check if the typeName field starts with whitespace
    if (/^\s/.test(typeName)) {
      this.addType.controls.typeName.setErrors({ whitespaceStart: true });
      return;
    }

    // Proceed with saving the data...

    const formData = new FormData();
    formData.append("typeName", this.addType.get("typeName")?.getRawValue());

    let businessId1 = localStorage.getItem("businessId");
    if (businessId1 != null) {
      this.userService.saveType(formData, businessId1).subscribe(
        (response) => {
          this.typeResponse = response.typeName;
          console.log(this.typeResponse);
          console.log("cscvhgjhdgj", businessId1);

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Type Add Successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          this.showTypeNamePopup = false;
        }

     
      );
    }
    setTimeout(() => {
      let businessId1 = localStorage.getItem("businessId");
      if (businessId1 != null) {
        this.userService.getType(businessId1).subscribe((data) => {
          this.typeGetData = data;
        });
      }
    }, 1200);
    setTimeout(() => {
      this.getDataFromBackend();
    }, 1400);
  }


  getDataFromBackend(): any {
    let businessId1 = localStorage.getItem("businessId");
    if (businessId1 != null) {
      this.userService
        .getDataFromBackend(businessId1)
        .subscribe((response: any) => {
          this.userDatalist = response;

          console.log(this.userDatalist);
        });
    }
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



  deleteItem(typeid: any) {
    if (typeid) {
      Swal.fire({
        icon: "warning",
        title: "Delete Item",
        text: "Are you sure you want to delete this item?",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteItem(typeid).subscribe(
            (response: any) => {
              console.log("Item deleted successfully:", response);
              // Handle success response
              Swal.fire({
                icon: "success",
                title: "Item Deleted",
                text: "The item has been deleted successfully.",
              });
              this.getDataFromBackend();
            },
            (error: any) => {
              console.error("Error deleting item:", error);
              // Handle error
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to delete the item. Please try again.",
              });
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          console.log("Delete cancelled");
          // Handle cancellation
        }
      });
    } else {
      console.error("Item ID not found");
      // Handle error
    }

    setTimeout(() => {
      this.getDataFromBackend();
    }, 1000);
  }

  showDelete: boolean = false;

  showDeleteText() {
    this.showDelete = true;
  }

  hideDeleteText() {
    this.showDelete = false;
  }

  // Inside your component class
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
  saveItemImage(event: any) {
    this.saveImageItem = event.target.files[0];
  }
  addItems() { }

  sendTypeId = "";

  closePopup2() {
    setTimeout(() => {
      this.showPopup2 = false;
    }, 1000);

    const formData = new FormData();
    formData.append("file", this.saveImageItem);
    formData.append("itemName", this.addItem.get("itemName")?.getRawValue());
    formData.append("price", this.addItem.get("price")?.getRawValue());
    formData.append(
      "description",
      this.addItem.get("description")?.getRawValue()
    );
    console.log(formData);
    this.userService
      .saveItems(formData)
      .subscribe((response) => console.log(response));

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Add item Successfully",
      showConfirmButton: false,
      timer: 1500,
    });

    setTimeout(() => {
      this.getDataFromBackend();
    }, 1200);

    setTimeout(() => {
      this.ngOnInit();
    }, 300);
  }

  Dummy(typeid: any) {
    console.log(typeid);
    this.userService.setTypeId(typeid);
    console.log(this.sendTypeId);
  }

  editItem = this.formBuilder.group({
    itemName: [
      "",
      [Validators.required, Validators.pattern(/^[A-Za-z0-9][A-Za-z0-9\s]*$/)],
    ],
    itemImage: ["", Validators.required],
    description: ["", [Validators.required, Validators.maxLength(50)]],
    price: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
  });

  updatedItemId: any;

  updateItem(itemid: any) {
    this.updatedItemId = itemid;
    console.log(this.updatedItemId);
    this.userService.setItemId(itemid);
    this.userService.editItemGet(itemid).subscribe((response) => {
      this.editItem.patchValue({
        itemName: response.itemName,
        description: response.description,
        price: response.price,
      });
      this.editImageItem = "data:image/jpeg;base64," + response.itemImage;
    });
  }

  showPopup3: boolean = false;

  openupdatePopup3() {
    this.showPopup3 = true;
  }
  closeupdatePopup3() {
    this.showPopup3 = false;
  }

  editItemImage(event: any) {
    this.editImageItem = event.target.files[0];
  }

  updateItembutton() {
    // const updatedValues = this.editItem.getRawValue();

    // this.updateItem(updatedValues);
    this.showPopup3 = false;

    Swal.fire({
      icon: "info",
      title: "Update Item",
      text: "Do you want to save the changes?",
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        console.log(formData);
        formData.append("file", this.editImageItem);
        formData.append(
          "itemName",
          this.editItem.get("itemName")?.getRawValue()
        );
        formData.append(
          "description",
          this.editItem.get("description")?.getRawValue()
        );

        formData.append("price", this.editItem.get("price")?.getRawValue());
        this.userService.editImage(formData).subscribe((response) => {
          console.log(response);
          Swal.fire({
            icon: "success",
            title: "Item Updated",
            text: "The item has been updated successfully.",
          });
          setTimeout(() => {
            this.ngOnInit();
          }, 300);
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log("Update cancelled");
        // Handle cancellation
      }
    });
  }

  openaboutedit1: boolean = false;

  editabout = this.formBuilder.group({
    about: ["", Validators.required],
  });

  openaboutedit() {
    this.openaboutedit1 = true;
    this.editabout.get("about")?.setValue(this.userDatalist2);
  }

  onSubmitForm() {
    const about1 = this.editabout.value;
    this.userService
      .updateBusinessData(about1, this.businessId)
      .subscribe((response) => {
        console.log(response);

        this.openaboutedit1 = false;
      });
    console.log(about1);
    this.openaboutedit1 = false;
    // window.location.reload()

    setTimeout(() => {
      this.ngOnInit();
    }, 500);
  }

  getAbout() {
    let businessId1 = localStorage.getItem("businessId");
    if (businessId1 != null) {
      this.userService.getAbout(businessId1).subscribe((data) => {
        this.userDatalist2 = data.about;
        this.businessId = data.businessId;
      });
    }
  }

  imageclcik(itemid: number) {

    this.userService.getimageforbackend(itemid).subscribe((data) => {
      this.viewImages = data;
      console.log(data);
    })

    setTimeout(() => { console.log(this.viewImages, "nvn") }, 1000);
  }



}
