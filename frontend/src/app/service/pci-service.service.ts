import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { PCI } from '../model/pci';
@Injectable({
  providedIn: 'root',
})
export class PciServiceService {
  url = 'https://apiforapps.com/rodeApi/api/pci/';

  constructor(private http: HttpClient) {}

  savePCI(form: NgForm) {
    return this.http.post(this.url + 'add', form).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getAllitems() {
    console.log(this.url + 'getAll');
    return this.http.get<PCI[]>(this.url + 'getAll');
  }

  getBySectionID(sectionID: string) {
    return this.http.get<PCI[]>(this.url + 'getBySectionID/' + sectionID);
  }

  getByidpci(idpci: string) {
    return this.http.get<PCI>(this.url + 'getByidpci/' + idpci);
  }

  deleteOrder(idpci: any) {
    return this.http.delete(this.url + 'delete/' + idpci, {});
  }
}
