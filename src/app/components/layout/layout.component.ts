import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AlertComponent } from "../../reusableComponents/alert/alert.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AlertComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  router = inject(Router);

  onLogOut() {
    const isLogOut = confirm("Are you sure you want to Log out?")
    if (isLogOut) {
      this.router.navigateByUrl('/login');
      localStorage.removeItem('authToken');
    }
  }
}
