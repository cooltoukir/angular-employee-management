export class ClientProject {
  clientProjectId: number;
  projectName: string;
  startDate: Date;
  expectedEndDate: Date;
  leadByEmpId: number;
  completedDate: Date;
  contactPerson: string;
  contactPersonContactNo: string;
  totalEmpWorking: number;
  projectCost: number;
  projectDetails: string;
  contactPersonEmailId: string;
  clientId: number;

  constructor() {
    this.clientProjectId = 0;
    this.projectName = '';
    this.startDate = new Date();
    this.expectedEndDate = new Date();
    this.leadByEmpId = 0;
    this.completedDate = new Date();
    this.contactPerson = '';
    this.contactPersonContactNo = '';
    this.totalEmpWorking = 0;
    this.projectCost = 0;
    this.projectDetails = '';
    this.contactPersonEmailId = '';
    this.clientId = 0;
  }
}
