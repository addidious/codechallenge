import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder, private http:HttpClient) { }
  readonly BaseURL = 'https://damp-everglades-03986.herokuapp.com/';

  formModel = this.fb.group({
    UserName:['',Validators.required],
    Passwords:this.fb.group({
      Password:['',[Validators.required,Validators.minLength(6)]],
      ConfirmPassword:['',Validators.required]
    },{Validators:this.comparePasswords}),
  });

  comparePasswords(fb:FormGroup){
    let confirmPasswordControl = fb.get('ConfirmPassword');

    if(confirmPasswordControl?.errors == null || 'passwordMismatch' in confirmPasswordControl.errors){
      if(fb.get('Password')?.value!=confirmPasswordControl?.value){
        confirmPasswordControl?.setErrors({
          passwordMismatch:true
        });
      }
      else{
        confirmPasswordControl?.setErrors(null);
      }
    }
  }

  register(){
    var body = {
      name:this.formModel.value.UserName,
      password:this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURL+'api/user/register',body);
  }

  login(formData:NgForm){
    const body = {
      name:formData.value.UserName,
      password:formData.value.Password
    }
    return this.http.post(this.BaseURL+'api/user/login',body);
  }
}
