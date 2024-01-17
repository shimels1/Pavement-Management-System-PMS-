import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {
    if (sessionStorage.getItem('id') != null) this.router.navigate(['/']);
  }

  ngOnInit(): void {}
  options = ['Admin', 'Data_collecter'];

  save(f: NgForm) {
    console.log(f.value);
    this.userService.login(f.value).subscribe((res: any) => {
      location.reload();
      // this.router.navigate(['/']);
      sessionStorage.setItem('first_name', res.first_name);
      sessionStorage.setItem('last_name', res.last_name);
      sessionStorage.setItem('id', res.id);
      sessionStorage.setItem('username', res.username);
      sessionStorage.setItem('role', res.role);
      console.log(sessionStorage.getItem('first_sname') == null);
    });
  }
}
