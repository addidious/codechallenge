import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service : UserService, private toastr:ToastrService) { }

  onSubmit(){

    if(this.service.formModel.get('Passwords.Password')?.value
        != this.service.formModel.get('Passwords.ConfirmPassword')?.value){
          this.toastr.error('Passwords do not match, please try again.');
        }
    else{
      this.service.register().subscribe(
        (res:any)=>{
          if(res.succeeded){
            this.service.formModel.reset();
          }
        },
        err=>{
          switch (err.error) {
            case "Name already exists":
              this.toastr.error('Name already exists, please try using another name.');
              break;

            default:
              console.log(err);
              break;
          }
        }
      )
    }
  }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

}
