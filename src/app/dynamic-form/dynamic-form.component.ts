import { Component, Input, OnInit } from '@angular/core';
import { FormAttributes } from '../models/FormAttributes';
import { DynamicFormService } from '../services/dynamicFormService/dynamic-form.service';
import { FormType } from '../models/FormTypesEnum';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  @Input() queryParams: any | undefined;

  loading: boolean = true;
  formAttributes: FormAttributes[] = [];
  countries: any[] = [];
  formType = FormType;

  constructor(private dynamicFormService: DynamicFormService, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.dynamicFormService.getDynamicForm().subscribe((data: Array<FormAttributes>) => {

      data.forEach((att: FormAttributes) => {
        if (this.queryParams) {
          for (const [key, value] of Object.entries(this.queryParams)) {
            att.value = att.title.toLocaleLowerCase() == key ? value : null
          }
        }
      })
      this.formAttributes = data;
      this.loading = false;
      this.loadDropdownOptions(data)
    });
  };

  getAttributeValue(attr: FormAttributes) {
    return (attr.type == FormType.Dropdown)
      ? attr.value.name
      : attr.value;
  }
  loadDropdownOptions(data: Array<FormAttributes>) {
    data.forEach((element: FormAttributes) => {
      if (element.type == this.formType.Dropdown) this.getCountries(element.api)
    });
  }

  getCountries(apiUrl: any) {
    this.dynamicFormService.getCountries(apiUrl).subscribe((data: any) => {
      data.forEach((country: any) => this.countries.push({ name: country.name.common, code: country.ccn3 }));
    });
  }

  filter() {

    let params = {};
    this.formAttributes.forEach((attr, index) => {
      if (attr.value) {
        params =
        {
          ...params,
          [attr.title.toLocaleLowerCase()]: this.getAttributeValue(attr)
        }
      }
    });
    this.router.navigate([''], { queryParams: params });

  }
}
