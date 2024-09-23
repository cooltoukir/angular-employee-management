import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IEmployee } from '../../model/interface/employee';
import { ClientProjectService } from '../../services/client-project.service';
import { APIResponseModel } from '../../model/interface/role';
import { ClientService } from '../../services/client.service';
import { Client } from '../../model/class/Client';
import { EmployeeService } from '../../services/employee.service';
import { IClientProjects } from '../../model/interface/clientProjects';
import { DatePipe } from '@angular/common';
import { ClientProject } from '../../model/class/ClientProject';

@Component({
  selector: 'app-client-project',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
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
  clientProjectsList: IClientProjects[] = []
  employeeList: IEmployee[] = []
  clientList: Client[] = []
  clientProjectObj: ClientProject = new ClientProject();

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

  onEdit(id: number) {
    this.clientProjectSrv.getProjectByProjectId(id).subscribe((res: APIResponseModel) => {
      this.clientProjectObj = res.data;

      // Convert dates to ISO format if necessary
      const startDate = new Date(this.clientProjectObj.startDate).toISOString().substring(0, 10);
      const expectedEndDate = new Date(this.clientProjectObj.expectedEndDate).toISOString().substring(0, 10);

      this.projectForm = new FormGroup({
        clientProjectId: new FormControl(this.clientProjectObj.clientProjectId),
        projectName: new FormControl(this.clientProjectObj.projectName),
        startDate: new FormControl(startDate),
        expectedEndDate: new FormControl(expectedEndDate),
        leadByEmpId: new FormControl(this.clientProjectObj.leadByEmpId),
        completedDate: new FormControl(this.clientProjectObj.completedDate),
        contactPerson: new FormControl(this.clientProjectObj.contactPerson),
        contactPersonContactNo: new FormControl(this.clientProjectObj.contactPersonContactNo),
        totalEmpWorking: new FormControl(this.clientProjectObj.totalEmpWorking),
        projectCost: new FormControl(this.clientProjectObj.projectCost),
        projectDetails: new FormControl(this.clientProjectObj.projectDetails),
        contactPersonEmailId: new FormControl(this.clientProjectObj.contactPersonEmailId),
        clientId: new FormControl(this.clientProjectObj.clientId)
      })
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
    this.projectForm.reset({
      clientProjectId: 0,
      projectName: '',
      startDate: '',
      expectedEndDate: '',
      leadByEmpId: '',
      completedDate: '',
      contactPerson: '',
      contactPersonContactNo: '',
      totalEmpWorking: '',
      projectCost: '',
      projectDetails: '',
      contactPersonEmailId: '',
      clientId: ''
    });
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
