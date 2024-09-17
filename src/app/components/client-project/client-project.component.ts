import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Project } from '../../model/class/Project';

@Component({
  selector: 'app-client-project',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css'
})
export class ClientProjectComponent {
  projectObj: Project = new Project();
  projectList: Project[] = [];

  onEdit(data: Project) {

  }

  onDelete(id: number) {

  }
  
  onReset() {

  }
  
  onSaveClient() {

  }
}
