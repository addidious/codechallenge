import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryDetail } from '../shared/inventory-detail.model';
import { InventoryDetailService } from '../shared/inventory-detail.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: []
})
export class InventoryComponent implements OnInit {

  constructor(public service: InventoryDetailService, private router:Router) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(item:InventoryDetail){
    this.service.formData = Object.assign({},item);
  }

  logout(){
    this.router.navigateByUrl('/user/login');
    localStorage.removeItem('token');
  }

}
