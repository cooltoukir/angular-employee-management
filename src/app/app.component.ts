import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AlertComponent } from "./reusableComponents/alert/alert.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-employee-management';
}
