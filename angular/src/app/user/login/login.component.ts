import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
formModel={
  UserName : '',
  Password:''
}
  constructor(private service:UserService, private router:Router,private toastr:ToastrService) { }

  ngOnInit() {
    if(localStorage.getItem('token')!= null)
    this.router.navigateByUrl('/inventory');
  }

  onSubmit(form:NgForm){
    this.service.login(form).subscribe(
      (res:any)=>{
        localStorage.setItem('token',res);
        this.router.navigateByUrl('/inventory');
      },
      err=>{
        this.toastr.error("Incorrect username or password.",'Authentication failed.');
      }
    );
  }
}
