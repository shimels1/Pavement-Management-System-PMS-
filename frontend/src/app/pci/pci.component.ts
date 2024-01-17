import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { RoadNetworkInventoryService } from '../service/road-network-inventory.service';
import { RoadnetWorkInventory } from '../model/rodeInfo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PciServiceService } from '../service/pci-service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PCI } from '../model/pci';
import { PCIValues } from '../model/pciInventory';
import { PciSeverityService } from '../service/pci-severity.service';
import { DedactValues } from '../model/dedactValues';
import { TmplAstElement } from '@angular/compiler';
import { RoadnetWorkInventoryCalculation } from '../model/rodeInventoryCalculation';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-pci',
  templateUrl: './pci.component.html',
  styleUrls: ['./pci.component.css'],
})
export class PciComponent implements OnInit {
  @ViewChild('printableArea') myDiv: ElementRef | undefined;
  rodeDialog: boolean = false;

  rodes: RoadnetWorkInventoryCalculation[] = [];

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

  selectedRodes: RoadnetWorkInventory[] = [];

  submitted: boolean | undefined;

  saveSuccessPopup = false;
  saveErrorPopup = '';

  PCIValues: PCIValues[] = [];
  dedactValues: DedactValues[] = [];
  items: MenuItem[];

  home: MenuItem;

