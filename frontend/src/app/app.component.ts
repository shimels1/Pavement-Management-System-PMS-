import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend6';
  expression: boolean;
  user: any;
  isAdmin: boolean = false;
  constructor(private router: Router) {
    if (sessionStorage.getItem('id') != null) {
      this.user =
        sessionStorage.getItem('first_name') +
        ' ' +
        sessionStorage.getItem('last_name');
      this.expression = true;
      if (sessionStorage.getItem('role') == 'Admin') {
        this.isAdmin = true;
      }
    }
  }
  ngOnInit(): void {}
  logout() {
    sessionStorage.clear();
    location.reload();
    this.router.navigate(['/login']);
  }
  rodeDialog = true;
}
