import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryFormComponent } from './inventory/inventory-form/inventory-form.component';
import { InventoryComponent } from './inventory/inventory.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path:'', redirectTo:'/user/login', pathMatch:'full'},
  { path:'user',component:UserComponent,
      children:[
        { path:'registration',component:RegistrationComponent },
        { path:'login',component:LoginComponent}
      ]
  },
  { path:'inventory',component:InventoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [UserComponent,RegistrationComponent,LoginComponent,InventoryComponent,
  InventoryFormComponent]