  constructor(
    @Inject(DOCUMENT) document: Document,
    private rodetService: PciServiceService,
    private PciSeverityService: PciSeverityService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.getAllData();
    this.delay(() => {
      this.openResultForFirsttime();
    }, 5000);

    this.items = [
      { label: 'Pavement Inventory', routerLink: '/' },
      { label: 'Pavement condition Assessments' },
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  delay = (function () {
    var timer: any = 0;
    return function (callback: any, ms: any) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();
  getAllData() {
    this.rodes = [];
    this.rodetService
      .getBySectionID(this.route.snapshot.paramMap.get('sectionID') + '')
      .subscribe(
        (data) => {
          var i: number = 0;
          data.forEach(async (element) => {
            var temp: RoadnetWorkInventoryCalculation = {};
            temp.rodeInfo = element;

            this.rodes.push(temp);
          });
          data.forEach((element) => {
            var temp: RoadnetWorkInventoryCalculation = {};
            temp.rodeInfo = element;
            var m = this.openCalculation1(temp.rodeInfo.idpci, i);
            ++i;
          });
        },
        (err) => {
          this.print(err);
        }
      );
  }
  navigateToAddNewPCI() {
    this.router.navigate([
      '/addpci',
      this.route.snapshot.paramMap.get('sectionID'),
    ]);
  }
  openNew() {
    this.rode = {};
    this.rodeDialog = true;
  }

  deleteSelectedRodes() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected rodes?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.rodes = this.rodes.filter(
          (val) => !this.selectedRodes.includes(val.rodeInfo || this.rode)
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

  deletepci(idpci: PCIValues) {
    console.log(idpci);
    this.rodetService.deleteOrder(idpci).subscribe(
      (res) => {
        console.log(res);
        this.getAllData();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  hideDialog() {
    this.rodeDialog = false;
    this.submitted = false;
  }
  print(s: any) {
    console.log(s, '');
  }

  saveRode(form: NgForm) {
    this.submitted = true;

    if (
      form.value.carraigeWayWidth == null ||
      form.value.carraigeWayWidth == ''
    )
      form.value.carraigeWayWidth = 0;
    if (form.value.noOfLanes == null || form.value.noOfLanes == '')
      form.value.noOfLanes = 0;
    if (form.value.submittedBy == null || form.value.submittedBy == '')
      form.value.submittedBy = '';
    if (form.value.submittedOn == null || form.value.submittedOn == '')
      form.value.submittedOn = 0;
    this.rodetService.savePCI(form.value).subscribe(
      (res) => {
        this.saveErrorPopup = '';
        this.saveSuccessPopup = true;
        setInterval(() => {
          this.modalService.dismissAll('content');
        }, 1500);

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'rode Created',
          life: 3000,
        });
        this.getAllData();
      },
      (err) => {
        this.saveSuccessPopup = false;
        this.saveErrorPopup = err.error.error;
      }
    );
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.rodes.length; i++) {
      if (this.rodes[i]?.rodeInfo?.sectionID === id) {
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
  totalpci: number[] = [];
  totalDencity: number[] = [];
  DVs: number[] = [];
  DVs2: number[] = [];

  sampleArea: number[] = [];
  CDVs: number[] = [];
  sortTotalDidaction: Array<Array<number>> = [];

  open(content: any, idpci: any) {
    this.totalpci = [];
    this.totalDencity = [];
    this.totalDencityLess2 = [];
    this.DVs = [];
    this.DVs2 = [];
    this.sampleArea = [];
    this.CDVs = [];
    this.PciSeverityService.getByPciId(idpci).subscribe(
      async (data) => {
        this.PCIValues = data;
        var d = 0;
        var k = 0;

        this.PCIValues.forEach(async (r) => {
          var p =
            parseFloat('' + r.q1) +
            parseFloat('' + r.q2) +
            parseFloat('' + r.q3) +
            parseFloat('' + r.q4) +
            parseFloat('' + r.q5) +
            parseFloat('' + r.q6) +
            parseFloat('' + r.q7) +
            parseFloat('' + r.q8) +
            parseFloat('' + r.q9);
          this.totalpci.push(p);
        });
        var p = 0;
        this.PCIValues.forEach((r) => {
          var num = 0;
          if (parseFloat('' + r.q1) != 0) {
            num = num + 1;
          }
          if (parseFloat('' + r.q2) != 0) {
            num = num + 1;
          }
          if (parseFloat('' + r.q3) != 0) {
            num = num + 1;
          }
          if (parseFloat('' + r.q4) != 0) {
            num = num + 1;
          }
          if (parseFloat('' + r.q5) != 0) {
            num = num + 1;
          }
          if (parseFloat('' + r.q6) != 0) {
            num = num + 1;
          }
          if (parseFloat('' + r.q7) != 0) {
            num = num + 1;
          }
          if (parseFloat('' + r.q8) != 0) {
            num = num + 1;
          }
          if (parseFloat('' + r.q9) != 0) {
            num = num + 1;
          }

          p =
            (parseFloat('' + r.q1) +
              parseFloat('' + r.q2) +
              parseFloat('' + r.q3) +
              parseFloat('' + r.q4) +
              parseFloat('' + r.q5) +
              parseFloat('' + r.q6) +
              parseFloat('' + r.q7) +
              parseFloat('' + r.q8) +
              parseFloat('' + r.q9)) /
            num;
        });

        //  didact value

        // 𝑫𝑽=𝒂−𝒃∗ln(D+C)
        var k = 0;
        await this.PCIValues.forEach(async (r) => {
          var id = 0;
          if (r.pci_id) {
            id = r.pci_id;
          }
          var sa = await this.rodetService.getByidpci(id + '').toPromise();
          // sampleArea
          this.sampleArea.push(sa?.sampleArea);
          var aa = sa?.sampleArea | 0;
          d = (this.totalpci[k] / aa) * 100;

          this.totalDencity.push(d);

          if (k == this.PCIValues.length - 1) {
            var i: number = 0;
            this.PCIValues.forEach(async (data) => {
              var a: number = 0;
              var b: number = 0;
              var c: number = 0;

              if (data.distress_number == 1) {
                if (data.distress_severity == 'High') {
                  a = 29.42267;
                  b = -13.51048;
                  c = 0.15537;
                }
                if (data.distress_severity == 'Medium') {
                  a = 15.88601;
                  b = -13.14731;
                  c = 0.45151;
                }
                if (data.distress_severity == 'Low') {
                  a = 2.29165;
                  b = -12.70934;
                  c = 0.93595;
                }
              }

              if (data.distress_number == 2) {
                if (data.distress_severity == 'High') {
                  a = -72.31256;
                  b = -30.86561;
                  c = 11.35158;
                }
                if (data.distress_severity == 'Medium') {
                  a = -32.53448;
                  b = -15.12784;
                  c = 9.24595;
                }
                if (data.distress_severity == 'Low') {
                  a = -79.67268;
                  b = -19.78479;
                  c = 55.47239;
                }
              }

              if (data.distress_number == 3) {
                if (data.distress_severity == 'High') {
                  a = -23.62172;
                  b = -20.52985;
                  c = 3.25222;
                }
                if (data.distress_severity == 'Medium') {
                  a = -17.87333;
                  b = -12.86744;
                  c = 3.76613;
                }
                if (data.distress_severity == 'Low') {
                  a = -25.41762;
                  b = -11.20249;
                  c = 9.07044;
                }
              }

              if (data.distress_number == 4) {
                if (data.distress_severity == 'High') {
                  a = 20.83999;
                  b = -21.91199;
                  c = 0.70661;
                }
                if (data.distress_severity == 'Medium') {
                  a = -83.93172;
                  b = -43.08547;
                  c = 8.09694;
                }
                if (data.distress_severity == 'Low') {
                  a = -106.74746;
                  b = -37.07036;
                  c = 17.97939;
                }
              }

              if (data.distress_number == 5) {
                if (data.distress_severity == 'High') {
                  a = 30.89831;
                  b = -13.65081;
                  c = 0.17368;
                }
                if (data.distress_severity == 'Medium') {
                  a = 4.77709;
                  b = -14.76536;
                  c = 0.91856;
                }
                if (data.distress_severity == 'Low') {
                  a = -27.80323;
                  b = -14.39647;
                  c = 6.9309;
                }
              }

              if (data.distress_number == 6) {
                if (data.distress_severity == 'High') {
                  a = -3.12466;
                  b = -17.9149;
                  c = 2.14627;
                }
                if (data.distress_severity == 'Medium') {
                  a = -20.53414;
                  b = -18.73749;
                  c = 4.01107;
                }
                if (data.distress_severity == 'Low') {
                  a = -33.15847;
                  b = -18.07409;
                  c = 7.05225;
                }
              }

              if (data.distress_number == 7) {
                if (data.distress_severity == 'High') {
                  a = -20.57886;
                  b = -16.1736;
                  c = 5.04355;
                }
                if (data.distress_severity == 'Medium') {
                  a = -9.04172;
                  b = -8.8073;
                  c = 3.95347;
                }
                if (data.distress_severity == 'Low') {
                  a = -24.53999;
                  b = -9.08273;
                  c = 16.31557;
                }
              }

              if (data.distress_number == 8) {
                if (data.distress_severity == 'High') {
                  a = -24.52026;
                  b = -22.42963;
                  c = 2.94456;
                }
                if (data.distress_severity == 'Medium') {
                  a = -21.56556;
                  b = -14.53599;
                  c = 4.1314;
                }
                if (data.distress_severity == 'Low') {
                  a = -36.32016;
                  b = -12.91686;
                  c = 16.10003;
                }
              }

              if (data.distress_number == 9) {
                if (data.distress_severity == 'High') {
                  a = -211.47638;
                  b = -55.29184;
                  c = 48.59017;
                }
                if (data.distress_severity == 'Medium') {
                  a = -1304.37132;
                  b = -215.33509;
                  c = 432.22313;
                }
                if (data.distress_severity == 'Low') {
                  a = -137.31105;
                  b = -31.29066;
                  c = 82.20668;
                }
              }

              if (data.distress_number == 10) {
                if (data.distress_severity == 'High') {
                  a = -39.9327;
                  b = -27.61592;
                  c = 4.60033;
                }
                if (data.distress_severity == 'Medium') {
                  a = -14.37946;
                  b = -12.54314;
                  c = 2.63189;
                }
                if (data.distress_severity == 'Low') {
                  a = -22.15419;
                  b = -10.53697;
                  c = 6.19692;
                }
              }

              if (data.distress_number == 11) {
                if (data.distress_severity == 'High') {
                  a = -1.41164;
                  b = -21.38885;
                  c = 1.44358;
                }
                if (data.distress_severity == 'Medium') {
                  a = -14.35071;
                  b = -17.88645;
                  c = 2.62632;
                }
                if (data.distress_severity == 'Low') {
                  a = -18.91151;
                  b = -13.03637;
                  c = 3.94991;
                }
              }

              if (data.distress_number == 12) {
                a = -62.20827;
                b = -16.56645;
                c = 41.01446;
              }

              if (data.distress_number == 13) {
                if (data.distress_severity == 'High') {
                  a = 47.50634;
                  b = -24.03981;
                  c = 0.20534;
                }
                if (data.distress_severity == 'Medium') {
                  a = 17.58431;
                  b = -28.46768;
                  c = 0.57547;
                }
                if (data.distress_severity == 'Low') {
                  a = 12.06586;
                  b = -18.0326;
                  c = 0.48068;
                }
              }

              if (data.distress_number == 14) {
                if (data.distress_severity == 'High') {
                  a = 79.3417;
                  b = 70.21115;
                  c = 0.84573;
                }
                if (data.distress_severity == 'Medium') {
                  a = 48.71885;
                  b = 49.71835;
                  c = 0.85943;
                }
                if (data.distress_severity == 'Low') {
                  a = 20.30194;
                  b = 21.0528;
                  c = 0.92045;
                }
              }

              if (data.distress_number == 15) {
                if (data.distress_severity == 'High') {
                  a = 23.71806;
                  b = -15.31231;
                  c = 0.25782;
                }
                if (data.distress_severity == 'Medium') {
                  a = 15.11045;
                  b = -12.01955;
                  c = 0.29569;
                }
                if (data.distress_severity == 'Low') {
                  a = 1.42558;
                  b = -10.93997;
                  c = 0.81476;
                }
              }

              if (data.distress_number == 16) {
                if (data.distress_severity == 'High') {
                  a = 0.26916;
                  b = -20.79098;
                  c = 1.33796;
                }
                if (data.distress_severity == 'Medium') {
                  a = -16.75084;
                  b = -20.67426;
                  c = 2.46427;
                }
                if (data.distress_severity == 'Low') {
                  a = -6.6736;
                  b = -10.97982;
                  c = 1.62058;
                }
              }

              if (data.distress_number == 17) {
                if (data.distress_severity == 'High') {
                  a = 18.43868;
                  b = -18.02626;
                  c = 0.28404;
                }
                if (data.distress_severity == 'Medium') {
                  a = 5.79823;
                  b = -14.84604;
                  c = 0.59815;
                }
                if (data.distress_severity == 'Low') {
                  a = -6.03122;
                  b = -13.14243;
                  c = 1.38048;
                }
              }

              if (data.distress_number == 18) {
                if (data.distress_severity == 'High') {
                  a = 0.57754;
                  b = -19.97452;
                  c = 4.10251;
                }
                if (data.distress_severity == 'Medium') {
                  a = 0.40615;
                  b = 14.3496;
                  c = 1.16767;
                }
                if (data.distress_severity == 'Low') {
                  a = -8.52957;
                  b = -8.06467;
                  c = 2.5391;
                }
              }

              if (data.distress_number == 19) {
                a = -17.64737;
                b = -12.88634;
                c = 6.13399;

                if (data.distress_severity == 'High') {
                  a = -2.32421;
                  b = -17.82103;
                  c = 1.68173;
                }
                if (data.distress_severity == 'Medium') {
                  a = -17.64737;
                  b = -12.88634;
                  c = 6.13399;
                }
              }

              // 𝑫𝑽=𝒂−𝒃∗ln(D+C)
              if (data.distress_number == 14) {
                var dv = a - b * Math.pow(c, this.totalDencity[i]);
              } else {
                var dv = a - b * Math.log(this.totalDencity[i] + c);
              }

              if (dv >= 2) {
                this.DVs.push(dv);
              } else {
                this.totalDencityLess2.push(dv);
              }

              this.DVs2.push(dv);
              i = i + 1;
            });
          }
          k = k + 1;
        });

        // end didact value
      },
      (err) => {
        this.print(err);
      }
    );

    this.saveSuccessPopup = false;
    this.saveErrorPopup = '';
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
  async open1(idpci: any) {
    this.totalpci = [];
    this.totalDencity = [];

    this.totalDencityLess2 = [];
    this.DVs = [];
    this.DVs2 = [];
    this.CDVs = [];
    await this.PciSeverityService.getByPciId(idpci).subscribe(
      (data) => {
        this.PCIValues = data;
        var d = 0;
        this.PCIValues.forEach((r) => {
          var p =
            parseFloat('' + r.q1) +
            parseFloat('' + r.q2) +
            parseFloat('' + r.q3) +
            parseFloat('' + r.q4) +
            parseFloat('' + r.q5) +
            parseFloat('' + r.q6) +
            parseFloat('' + r.q7) +
            parseFloat('' + r.q8) +
            parseFloat('' + r.q9);
          this.totalpci.push(p);
          d = (p / 232.2576) * 100;
          this.totalDencity.push(d);
        });
        this.PCIValues.forEach((r) => {
          var num = 0;
          if (parseFloat('' + r.q1) != 0) {
            num = num + 1;
          }
          if (parseFloat('' + r.q2) != 0) {
            num = num + 1;
          }
          if (parseFloat('' + r.q3) != 0) {
            num = num + 1;
          }
          if (parseFloat('' + r.q4) != 0) {
            num = num + 1;
          }
          if (parseFloat('' + r.q5) != 0) {
            num = num + 1;
          }
          if (parseFloat('' + r.q6) != 0) {
            num = num + 1;
          }
          if (parseFloat('' + r.q7) != 0) {
            num = num + 1;
          }
          if (parseFloat('' + r.q8) != 0) {
            num = num + 1;
          }
          if (parseFloat('' + r.q9) != 0) {
            num = num + 1;
          }

          var p =
            (parseFloat('' + r.q1) +
              parseFloat('' + r.q2) +
              parseFloat('' + r.q3) +
              parseFloat('' + r.q4) +
              parseFloat('' + r.q5) +
              parseFloat('' + r.q6) +
              parseFloat('' + r.q7) +
              parseFloat('' + r.q8) +
              parseFloat('' + r.q9)) /
            num;
        });

        //  didact value

        // 𝑫𝑽=𝒂−𝒃∗ln(D+C)
        var i: number = 0;
        this.PCIValues.forEach((data) => {
          var a: number = 0;
          var b: number = 0;
          var c: number = 0;
          // distress number = 1

          if (data.distress_number == 1) {
            if (data.distress_severity == 'High') {
              a = 29.42267;
              b = -13.51048;
              c = 0.15537;
            }
            if (data.distress_severity == 'Medium') {
              a = 15.88601;
              b = -13.14731;
              c = 0.45151;
            }
            if (data.distress_severity == 'Low') {
              a = 2.29165;
              b = -12.70934;
              c = 0.93595;
            }
          }

          if (data.distress_number == 2) {
            if (data.distress_severity == 'High') {
              a = -72.31256;
              b = -30.86561;
              c = 11.35158;
            }
            if (data.distress_severity == 'Medium') {
              a = -32.53448;
              b = -15.12784;
              c = 9.24595;
            }
            if (data.distress_severity == 'Low') {
              a = -79.67268;
              b = -19.78479;
              c = 55.47239;
            }
          }

          if (data.distress_number == 3) {
            if (data.distress_severity == 'High') {
              a = -23.62172;
              b = -20.52985;
              c = 3.25222;
            }
            if (data.distress_severity == 'Medium') {
              a = -17.87333;
              b = -12.86744;
              c = 3.76613;
            }
            if (data.distress_severity == 'Low') {
              a = -25.41762;
              b = -11.20249;
              c = 9.07044;
            }
          }

          if (data.distress_number == 4) {
            if (data.distress_severity == 'High') {
              a = 20.83999;
              b = -21.91199;
              c = 0.70661;
            }
            if (data.distress_severity == 'Medium') {
              a = -83.93172;
              b = -43.08547;
              c = 8.09694;
            }
            if (data.distress_severity == 'Low') {
              a = -106.74746;
              b = -37.07036;
              c = 17.97939;
            }
          }

          if (data.distress_number == 5) {
            if (data.distress_severity == 'High') {
              a = 30.89831;
              b = -13.65081;
              c = 0.17368;
            }
            if (data.distress_severity == 'Medium') {
              a = 4.77709;
              b = -14.76536;
              c = 0.91856;
            }
            if (data.distress_severity == 'Low') {
              a = -27.80323;
              b = -14.39647;
              c = 6.9309;
            }
          }

          if (data.distress_number == 6) {
            if (data.distress_severity == 'High') {
              a = -3.12466;
              b = -17.9149;
              c = 2.14627;
            }
            if (data.distress_severity == 'Medium') {
              a = -20.53414;
              b = -18.73749;
              c = 4.01107;
            }
            if (data.distress_severity == 'Low') {
              a = -33.15847;
              b = -18.07409;
              c = 7.05225;
            }
          }

          if (data.distress_number == 7) {
            if (data.distress_severity == 'High') {
              a = -20.57886;
              b = -16.1736;
              c = 5.04355;
            }
            if (data.distress_severity == 'Medium') {
              a = -9.04172;
              b = -8.8073;
              c = 3.95347;
            }
            if (data.distress_severity == 'Low') {
              a = -24.53999;
              b = -9.08273;
              c = 16.31557;
            }
          }

          if (data.distress_number == 8) {
            if (data.distress_severity == 'High') {
              a = -24.52026;
              b = -22.42963;
              c = 2.94456;
            }
            if (data.distress_severity == 'Medium') {
              a = -21.56556;
              b = -14.53599;
              c = 4.1314;
            }
            if (data.distress_severity == 'Low') {
              a = -36.32016;
              b = -12.91686;
              c = 16.10003;
            }
          }

          if (data.distress_number == 9) {
            if (data.distress_severity == 'High') {
              a = -211.47638;
              b = -55.29184;
              c = 48.59017;
            }
            if (data.distress_severity == 'Medium') {
              a = -1304.37132;
              b = -215.33509;
              c = 432.22313;
            }
            if (data.distress_severity == 'Low') {
              a = -137.31105;
              b = -31.29066;
              c = 82.20668;
            }
          }

          if (data.distress_number == 10) {
            if (data.distress_severity == 'High') {
              a = -39.9327;
              b = -27.61592;
              c = 4.60033;
            }
            if (data.distress_severity == 'Medium') {
              a = -14.37946;
              b = -12.54314;
              c = 2.63189;
            }
            if (data.distress_severity == 'Low') {
              a = -22.15419;
              b = -10.53697;
              c = 6.19692;
            }
          }

          if (data.distress_number == 11) {
            if (data.distress_severity == 'High') {
              a = -1.41164;
              b = -21.38885;
              c = 1.44358;
            }
            if (data.distress_severity == 'Medium') {
              a = -14.35071;
              b = -17.88645;
              c = 2.62632;
            }
            if (data.distress_severity == 'Low') {
              a = -18.91151;
              b = -13.03637;
              c = 3.94991;
            }
          }

          if (data.distress_number == 12) {
            a = -62.20827;
            b = -16.56645;
            c = 41.01446;
          }

          if (data.distress_number == 13) {
            if (data.distress_severity == 'High') {
              a = 47.50634;
              b = -24.03981;
              c = 0.20534;
            }
            if (data.distress_severity == 'Medium') {
              a = 17.58431;
              b = -28.46768;
              c = 0.57547;
            }
            if (data.distress_severity == 'Low') {
              a = 12.06586;
              b = -18.0326;
              c = 0.48068;
            }
          }

          if (data.distress_number == 14) {
            if (data.distress_severity == 'High') {
              a = 79.3417;
              b = 70.21115;
              c = 0.84573;
            }
            if (data.distress_severity == 'Medium') {
              a = 48.71885;
              b = 49.71835;
              c = 0.85943;
            }
            if (data.distress_severity == 'Low') {
              a = 20.30194;
              b = 21.0528;
              c = 0.92045;
            }
          }

          if (data.distress_number == 15) {
            if (data.distress_severity == 'High') {
              a = 23.71806;
              b = -15.31231;
              c = 0.25782;
            }
            if (data.distress_severity == 'Medium') {
              a = 15.11045;
              b = -12.01955;
              c = 0.29569;
            }
            if (data.distress_severity == 'Low') {
              a = 1.42558;
              b = -10.93997;
              c = 0.81476;
            }
          }

          if (data.distress_number == 16) {
            if (data.distress_severity == 'High') {
              a = 0.26916;
              b = -20.79098;
              c = 1.33796;
            }
            if (data.distress_severity == 'Medium') {
              a = -16.75084;
              b = -20.67426;
              c = 2.46427;
            }
            if (data.distress_severity == 'Low') {
              a = -6.6736;
              b = -10.97982;
              c = 1.62058;
            }
          }

          if (data.distress_number == 17) {
            if (data.distress_severity == 'High') {
              a = 18.43868;
              b = -18.02626;
              c = 0.28404;
            }
            if (data.distress_severity == 'Medium') {
              a = 5.79823;
              b = -14.84604;
              c = 0.59815;
            }
            if (data.distress_severity == 'Low') {
              a = -6.03122;
              b = -13.14243;
              c = 1.38048;
            }
          }

          if (data.distress_number == 18) {
            if (data.distress_severity == 'High') {
              a = 0.57754;
              b = -19.97452;
              c = 4.10251;
            }
            if (data.distress_severity == 'Medium') {
              a = 0.40615;
              b = 14.3496;
              c = 1.16767;
            }
            if (data.distress_severity == 'Low') {
              a = -8.52957;
              b = -8.06467;
              c = 2.5391;
            }
          }

          if (data.distress_number == 19) {
            a = -17.64737;
            b = -12.88634;
            c = 6.13399;

            if (data.distress_severity == 'High') {
              a = -2.32421;
              b = -17.82103;
              c = 1.68173;
            }
            if (data.distress_severity == 'Medium') {
              a = -17.64737;
              b = -12.88634;
              c = 6.13399;
            }
          }

          // 𝑫𝑽=𝒂−𝒃∗ln(D+C)
          if (data.distress_number == 14) {
            var dv = a - b * Math.pow(c, this.totalDencity[i]);
          } else {
            var dv = a - b * Math.log(this.totalDencity[i] + c);
          }

          if (dv >= 2) {
            this.DVs.push(dv);
          } else {
            this.totalDencityLess2.push(dv);
          }
          this.DVs2.push(dv);
          i = i + 1;
        });

        // end didact value
      },
      (err) => {
        this.print(err);
      }
    );

    this.saveSuccessPopup = false;
    this.saveErrorPopup = '';
  }

  sum(pci: PCIValues) {
    return 1 + 2;
  }

  totalDencityLess2: number[] = [];
  cdv: number[] = [];
  async openCalculation(content: any, idpci: any) {
    this.totalpci = [];
    this.cdv = [];
    this.totalDencity = [];
    this.sortTotalDidaction = [];
    this.dedactValues = [];
    this.CDVs = [];
    this.PciSeverityService.getByPciId(idpci).subscribe(
      (data) => {
        this.CDVs = [];
        this.PCIValues = data;
        var firstElement = 0;
        this.PCIValues.forEach((r) => {
          var p =
            parseFloat('' + r.q1) +
            parseFloat('' + r.q2) +
            parseFloat('' + r.q3) +
            parseFloat('' + r.q4) +
            parseFloat('' + r.q5) +
            parseFloat('' + r.q6) +
            parseFloat('' + r.q7) +
            parseFloat('' + r.q8) +
            parseFloat('' + r.q9);
          this.totalpci.push(p);
        });
        this.PCIValues.forEach((r) => {
          var num = 0;
          if (parseFloat('' + r.q1) != 0) {
            num = num + 1;
          }
          if (parseFloat('' + r.q2) != 0) {
            num = num + 1;
          }
          if (parseFloat('' + r.q3) != 0) {
            num = num + 1;
          }
          if (parseFloat('' + r.q4) != 0) {
            num = num + 1;
          }
          if (parseFloat('' + r.q5) != 0) {
            num = num + 1;
          }
          if (parseFloat('' + r.q6) != 0) {
            num = num + 1;
          }
          if (parseFloat('' + r.q7) != 0) {
            num = num + 1;
          }
          if (parseFloat('' + r.q8) != 0) {
            num = num + 1;
          }
          if (parseFloat('' + r.q9) != 0) {
            num = num + 1;
          }
          var q = 0;
          if (this.PCIValues.length - 1 == firstElement) {
            // q

            var smallest_dv = 10000;
            this.DVs.forEach((element) => {
              if (smallest_dv > element) {
                smallest_dv = element;
              }
            });
            var larg_dv = -55;
            this.DVs.forEach((element) => {
              if (larg_dv < element) {
                larg_dv = element;
              }
            });

            q = 1 + (9 / 98) * (100 - larg_dv);
            if (q < 8) {
              q = q % 1;
              q = q * smallest_dv;
            } else {
              q = 7;
            }

            q = q;
            if (q < 2) {
              q = 2;
            }
            var sortedArray: number[] = this.DVs.sort((n1, n2) => n1 - n2);
            this.totalDencity = sortedArray.reverse();
          } else {
            if (this.DVs[firstElement] >= 2) {
              this.totalDencity.push(this.DVs[firstElement]);
            } else {
              // this.totalDencityLess2.push(this.DVs[firstElement]);
            }
          }
          firstElement = firstElement + 1;
        });

        for (var i = 0; i < this.totalDencity.length; i = i + 1) {
          var temp: number[] = [];
          for (var j = 0; j < this.totalDencity.length - i; j = j + 1) {
            temp.push(this.totalDencity[j]);
          }

          for (var k = 0; k < i; k = k + 1) {
            temp.push(2);
          }
          this.totalDencityLess2.forEach((element) => {
            temp.push(element);
          });
          this.sortTotalDidaction.push(temp);
        }
        var k = 0;
        this.sortTotalDidaction.forEach((element) => {
          var q = this.sortTotalDidaction.length - k;
          var t1: DedactValues = {
            v1: parseFloat('' + element[0]),
            v2: parseFloat('' + element[1]),
            v3: parseFloat('' + element[2]),
            v4: parseFloat('' + element[3]),
            v5: parseFloat('' + element[4]),
            v6: parseFloat('' + element[5]),
            v7: parseFloat('' + element[6]),
            v8: parseFloat('' + element[7]),
            v9: parseFloat('' + element[8]),
            v10: parseFloat('' + element[9]),
            q: parseFloat('' + q),
          };

          t1.v1 = t1.v1 ? t1.v1 : 0;
          t1.v2 = t1.v2 ? t1.v2 : 0;
          t1.v3 = t1.v3 ? t1.v3 : 0;
          t1.v4 = t1.v4 ? t1.v4 : 0;
          t1.v5 = t1.v5 ? t1.v5 : 0;
          t1.v6 = t1.v6 ? t1.v6 : 0;
          t1.v7 = t1.v7 ? t1.v7 : 0;
          t1.v8 = t1.v8 ? t1.v8 : 0;
          t1.v9 = t1.v9 ? t1.v9 : 0;
          t1.v10 = t1.v10 ? t1.v10 : 0;

          var p =
            parseFloat('' + t1.v1) +
            parseFloat('' + t1.v2) +
            parseFloat('' + t1.v3) +
            parseFloat('' + t1.v4) +
            parseFloat('' + t1.v5) +
            parseFloat('' + t1.v6) +
            parseFloat('' + t1.v7) +
            parseFloat('' + t1.v8) +
            parseFloat('' + t1.v9) +
            parseFloat('' + t1.v10);
          t1.total = p;
          k = k + 1;

          //  calculate cdv
          var b0: number = 0;
          var b1: number = 0;
          var b2: number = 0;

          if (q == 1) {
            b0 = -0.22717;
            b1 = 0.98738;
            b2 = 0.000013919;
          }

          if (q == 2) {
            b0 = -3.79947;
            b1 = 0.89442;
            b2 = -0.00162;
          }

          if (q == 3) {
            b0 = -6.25804;
            b1 = 0.81167;
            b2 = -0.00124;
          }
          if (q == 4) {
            b0 = -12.0146;
            b1 = 0.83218;
            b2 = -0.00138;
          }

          if (q == 5) {
            b0 = -12.25465;
            b1 = 0.75625;
            b2 = -0.00112;
          }

          if (q == 6) {
            b0 = -13.97952;
            b1 = 0.72581;
            b2 = 0.00101;
          }

          if (q == 7) {
            b0 = -18.77054;
            b1 = 0.84443;
            b2 = -0.00166;
          }
          if (q > 7) {
            b0 = -18.77054;
            b1 = 0.84443;
            b2 = -0.00166;
          }
          var cdv = 0;
          if (this.sortTotalDidaction.length == 1) {
            this.DVs.forEach((element) => {
              cdv = element;
            });
          } else {
            cdv = b0 + b1 * t1.total + b2 * (t1.total * t1.total);
          }

          // 𝑪𝑫𝑽=𝑩𝟎+𝐁𝟏∗𝐓𝐃𝐕+𝐁𝟐〖∗𝑻𝑫𝑽〗^𝟐

          t1.cdv = parseFloat('' + cdv);
          this.dedactValues.push(t1);
          this.CDVs.push(parseFloat('' + cdv));

          //  𝑪𝑫𝑽=𝑩𝟎+𝐁𝟏∗𝐓𝐃𝐕+𝐁𝟐〖∗𝑻𝑫𝑽〗^𝟐
        });
      },
      (err) => {}
    );

    this.saveSuccessPopup = false;
    this.saveErrorPopup = '';
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
  async openCalculation1(idpci: any, index11: number) {
    this.totalpci = [];
    this.totalDencity = [];
    this.totalDencityLess2 = [];
    this.DVs = [];
    this.DVs2 = [];
    this.CDVs = [];
    this.cdv = [];
    this.sortTotalDidaction = [];
    this.dedactValues = [];

    this.PciSeverityService.getByPciId(idpci).subscribe(
      (data) => {
        this.PCIValues = data;
        this.totalpci = [];
        this.totalDencity = [];

        this.totalDencityLess2 = [];
        this.DVs = [];
        this.DVs2 = [];
        this.CDVs = [];
        this.cdv = [];
        this.sortTotalDidaction = [];
        this.dedactValues = [];
        var d = 0;
        var sampleArea: any;

        this.PCIValues.forEach((r) => {
          var p =
            parseFloat('' + r.q1) +
            parseFloat('' + r.q2) +
            parseFloat('' + r.q3) +
            parseFloat('' + r.q4) +
            parseFloat('' + r.q5) +
            parseFloat('' + r.q6) +
            parseFloat('' + r.q7) +
            parseFloat('' + r.q8) +
            parseFloat('' + r.q9);
          this.totalpci.push(p);

          d = (p / 232.2576) * 100;
          this.totalDencity.push(d);
        });

        //  didact value
        // 𝑫𝑽=𝒂−𝒃∗ln(D+C)
        var i: number = 0;
        this.DVs = [];
        this.DVs2 = [];

        this.PCIValues.forEach((data) => {
          var a: number = 0;
          var b: number = 0;
          var c: number = 0;
          if (data.distress_number == 1) {
            if (data.distress_severity == 'High') {
              a = 29.42267;
              b = -13.51048;
              c = 0.15537;
            }
            if (data.distress_severity == 'Medium') {
              a = 15.88601;
              b = -13.14731;
              c = 0.45151;
            }
            if (data.distress_severity == 'Low') {
              a = 2.29165;
              b = -12.70934;
              c = 0.93595;
            }
          }

          if (data.distress_number == 2) {
            if (data.distress_severity == 'High') {
              a = -72.31256;
              b = -30.86561;
              c = 11.35158;
            }
            if (data.distress_severity == 'Medium') {
              a = -32.53448;
              b = -15.12784;
              c = 9.24595;
            }
            if (data.distress_severity == 'Low') {
              a = -79.67268;
              b = -19.78479;
              c = 55.47239;
            }
          }

          if (data.distress_number == 3) {
            if (data.distress_severity == 'High') {
              a = -23.62172;
              b = -20.52985;
              c = 3.25222;
            }
            if (data.distress_severity == 'Medium') {
              a = -17.87333;
              b = -12.86744;
              c = 3.76613;
            }
            if (data.distress_severity == 'Low') {
              a = -25.41762;
              b = -11.20249;
              c = 9.07044;
            }
          }

          if (data.distress_number == 4) {
            if (data.distress_severity == 'High') {
              a = 20.83999;
              b = -21.91199;
              c = 0.70661;
            }
            if (data.distress_severity == 'Medium') {
              a = -83.93172;
              b = -43.08547;
              c = 8.09694;
            }
            if (data.distress_severity == 'Low') {
              a = -106.74746;
              b = -37.07036;
              c = 17.97939;
            }
          }

          if (data.distress_number == 5) {
            if (data.distress_severity == 'High') {
              a = 30.89831;
              b = -13.65081;
              c = 0.17368;
            }
            if (data.distress_severity == 'Medium') {
              a = 4.77709;
              b = -14.76536;
              c = 0.91856;
            }
            if (data.distress_severity == 'Low') {
              a = -27.80323;
              b = -14.39647;
              c = 6.9309;
            }
          }

          if (data.distress_number == 6) {
            if (data.distress_severity == 'High') {
              a = -3.12466;
              b = -17.9149;
              c = 2.14627;
            }
            if (data.distress_severity == 'Medium') {
              a = -20.53414;
              b = -18.73749;
              c = 4.01107;
            }
            if (data.distress_severity == 'Low') {
              a = -33.15847;
              b = -18.07409;
              c = 7.05225;
            }
          }

          if (data.distress_number == 7) {
            if (data.distress_severity == 'High') {
              a = -20.57886;
              b = -16.1736;
              c = 5.04355;
            }
            if (data.distress_severity == 'Medium') {
              a = -9.04172;
              b = -8.8073;
              c = 3.95347;
            }
            if (data.distress_severity == 'Low') {
              a = -24.53999;
              b = -9.08273;
              c = 16.31557;
            }
          }

          if (data.distress_number == 8) {
            if (data.distress_severity == 'High') {
              a = -24.52026;
              b = -22.42963;
              c = 2.94456;
            }
            if (data.distress_severity == 'Medium') {
              a = -21.56556;
              b = -14.53599;
              c = 4.1314;
            }
            if (data.distress_severity == 'Low') {
              a = -36.32016;
              b = -12.91686;
              c = 16.10003;
            }
          }

          if (data.distress_number == 9) {
            if (data.distress_severity == 'High') {
              a = -211.47638;
              b = -55.29184;
              c = 48.59017;
            }
            if (data.distress_severity == 'Medium') {
              a = -1304.37132;
              b = -215.33509;
              c = 432.22313;
            }
            if (data.distress_severity == 'Low') {
              a = -137.31105;
              b = -31.29066;
              c = 82.20668;
            }
          }

          if (data.distress_number == 10) {
            if (data.distress_severity == 'High') {
              a = -39.9327;
              b = -27.61592;
              c = 4.60033;
            }
            if (data.distress_severity == 'Medium') {
              a = -14.37946;
              b = -12.54314;
              c = 2.63189;
            }
            if (data.distress_severity == 'Low') {
              a = -22.15419;
              b = -10.53697;
              c = 6.19692;
            }
          }

          if (data.distress_number == 11) {
            if (data.distress_severity == 'High') {
              a = -1.41164;
              b = -21.38885;
              c = 1.44358;
            }
            if (data.distress_severity == 'Medium') {
              a = -14.35071;
              b = -17.88645;
              c = 2.62632;
            }
            if (data.distress_severity == 'Low') {
              a = -18.91151;
              b = -13.03637;
              c = 3.94991;
            }
          }

          if (data.distress_number == 12) {
            a = -62.20827;
            b = -16.56645;
            c = 41.01446;
          }

          if (data.distress_number == 13) {
            if (data.distress_severity == 'High') {
              a = 47.50634;
              b = -24.03981;
              c = 0.20534;
            }
            if (data.distress_severity == 'Medium') {
              a = 17.58431;
              b = -28.46768;
              c = 0.57547;
            }
            if (data.distress_severity == 'Low') {
              a = 12.06586;
              b = -18.0326;
              c = 0.48068;
            }
          }

          if (data.distress_number == 14) {
            if (data.distress_severity == 'High') {
              a = 23.18542;
              b = -17.19884;
              c = -0.32829;
            }
            if (data.distress_severity == 'Medium') {
              a = 8.14297;
              b = -11.83739;
              c = -0.35657;
            }
            if (data.distress_severity == 'Low') {
              a = -7.24794;
              b = -7.2989;
              c = 1.88559;
            }
          }

          if (data.distress_number == 15) {
            if (data.distress_severity == 'High') {
              a = 23.71806;
              b = -15.31231;
              c = 0.25782;
            }
            if (data.distress_severity == 'Medium') {
              a = 15.11045;
              b = -12.01955;
              c = 0.29569;
            }
            if (data.distress_severity == 'Low') {
              a = 1.42558;
              b = -10.93997;
              c = 0.81476;
            }
          }

          if (data.distress_number == 16) {
            if (data.distress_severity == 'High') {
              a = 0.26916;
              b = -20.79098;
              c = 1.33796;
            }
            if (data.distress_severity == 'Medium') {
              a = -16.75084;
              b = -20.67426;
              c = 2.46427;
            }
            if (data.distress_severity == 'Low') {
              a = -6.6736;
              b = -10.97982;
              c = 1.62058;
            }
          }

          if (data.distress_number == 17) {
            if (data.distress_severity == 'High') {
              a = 18.43868;
              b = -18.02626;
              c = 0.28404;
            }
            if (data.distress_severity == 'Medium') {
              a = 5.79823;
              b = -14.84604;
              c = 0.59815;
            }
            if (data.distress_severity == 'Low') {
              a = -6.03122;
              b = -13.14243;
              c = 1.38048;
            }
          }

          if (data.distress_number == 18) {
            if (data.distress_severity == 'High') {
              a = 0.57754;
              b = -19.97452;
              c = 4.10251;
            }
            if (data.distress_severity == 'Medium') {
              a = 0.40615;
              b = 14.3496;
              c = 1.16767;
            }
            if (data.distress_severity == 'Low') {
              a = -8.52957;
              b = -8.06467;
              c = 2.5391;
            }
          }

          if (data.distress_number == 19) {
            a = -17.64737;
            b = -12.88634;
            c = 6.13399;

            if (data.distress_severity == 'High') {
              a = -2.32421;
              b = -17.82103;
              c = 1.68173;
            }
            if (data.distress_severity == 'Medium') {
              a = -17.64737;
              b = -12.88634;
              c = 6.13399;
            }
          }

          // 𝑫𝑽=𝒂−𝒃∗ln(D+C)
          var dv = a - b * Math.log(this.totalDencity[i] + c);
          this.DVs.push(dv);
          i = i + 1;
        });
        var smallest_dv = 10000;
        this.DVs.forEach((element) => {
          if (smallest_dv > element) {
            smallest_dv = element;
          }
        });
        var larg_dv = -55;
        this.DVs.forEach((element) => {
          if (larg_dv < element) {
            larg_dv = element;
          }
        });

        var q = 1 + (9 / 98) * (100 - larg_dv);
        if (q < 8) {
          q = q % 1;
          q = q * smallest_dv;
        } else {
          q = 7;
        }

        q = q;
        if (q < 2) {
          q = 2;
        }
        //  q =  4.8;
        var sortedArray: number[] = this.DVs.sort((n1, n2) => n1 - n2);
        this.totalDencity = sortedArray;
        this.totalDencity.reverse();

        this.sortTotalDidaction = [];
        for (var i = 0; i < this.DVs.length; i = i + 1) {
          var temp: number[] = [];
          for (var j = 0; j < this.DVs.length - i; j = j + 1) {
            temp.push(this.totalDencity[j]);
          }

          for (var k = 0; k < i; k = k + 1) {
            temp.push(2);
          }

          this.totalDencityLess2.forEach((element) => {
            temp.push(element);
          });
          this.sortTotalDidaction.push(temp);
        }

        //  this.DVs.forEach(element => {
        //
        // });

        var k = 0;
        this.CDVs = [];
        this.dedactValues = [];
        this.sortTotalDidaction.forEach((element, index, array) => {
          var q = this.sortTotalDidaction.length - k;
          var t1: DedactValues = {
            v1: parseFloat('' + element[0]),
            v2: parseFloat('' + element[1]),
            v3: parseFloat('' + element[2]),
            v4: parseFloat('' + element[3]),
            v5: parseFloat('' + element[4]),
            v6: parseFloat('' + element[5]),
            v7: parseFloat('' + element[6]),
            v8: parseFloat('' + element[7]),
            v9: parseFloat('' + element[8]),
            v10: parseFloat('' + element[9]),
            q: parseFloat('' + q),
          };

          t1.v1 = t1.v1 ? t1.v1 : 0;
          t1.v2 = t1.v2 ? t1.v2 : 0;
          t1.v3 = t1.v3 ? t1.v3 : 0;
          t1.v4 = t1.v4 ? t1.v4 : 0;
          t1.v5 = t1.v5 ? t1.v5 : 0;
          t1.v6 = t1.v6 ? t1.v6 : 0;
          t1.v7 = t1.v7 ? t1.v7 : 0;
          t1.v8 = t1.v8 ? t1.v8 : 0;
          t1.v9 = t1.v9 ? t1.v9 : 0;
          t1.v10 = t1.v10 ? t1.v10 : 0;

          // if(t1.v10 == NaN) t1.v10 = 0
          var p =
            parseFloat('' + t1.v1) +
            parseFloat('' + t1.v2) +
            parseFloat('' + t1.v3) +
            parseFloat('' + t1.v4) +
            parseFloat('' + t1.v5) +
            parseFloat('' + t1.v6) +
            parseFloat('' + t1.v7) +
            parseFloat('' + t1.v8) +
            parseFloat('' + t1.v9) +
            parseFloat('' + t1.v10);
          t1.total = p;
          k = k + 1;

          //  calculate cdv
          var b0: number = 0;
          var b1: number = 0;
          var b2: number = 0;

          if (q == 1) {
            b0 = -0.22717;
            b1 = 0.98738;
            b2 = 0.000013919;
          }

          if (q == 2) {
            b0 = -3.79947;
            b1 = 0.89442;
            b2 = -0.00162;
          }

          if (q == 3) {
            b0 = -6.25804;
            b1 = 0.81167;
            b2 = -0.00124;
          }
          if (q == 4) {
            b0 = -12.0146;
            b1 = 0.83218;
            b2 = -0.00138;
          }

          if (q == 5) {
            b0 = -12.25465;
            b1 = 0.75625;
            b2 = -0.00112;
          }

          if (q == 6) {
            b0 = -13.97952;
            b1 = 0.72581;
            b2 = 0.00101;
          }

          if (q == 7) {
            b0 = -18.77054;
            b1 = 0.84443;
            b2 = -0.00166;
          }
          if (q > 7) {
            b0 = -18.77054;
            b1 = 0.84443;
            b2 = -0.00166;
          }
          var cdv = 0;
          if (this.sortTotalDidaction.length == 1) {
            this.DVs.forEach((element) => {
              cdv = element;
            });
            // var cdv = b0+b1*t1.total+b2*(t1.total*t1.total);
          } else {
            cdv = b0 + b1 * t1.total + b2 * (t1.total * t1.total);
          }
          // 𝑪𝑫𝑽=𝑩𝟎+𝐁𝟏∗𝐓𝐃𝐕+𝐁𝟐〖∗𝑻𝑫𝑽〗^𝟐
          t1.cdv = parseFloat('' + cdv);
          this.dedactValues.push(t1);
          this.CDVs.push(parseFloat('' + cdv));
        });

        var maxCDV = 0;
        var TDV = 0;
        var pci = 0;

        if (this.sortTotalDidaction.length == 1) {
          this.CDVs.forEach((element) => {
            TDV = element;
            maxCDV = element;
          });
        } else {
          for (let index = 0; index < this.CDVs.length; index++) {
            const element = this.CDVs[index];
            const element2 = this.dedactValues[index];
            if (element > maxCDV) {
              maxCDV = element;
            }
          }
          for (let index = 0; index < this.CDVs.length; index++) {
            const element = this.CDVs[index];
            const element2 = this.dedactValues[index];
            if (element > TDV) {
              if (element2?.total) {
                TDV = element2?.total;
              }
            }
          }
          this.CDVs.forEach((element) => {
            if (element > maxCDV) maxCDV = element;
          });
        }

        pci = 100 - maxCDV;

        this.rodes[index11].PCI = pci;
        this.rodes[index11].CDV = maxCDV;
        this.rodes[index11].TDV = TDV;
        this.rodes[index11].SampleArea = sampleArea;

        if (pci > 89) {
          this.rodes[index11].rating = 'Good';
        }
        if (pci < 89) {
          this.rodes[index11].rating = 'Good';
        }
        if (pci < 71) {
          this.rodes[index11].rating = 'Satisfactory';
        }
        if (pci < 56) {
          this.rodes[index11].rating = 'Fair';
        }
        if (pci < 41) {
          this.rodes[index11].rating = 'Poor';
        }
        if (pci < 26) {
          this.rodes[index11].rating = 'Very pool';
        }
        if (pci < 11) {
          this.rodes[index11].rating = 'Faild';
        }

        // this.rodes.sort((a, b) => (a.PCI > b.PCI) ? 1 : ((b.PCI > a.PCI) ? -1 : 0));

        // this.rodes.sort((a, b) => (a.PCI > b.PCI) ? 1 : ((b.PCI > a.PCI) ? -1 : 0));
      },
      (err) => {
        this.print(err);
      }
    );
  }

  PCIValuesPopup: PCIValues[] = [];
  openResultValue: any;

  finalPCI: number = 0;
  finalRatting: string = '';
  maintenanceStrategy: string = '';
  colour: string = '';
  openResult(content: any, rode: any) {
    this.openResultValue = rode;

    this.PciSeverityService.getByPciId(rode.rodeInfo.idpci).subscribe(
      (data) => {
        this.PCIValuesPopup = data;
      }
    );

    var upper = 0;
    var lower: number = 0;
    this.rodes.forEach((element) => {
      upper = upper + element.PCI * element.SampleArea;
      lower = lower + parseFloat('' + element.SampleArea);
    });

    this.finalPCI = upper / lower;
    var pci = this.finalPCI;
    if (pci > 89) {
      this.finalRatting = 'Good';
    }
    if (pci < 89) {
      this.finalRatting = 'Good';
    }
    if (pci < 71) {
      this.finalRatting = 'Satisfactory';
    }
    if (pci < 56) {
      this.finalRatting = 'Fair';
    }
    if (pci < 41) {
      this.finalRatting = 'Poor';
    }
    if (pci < 26) {
      this.finalRatting = 'Very pool';
    }
    if (pci < 11) {
      this.finalRatting = 'Faild';
    }
    // this.openResultForFirsttime()
    this.saveSuccessPopup = false;
    this.saveErrorPopup = '';
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
  openResultForFirsttime() {
    var upper = 0;
    var lower: number = 0;
    this.rodes.forEach((element) => {
      element.SampleArea = 232.2576;
      upper = upper + element.PCI * element.SampleArea;
      lower = lower + parseFloat('' + element.SampleArea);
    });
    this.finalPCI = upper / lower;
    var pci = this.finalPCI;
    if (pci >= 86 && pci <= 100) {
      this.finalRatting = 'Good';
      this.maintenanceStrategy = 'Routine Maintenance';
      this.colour = 'Dark Green';
    } else if (pci >= 71 && pci <= 85) {
      this.finalRatting = 'Satisfactory';
      this.maintenanceStrategy = 'Preventive Maintenance';
      this.colour = 'Light Green';
    } else if (pci >= 56 && pci <= 70) {
      this.finalRatting = 'Fair';
      this.maintenanceStrategy = 'Minor Rehabilitation';
      this.colour = 'Yellow';
    } else if (pci >= 41 && pci <= 55) {
      this.finalRatting = 'Poor';
      this.maintenanceStrategy = 'Minor Rehabilitation';
      this.colour = 'Light Red';
    } else if (pci >= 26 && pci <= 40) {
      this.finalRatting = 'Very pool';
      this.maintenanceStrategy = 'Major Rehabilitation';
      this.colour = 'Medium Red';
    } else if (pci >= 11 && pci <= 25) {
      this.finalRatting = 'Serios';
      this.maintenanceStrategy = 'Reconstruction';
      this.colour = 'Dark Red';
    } else if (pci >= 0 && pci <= 10) {
      this.finalRatting = 'Faild';
      this.maintenanceStrategy = 'Reconstruction';
      this.colour = 'Dark Gray';
    }
  }

  printDiv(divName: string) {
    var printContents = document.getElementById('printableArea')?.innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents + '';

    window.print();
    window.location.reload();
  }
}
function openResultForFirsttime() {
  throw new Error('Function not implemented.');
}
