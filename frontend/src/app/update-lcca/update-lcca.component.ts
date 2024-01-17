import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LccaService } from '../service/lcca.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-update-lcca',
  templateUrl: './update-lcca.component.html',
  styleUrls: ['./update-lcca.component.css'],
})
export class UpdateLccaComponent implements OnInit {
  Math = Math;
  sectionId: string = '';
  inflationRate: any = 0;
  discountRate: any = 0;
  sectionArea: any = 0;
  initialCost: any = 0;
  analysisPeriod: any = 0;
  salvageValue: any = 0;

  year?: any = 0;
  maintenanceType?: string = '';
  currentCost?: any = 0;

  tableRow: TableRow[] = [];

  currentCostTotal: any = 0;
  futureCostTotal: any = 0;
  presentValueTotal: any = 0;

  PWC: any = 0;
  EUAC: any = 0;

  @ViewChild('myForm', { static: true }) myForm: NgForm;

  constructor(
    private lccaService: LccaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.lccaService
      .getBySectionId(this.route.snapshot.paramMap.get('sectionId') + '')
      .subscribe((res: any) => {
        // console.log(res.data);
        this.sectionId = res.data[0].sectionId;
        this.inflationRate = parseFloat(res.data[0].inflationRate);
        this.discountRate = parseFloat(res.data[0].discountRate);
        this.sectionArea = parseFloat(res.data[0].sectionArea);
        this.initialCost = parseFloat(res.data[0].initialCost);
        this.analysisPeriod = parseFloat(res.data[0].analysisPeriod);
        this.salvageValue = parseFloat(res.data[0].salvageValue);
        this.PWC = parseFloat(res.data[0].PWC);
        this.EUAC = parseFloat(res.data[0].EUAC);
        this.tableRow = res.tableRow;
        this.changing();
        this.changing6();
      });
  }
  onSubmit(form: NgForm) {}
  changing() {
    this.currentCostTotal = 0;
    this.tableRow.forEach((element) => {
      if (element.currentCost != undefined)
        this.currentCostTotal += element.currentCost;
    });

    this.futureCostTotal = 0;
    this.tableRow.forEach((element) => {
      if (element.currentCost != undefined)
        this.futureCostTotal +=
          element.currentCost *
          Math.pow(1 + this.inflationRate / 100, element.year);
    });

    this.presentValueTotal = 0;
    this.tableRow.forEach((element) => {
      if (element.currentCost != undefined)
        this.presentValueTotal +=
          element.currentCost *
          Math.pow(1 + this.inflationRate / 100, element.year) *
          Math.pow(1 / (1 + this.discountRate / 100), element.year);
    });

    this.PWC =
      this.initialCost +
      this.presentValueTotal * this.sectionArea -
      this.salvageValue *
        Math.pow(1 / (1 + this.discountRate / 100), this.analysisPeriod);

    this.EUAC =
      this.PWC *
      (((this.discountRate / 100) *
        Math.pow(1 + this.discountRate / 100, this.analysisPeriod)) /
        (Math.pow(1 + this.discountRate / 100, this.analysisPeriod) - 1));
  }
  changing6() {
    this.currentCostTotal = 0;
    this.tableRow.forEach((element) => {
      if (element.currentCost != undefined)
        this.currentCostTotal += element.currentCost;
    });

    this.futureCostTotal = 0;
    this.tableRow.forEach((element) => {
      if (element.currentCost != undefined)
        this.futureCostTotal +=
          element.currentCost *
          Math.pow(1 + this.inflationRate / 100, element.year);
    });

    this.presentValueTotal = 0;
    this.tableRow.forEach((element) => {
      if (element.currentCost != undefined)
        this.presentValueTotal +=
          element.currentCost *
          Math.pow(1 + this.inflationRate / 100, element.year) *
          Math.pow(1 / (1 + this.discountRate / 100), element.year);
    });

    this.PWC =
      this.initialCost +
      this.presentValueTotal * this.sectionArea -
      this.salvageValue *
        Math.pow(1 / (1 + this.discountRate / 100), this.analysisPeriod);

    this.EUAC =
      this.PWC *
      (((this.discountRate / 100) *
        Math.pow(1 + this.discountRate / 100, this.analysisPeriod)) /
        (Math.pow(1 + this.discountRate / 100, this.analysisPeriod) - 1));
  }

  newRow: TableRow = {};
  addNew() {
    this.newRow = {};
    this.tableRow.push(this.newRow);
    console.log(this.tableRow);
    this.currentCostTotal = 0;
    this.tableRow.forEach((element) => {
      if (element.currentCost != undefined)
        this.currentCostTotal += element.currentCost;
    });

    this.tableRow = [...this.tableRow];
  }

  update() {
    var sectionId = this.sectionId;
    var inflationRate = this.inflationRate;
    var discountRate = this.discountRate;
    var sectionArea = this.sectionArea;
    var initialCost = this.initialCost;
    var analysisPeriod = this.analysisPeriod;
    var salvageValue = this.salvageValue;
    var PWC = this.PWC;
    var EUAC = this.EUAC;
    var tableRow = this.tableRow;

    var data = {
      sectionId,
      inflationRate,
      discountRate,
      sectionArea,
      initialCost,
      analysisPeriod,
      salvageValue,
      PWC,
      EUAC,
      tableRow,
    };
    this.lccaService.update(sectionId, data).subscribe((res) => {
      this.router.navigate(['/lcca']);
    });
  }

  options = [
    'Preventive Maintenance',
    'Routine Maintenance',
    'corrective Maintenance',
    'Minor Rehabilitation',
    'Major Rehabilitation',
    'reconstruction',
    'Fog seal',
    'Crack Seal',
    'Chip Seal',
    'Slurry Seal',
    'Micro Surfacing',
    'Overlay',
  ];
}
export interface TableRow {
  sectionId?: string;
  index?: any;
  year?: any;
  maintenanceType?: string;
  currentCost?: any;
}
