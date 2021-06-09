import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InventoryDetail } from './inventory-detail.model';

@Injectable({
  providedIn: 'root'
})

export class InventoryDetailService {

  constructor(private http:HttpClient){ }
  readonly baseURL = 'https://damp-everglades-03986.herokuapp.com/';

  formData: InventoryDetail = new InventoryDetail();
  list !: InventoryDetail[];

  postInventoryDetail(){
    return this.http.post(this.baseURL+'api/inventory',this.formData);
  }

  patchInventoryDetail(){
    const body = {
      _id:this.formData._id,
      itemName:this.formData.itemName,
      quantity:this.formData.quantity
    };
    return this.http.patch(this.baseURL+'api/inventory/'+this.formData._id,body);
  }

  refreshList(){
    this.http.get(this.baseURL+'api/inventory')
              .toPromise()
              .then(res=>{
                this.list = res as InventoryDetail[];
              });
  }

}
