import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../model/class/Client';
import { FormsModule, NgForm } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel } from '../../model/interface/role';
import { UpperCasePipe } from '@angular/common';
import { Constant } from '../../constant/Constant';
import { MyButtonComponent } from "../../reusableComponents/my-button/my-button.component";

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, MyButtonComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})

export class ClientComponent implements OnInit {

  required = Constant.VALIDATON_MESSAGE;

  clientObj: Client = new Client();
  clientList: Client[] = [];

  clientService = inject(ClientService);

  ngOnInit(): void {
    this.loadClient();
  }

  loadClient() {
    this.clientService.getAllClients().subscribe((res: APIResponseModel) => {
      this.clientList = res.data;
    })
  }

  onReset(form: NgForm) {
    form.resetForm();
    this.clientObj = new Client();
  }

  onSaveClient(form: NgForm) {
    this.clientService.addUpdate(this.clientObj).subscribe((res: APIResponseModel) => {
      if (res.result) {
        alert(res.message);
        this.loadClient();
        this.onReset(form);
      } else {
        alert(res.message);
      }
    })
  }

  // onSaveClient(data: string, form: NgForm) {
  //   debugger;
  //   this.clientService.addUpdate(this.clientObj).subscribe((res: APIResponseModel) => {
  //     if (res.result) {
  //       alert(res.message);
  //       this.loadClient();
  //       this.onReset(form);
  //     } else {
  //       alert(res.message);
  //     }
  //   })
  // }

  onEdit(data: Client) {
    this.clientObj = { ...data };
  }

  onDelete(id: number) {
    const isDelete = confirm("Are you sure you want to delete?")
    if (isDelete) {
      this.clientService.deleteClientById(id).subscribe((res: APIResponseModel) => {
        if (res.result) {
          alert(res.message);
          this.loadClient();
        } else {
          alert(res.message);
        }
      })
    }
  }
}
