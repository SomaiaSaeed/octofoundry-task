import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from 'src/app/models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  employeeDataUrl = 'assets/data/employee-mock-data.json';

  constructor(private http: HttpClient) { }

  getAllEmployees(queryParams: {}) {
    return this.http.get<Array<Employee>>(
      this.employeeDataUrl,
      { params: queryParams });
  }
}
