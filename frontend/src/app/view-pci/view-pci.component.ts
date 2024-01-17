import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { RoadNetworkInventoryService } from '../service/road-network-inventory.service';
import { RoadnetWorkInventory } from '../model/rodeInfo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PCIValues } from '../model/pciInventory';
import { PciSeverityService } from '../service/pci-severity.service';
import { PciServiceService } from '../service/pci-service.service';
@Component({
  selector: 'app-view-pci',
  templateUrl: './view-pci.component.html',
  styleUrls: ['./view-pci.component.css'],
})
export class ViewPciComponent implements OnInit {
  rodeDialog: boolean = false;

  rodes: RoadnetWorkInventory[] = [];

  rode: RoadnetWorkInventory = {
    idpci: '',
    Authority: '',
    NetworkID: '',
    branchName: '',
    sectionID: '',
    ROW: '',
    functionalClass: '',
    PavementType: '',
    SegLength: '',
    PavementWidth: '',
    Shoulderwidth: '',
    noOfLanes: '',
    Medianwidth: '',
    divided: '',
    Con_main_Reh_Year: '',
    Age: '',
    trafficVolume: '',
    from: '',
    X: '',
    to: '',
    X1: '',
    Y1: '',
    submittedBy: '',
    submittedOn: '',
  };

  PCIValues: PCIValues[] = [];

  selectedRodes: RoadnetWorkInventory[] = [];

  submitted: boolean | undefined;

  saveSuccessPopup = false;
  saveErrorPopup = '';
  sectionID: string = '';
  pci_id: number = 0;
  constructor(
    private PciSeverityService: PciSeverityService,
    private router: Router,
    private rodetService: PciServiceService,
    private pciService: PciServiceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.sectionID = this.route.snapshot.paramMap.get('idpci') + '';
    this.getData(this.sectionID);
  }
  getAllData() {}
  openNew() {
    this.rode = {};
    this.rodeDialog = true;
  }

  savePCIvalues(f: NgForm) {
    f.value.pci_id = 3;
    this.PCIValues.push(f.value);
    this.modalService.dismissAll('content');
  }

  deleteSelectedRodes() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected rodes?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.rodes = this.rodes.filter(
          (val) => !this.selectedRodes.includes(val)
        );
        this.selectedRodes = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'rodes Deleted',
          life: 3000,
        });
      },
    });
  }

  editrode(rode: RoadnetWorkInventory) {
    this.rode = { ...rode };
    this.rodeDialog = true;
  }

  deletePCIv(pciv: number) {
    console.log(pciv);
    this.PCIValues.splice(pciv, 1);
  }

  hideDialog() {
    this.rodeDialog = false;
    this.submitted = false;
  }

  print(s: any) {
    console.log(s);
  }

  savePCI(pci: NgForm) {
    pci.form.value.sectionID = this.sectionID;

    if (this.PCIValues.length <= 0) {
      // this.print('pleas enter at list one pic value');
      return;
    }
    this.print(this.PCIValues.length);

    this.pciService.savePCI(pci.form.value).subscribe(
      (sub: any) => {
        this.pci_id = sub.pciID;

        this.PCIValues.forEach((element) => {
          element.pci_id = this.pci_id;
          this.PciSeverityService.savePCISeverity(element).subscribe(
            (res) => {},
            (err) => {}
          );
        });

        this.router.navigate([
          '/pci',
          this.route.snapshot.paramMap.get('sectionID'),
        ]);
      },
      (err) => {}
    );
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.rodes.length; i++) {
      if (this.rodes[i].sectionID === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  open(content: any) {
    this.saveSuccessPopup = false;
    this.saveErrorPopup = '';
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  // added
  getData(idpci: string) {
    this.PciSeverityService.getByPciId(idpci).subscribe((data) => {
      this.print(data[0]);
      this.PCIValues = data;
    });
    this.rodetService.getByidpci(idpci).subscribe((data) => {
      this.print(data);
    });
  }
}
