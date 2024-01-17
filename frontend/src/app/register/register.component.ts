import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  role = '';
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}
  options = ['Admin', 'Data_collecter'];

  save(f: NgForm) {
    console.log(f.value);
    this.userService.create(f.value).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/manage']);
    });
  }
}
