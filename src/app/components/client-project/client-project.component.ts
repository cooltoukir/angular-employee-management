import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IEmployee } from '../../model/interface/employee';
import { ClientProjectService } from '../../services/client-project.service';
import { APIResponseModel } from '../../model/interface/role';
import { ClientService } from '../../services/client.service';
import { Client } from '../../model/class/Client';
import { EmployeeService } from '../../services/employee.service';
import { IClientProjectsResponse } from '../../model/interface/ClientProjectsResponse';

@Component({
  selector: 'app-client-project',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css'
})
export class ClientProjectComponent implements OnInit {

  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName: new FormControl("", [Validators.required, Validators.minLength(4)]),
    startDate: new FormControl("", [Validators.required]),
    expectedEndDate: new FormControl("", [Validators.required]),
    leadByEmpId: new FormControl("", [Validators.required]),
    completedDate: new FormControl(""),
    contactPerson: new FormControl(""),
    contactPersonContactNo: new FormControl(""),
    totalEmpWorking: new FormControl("", [Validators.required]),
    projectCost: new FormControl("", [Validators.required]),
    projectDetails: new FormControl(""),
    contactPersonEmailId: new FormControl(""),
    clientId: new FormControl("", [Validators.required])
  })

  clientProjectSrv = inject(ClientProjectService);
  employeeSrv = inject(EmployeeService);
  clientSrv = inject(ClientService);
  clientProjectsList: IClientProjectsResponse[] = []
  employeeList: IEmployee[] = []
  clientList: Client[] = []

  ngOnInit(): void {
    this.loadClientProjects();
    this.getAllEmployee();
    this.getAllClient();
  }

  loadClientProjects() {
    this.clientProjectSrv.getAllClientProjects().subscribe((res: APIResponseModel) => {
      this.clientProjectsList = res.data;
    })
  }

  onDelete(id: number) {
    const isDelete = confirm("Are you sure you want to delete?")
    if (isDelete) {
      this.clientProjectSrv.deleteProjectByProjectId(id).subscribe((res: APIResponseModel) => {
        if (res.result) {
          alert(res.message);
          this.loadClientProjects();
        } else {
          alert(res.message);
        }
      })
    }
  }

  getAllEmployee() {
    this.employeeSrv.getAllEmployee().subscribe((res: APIResponseModel) => {
      this.employeeList = res.data;
    })
  }

  getAllClient() {
    this.clientSrv.getAllClients().subscribe((res: APIResponseModel) => {
      this.clientList = res.data;
    })
  }

  onReset() {
    this.projectForm.reset();
  }

  onSavePorject() {
    const formValue = this.projectForm.value;
    debugger;
    this.clientProjectSrv.addUpdateClientProject(formValue).subscribe((res: APIResponseModel) => {
      if (res.result) {
        alert(res.message);
        this.loadClientProjects();
        this.onReset();
      } else {
        alert(res.message);
      }
    })
  }
}
