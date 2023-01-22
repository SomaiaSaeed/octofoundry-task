import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, Params } from '@angular/router';
import { Employee } from '../models/Employee';
import { EmployeeDataService } from '../services/employeeService/employee-data.service';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  queryParams: {} | undefined;
  employees: Array<Employee> = [];
  employeesTemp: Array<Employee> = [];
  cols: any[] = [];
  loading: boolean = true;
  showSearchInput: boolean = false;
  expandFilter: boolean = true;

  constructor(
    private empService: EmployeeDataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loading = true;
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      this.empService.getAllEmployees(params).subscribe((data: Array<Employee>) => {
        if (data && data.length > 0) {
          this.applyFilterByQueryParams(data, params)
          this.getColumns(data[0])
        }
        this.loading = false;
      });
    });
  };

  applyFilterByQueryParams(data: Array<Employee>, params: Params) {
    this.employees = [];
    this.employeesTemp = [];
    data.forEach(row => {
      const rowMap = new Map(Object.entries(row));
      let condition = true;
      for (const [key, value] of Object.entries(params)) {
        if (rowMap.get(key)) {
          condition &&= (rowMap.get(key) == value)
        }
      }
      if (condition) this.employees.push(row)
    });
    this.employeesTemp = JSON.parse(JSON.stringify(this.employees)); // for deep clone
  }

  getColumns(data: Employee) {
    for (let field in data) {
      this.cols.push({ field: field, header: field.toUpperCase() })
    }
  }

  isSortable(colName: string) {
    return colName == 'name' || colName == 'salary';
  }

  onSearch(value: string) {
    value = value.toLocaleLowerCase()
    this.employees = [];
    this.employeesTemp.forEach(element => {
      if (
        element.name.includes(value)
        || element.phone.toLocaleLowerCase().includes(value)
        || element.email.toLocaleLowerCase().includes(value)
        || element.phone.toLocaleLowerCase().includes(value)
        || element.company.toLocaleLowerCase().includes(value)
        || element.country.toLocaleLowerCase().includes(value)
        || element.salary.toString().toLocaleLowerCase().includes(value)
        || element.date.toLocaleLowerCase().includes(value)
      ) {
        this.employees.push(element)
      }
    });

  }
}

