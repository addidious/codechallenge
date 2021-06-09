import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InventoryDetail } from 'src/app/shared/inventory-detail.model';
import { InventoryDetailService } from 'src/app/shared/inventory-detail.service';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: []
})
export class InventoryFormComponent implements OnInit {

  constructor(public service:InventoryDetailService, private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(this.service.formData._id==null){
      this.insertItem(form);
    }
    else{
      this.updateItem(form);
    }
  }

  insertItem(form:NgForm){
    this.service.postInventoryDetail().subscribe(
      res=>{
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Item Added Successfully')
      },
      err=>{
        console.log(err.error);
      }
    )
  }

  updateItem(form:NgForm){
    this.service.patchInventoryDetail().subscribe(
      res=>{
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Item Updated Successfully')
      },
      err=>{
        if(err.error.text="Item deleted"){
          this.resetForm(form);
          this.service.refreshList();
          this.toastr.warning('Item Deleted');
        }
        else{
          console.log(err);
        }
      }
    )
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new InventoryDetail();
  }
}
