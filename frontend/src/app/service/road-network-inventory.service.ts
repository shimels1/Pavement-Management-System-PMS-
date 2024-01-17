import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { RoadnetWorkInventory } from '../model/rodeInfo';

@Injectable({
  providedIn: 'root',
})
export class RoadNetworkInventoryService {
  url = 'https://apiforapps.com/rodeApi/api/rodeNetwork/';

  constructor(private http: HttpClient) {}

  saveRodeNetworkInventory(form: NgForm) {
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
    return this.http.get<RoadnetWorkInventory[]>(this.url + 'getAll');
  }

  deleteOrder(sectionID: any) {
    return this.http.delete(this.url + 'delete/' + sectionID, {});
  }
  getByUsername(username: any) {
    return this.http.get<RoadnetWorkInventory[]>(
      this.url + 'getByUsername/' + username
    );
  }
}
