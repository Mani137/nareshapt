import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MenuComponent } from "./Cart/menu/menu.component";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./Cart/login/login.component";
import { HeaderComponent } from "./header/header.component";
import { AuthGuard } from "./auth.guard";
import { TableComponent } from "./table/table.component";
import { CardComponent } from "./card/card.component";
import { RegistComponent } from "./regist/regist.component";
import { UserViewComponent } from "./user-view/user-view.component";
import { ViewComponent } from "./view/view.component";
import { ViewcardComponent } from "./viewcard/viewcard.component";
const routes: Routes = [
  { path: "", component: LoginComponent },

  {
    path: "cart/:bussinessId",
    component: MenuComponent,
  },

  {path:"viewcard/:bussinessId",component:ViewcardComponent},

  // { path: "view/:bussinessId", component: ViewComponent },
 
  {
    path: "card",
    component: CardComponent,
   
  },

  { path: "login", component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: "header",
    component: HeaderComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "table", component: TableComponent },
      { path: "card", component: CardComponent },
      { path: "regist", component: RegistComponent },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export class routerOutlet {}
