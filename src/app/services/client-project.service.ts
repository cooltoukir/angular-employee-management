import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { APIResponseModel } from '../model/interface/role';
import { ClientProject } from '../model/class/ClientProject';

@Injectable({
  providedIn: 'root'
})
export class ClientProjectService {

  constructor(private http: HttpClient) { }

  getAllClientProjects(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(environment.API_URL + "GetAllClientProjects");
  }

  deleteProjectByProjectId(id: number): Observable<APIResponseModel> {
    return this.http.delete<APIResponseModel>(environment.API_URL + "DeleteProjectByProjectId?projectId=" + id);
  }

  addUpdateClientProject(obj: ClientProject): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(environment.API_URL + "AddUpdateClientProject", obj);
  }
}
