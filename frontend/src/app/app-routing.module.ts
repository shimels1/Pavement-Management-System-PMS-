import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPciComponent } from './add-pci/add-pci.component';
import { LCCAComponent } from './lcca/lcca.component';
import { PciComponent } from './pci/pci.component';
import { RoadNetworkInventoryComponent } from './road-network-inventory/road-network-inventory.component';
import { ViewPciComponent } from './view-pci/view-pci.component';
import { UpdateLccaComponent } from './update-lcca/update-lcca.component';
import { AddLccaComponent } from './add-lcca/add-lcca.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth.guard';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AdminGuard } from './service/admin.guard';

const routes: Routes = [
  {
    path: 'RoadNetworkInventory',
    component: RoadNetworkInventoryComponent,
    title: 'Pavement Inventory',
    canActivate: [AuthGuard],
  },
  {
    path: 'pci/:sectionID',
    component: PciComponent,
    title: 'Pavement condition Assessment',
    canActivate: [AuthGuard],
  },
  {
    path: 'addpci/:sectionID',
    component: AddPciComponent,
    title: 'Add new Pavement condition',
    canActivate: [AuthGuard],
  },
  {
    path: 'viewpci/:idpci',
    component: ViewPciComponent,
    title: 'Pavement condition Assessment',
    canActivate: [AuthGuard],
  },
  {
    path: 'lcca',
    component: LCCAComponent,
    title: 'Life Cycle cost Analysis(LCCA)',
    canActivate: [AuthGuard],
  },
  {
    path: 'addLcca',
    component: AddLccaComponent,
    title: 'Life Cycle cost Analysis(LCCA)',
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent, title: 'Login' },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
    canActivate: [AuthGuard],
  },
  {
    path: 'updateLcca/:sectionId',
    component: UpdateLccaComponent,
    title: 'Life Cycle cost Analysis(LCCA)',
    canActivate: [AuthGuard],
  },
  {
    path: 'update/:username',
    component: UpdateUserComponent,
    title: 'Update User',
    canActivate: [AuthGuard],
  },
  {
    path: 'manage',
    component: ManageUserComponent,
    title: 'Manage User',
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: '**',
    component: RoadNetworkInventoryComponent,
    title: 'Pavement Inventory',
    canActivate: [AuthGuard],
  },
  { path: '**', component: LoginComponent, title: 'Login' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
