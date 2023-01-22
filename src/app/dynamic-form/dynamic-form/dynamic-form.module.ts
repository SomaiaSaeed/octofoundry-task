import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicFormComponent } from '../dynamic-form.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import {ButtonModule} from 'primeng/button';
import {MultiSelectModule} from 'primeng/multiselect';

@NgModule({
  declarations: [DynamicFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    MultiSelectModule,
    ButtonModule,
    CalendarModule
  ],
  exports: [DynamicFormComponent]
})
export class DynamicFormModule { }
