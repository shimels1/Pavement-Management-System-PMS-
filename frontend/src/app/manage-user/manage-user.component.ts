import { Component, OnInit } from '@angular/core';
import { LccaService } from '../service/lcca.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { RoadnetWorkInventory } from '../model/rodeInfo';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css'],
})
export class ManageUserComponent implements OnInit {
  userItems: RoadnetWorkInventory[] = [];

  items: MenuItem[];

  home: MenuItem;

  constructor(private userService: UserService, private router: Router) {}

  async ngOnInit() {
    this.getAllData();
  }
  getAllData() {
    this.userService.getAll().subscribe((data) => {
      this.userItems = data;
    });
  }

  add() {
    this.router.navigate(['/register']);
  }

  update(data: any) {
    this.router.navigate(['/update', data.username]);
  }
  delete(data: any) {
    this.userService.delete(data.username).subscribe((res) => {
      this.getAllData();
    });
  }
}
