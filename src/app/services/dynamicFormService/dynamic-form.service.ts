import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormAttributes } from 'src/app/models/FormAttributes';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  dynamicFormUrl = 'assets/data/dynamic-form.json';

  constructor(private http: HttpClient) { }

  getDynamicForm() {
    return this.http.get<Array<FormAttributes>>(this.dynamicFormUrl);
  }

  getCountries(url: string) {
    return this.http.get(url);
  }
}
