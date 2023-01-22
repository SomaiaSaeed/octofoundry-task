import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';

import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeDataService } from './services/employeeService/employee-data.service';
import { DynamicFormService } from './services/dynamicFormService/dynamic-form.service';
import { DynamicFormModule } from './dynamic-form/dynamic-form/dynamic-form.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarModule } from 'primeng/toolbar'

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DynamicFormModule,
    TableModule,
    ToolbarModule
  ],
  providers: [EmployeeDataService, DynamicFormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
