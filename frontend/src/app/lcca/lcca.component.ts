import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoadnetWorkInventory } from '../model/rodeInfo';
import { MenuItem } from 'primeng/api';
import { RoadNetworkInventoryService } from '../service/road-network-inventory.service';
import { Route, Router } from '@angular/router';
import { LccaService } from '../service/lcca.service';

@Component({
  selector: 'app-lcca',
  templateUrl: './lcca.component.html',
  styleUrls: ['./lcca.component.css'],
})
export class LCCAComponent implements OnInit {
  lccaItems: RoadnetWorkInventory[] = [];

  items: MenuItem[];

  home: MenuItem;

  constructor(private lccaService: LccaService, private router: Router) {}

  async ngOnInit() {
    this.getAllData();
  }
  getAllData() {
    if (sessionStorage.getItem('role') == 'Admin')
      this.lccaService.getAll().subscribe((data) => {
        this.lccaItems = data;
      });
    else
      this.lccaService
        .getByUserName(sessionStorage.getItem('username'))
        .subscribe((data) => {
          this.lccaItems = data;
        });
  }

  add() {
    this.router.navigate(['/addLcca']);
  }

  update(data: any) {
    this.router.navigate(['/updateLcca', data.sectionId]);
  }
  delete(data: any) {
    this.lccaService.delete(data.sectionId).subscribe((res) => {
      this.getAllData();
    });
  }
}
