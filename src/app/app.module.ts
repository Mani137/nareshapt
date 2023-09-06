import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppRoutingModule, routerOutlet } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MenuComponent } from "./Cart/menu/menu.component";
import { UniquePipe } from "./unique.pipe";
import { MatDialogModule } from "@angular/material/dialog";
import { PopupComponent } from "./popup/popup.component";

import { LoginComponent } from "./Cart/login/login.component";
import { MatCardModule } from "@angular/material/card";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";

import { TableComponent } from "./table/table.component";

import { MatTableModule } from "@angular/material/table";
import { CardComponent } from "./card/card.component";

import { MatProgressBarModule } from "@angular/material/progress-bar";

import { EditDetailsComponent } from "./edit-details/edit-details.component";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSortModule } from "@angular/material/sort";

import { CommonModule } from "@angular/common";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatSidenavModule } from "@angular/material/sidenav";

import { HeaderComponent } from "./header/header.component";
import { RegistComponent } from "./regist/regist.component";
import { UserViewComponent } from "./user-view/user-view.component";
import { TableqrComponent } from "./tableqr/tableqr.component";
import { MatInputModule } from "@angular/material/input";
import { TablesearchPipe } from './table/tablesearch.pipe';
import { ImageFallbackPipe } from './Cart/menu/image-fallback.pipe';
import { EditTypeComponent } from './edit-type/edit-type.component';
import { ViewComponent } from './view/view.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ViewcardComponent } from './viewcard/viewcard.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    UniquePipe,
    PopupComponent,
    LoginComponent,
    TableComponent,
    CardComponent,
    EditDetailsComponent,
    HeaderComponent,
    RegistComponent,
    UserViewComponent,
    TableqrComponent,
    TablesearchPipe,
    ImageFallbackPipe,
    EditTypeComponent,
    ViewComponent,
    ViewcardComponent,


  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatTableModule,
    CommonModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    CarouselModule.forRoot(), // Add CarouselModule here

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
