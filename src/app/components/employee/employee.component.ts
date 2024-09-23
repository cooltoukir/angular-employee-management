import { Component, inject, OnInit, signal } from '@angular/core';
import { IEmployee } from '../../model/interface/employee';
import { EmployeeService } from '../../services/employee.service';
import { APIResponseModel } from '../../model/interface/role';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  ngOnInit(): void {
    this.getAllEmployee();
  }

  employeeList = signal<IEmployee[]>([])

  employeeService = inject(EmployeeService);

  getAllEmployee() {
    this.employeeService.getAllEmployee().subscribe((res: APIResponseModel) => {
      this.employeeList.set(res.data);
    })
  }
}
