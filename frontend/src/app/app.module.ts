import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoadNetworkInventoryComponent } from './road-network-inventory/road-network-inventory.component';
import { FormsModule } from '@angular/forms';
import { RoadNetworkInventoryService } from './service/road-network-inventory.service';

import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PciComponent } from './pci/pci.component';
import { AddPciComponent } from './add-pci/add-pci.component';
import { ViewPciComponent } from './view-pci/view-pci.component';

// import { NgxPrintModule } from 'ngx-print';
import { LCCAComponent } from './lcca/lcca.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddLccaComponent } from './add-lcca/add-lcca.component';
import { UpdateLccaComponent } from './update-lcca/update-lcca.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth.guard';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AdminGuard } from './service/admin.guard';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    RoadNetworkInventoryComponent,
    PciComponent,
    AddPciComponent,
    ViewPciComponent,
    LCCAComponent,
    AddLccaComponent,
    UpdateLccaComponent,
    LoginComponent,
    RegisterComponent,
    ManageUserComponent,
    UpdateUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    NgbModule,
    // NgxPrintModule,
    BrowserAnimationsModule,
    BreadcrumbModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    AuthGuard,
    AdminGuard,
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
