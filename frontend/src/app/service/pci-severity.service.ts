import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { PCI } from '../model/pci';
import { PCIValues } from '../model/pciInventory';
@Injectable({
  providedIn: 'root',
})
export class PciSeverityService {
  url = 'https://apiforapps.com/rodeApi/api/pciSeverity/';

  constructor(private http: HttpClient) {}

  savePCISeverity(form: any) {
    console.log('this');
    console.log(form.q1);
    console.log('this');
    return this.http.post(this.url + 'add', form).pipe(
      map((res) => {
        console.log(form);
        if (res) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  getAllitems() {
    console.log(this.url + 'getAll');
    return this.http.get<PCI[]>(this.url + 'getAll');
  }

  getByPciId(pci_id: string) {
    return this.http.get<PCIValues[]>(this.url + 'getByPciId/' + pci_id);
  }
  deleteOrder(idpci: any) {
    return this.http.delete(this.url + 'delete/' + idpci, {});
  }
}
