import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators,FormArray } from '@angular/forms';
import { forbiddenNameValidator } from './shared/user-name.validator';
import { passwordValidator } from './shared/password-validator';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  registrationForm:FormGroup;
  ngOnInit(){
    this.registrationForm=this.fb.group({
      userName: ['Bhuwan fb',[Validators.required,Validators.minLength(3), forbiddenNameValidator(/password/)]],
      email:'',
      subscribe:false,
      password: '',
      confirmPassword: '',
      address:this.fb.group( {
      city: 'formbuilder',
      state: '',
      postalCode: '', 
        }),
     alternateEmails:this.fb.array([]),   
    },{validator: passwordValidator});

    this.registrationForm.get('subscribe').valueChanges
    .subscribe(checkedValue => {
      const email=this.registrationForm.get('email');
      if(checkedValue){
        email.setValidators(Validators.required);
      }else{
        email.clearValidators();        
      }
      email.updateValueAndValidity();
    })
  }
  get uName(){
    return this.registrationForm.get('userName');
  }

  get email(){
    return this.registrationForm.get('email');
  }

  get alternateEmails(){
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail(){
    this.alternateEmails.push(this.fb.control(''));
  }
constructor(private fb:FormBuilder, private _registrationService:RegistrationService){}
  

  /* registrationForm = new FormGroup({
    userName: new FormControl('Bhuwan'),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    address: new FormGroup({
    city: new FormControl(''),
    state: new FormControl(''),
    postalCode: new FormControl(''), 
    })
  }); */
  loadAPIData(){
    this.registrationForm.setValue(
      {
    userName: 'Bhuwan APi data',
    password: '',
    confirmPassword: '',
    address: {
    city: 'city load',
    state: '',
    postalCode: '23294', 
      }
      });
  }
  onSubmit(){
    console.log(this.registrationForm.value);
    this._registrationService.register(this.registrationForm.value)
    .subscribe(
      response => console.log('Success', response),
      error => console.error('Error!',error)
    );
  }
}
