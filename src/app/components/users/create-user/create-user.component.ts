import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from '../../../shared/service/login.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public accountForm: FormGroup;
  public permissionForm: FormGroup;
  public registerForm: FormGroup;
  public validateOtpForm: FormGroup;
  public mensaje: any;
  public requireOtp: boolean = false;
  public countries: any;
  public country: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) {
    //this.createAccountForm();
    //this.createPermissionForm();
    this.createRegisterForm();
    this.createOtpForm();
  }

  createAccountForm() {
    this.accountForm = this.formBuilder.group({
      fname: [''],
      lname: [''],
      email: [''],
      password: [''],
      confirmPwd: ['']
    });
  }
  createPermissionForm() {
    this.permissionForm = this.formBuilder.group({
    });
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: [{ value: '', disabled: this.requireOtp }, [Validators.required, Validators.email]],
      nombre: [{ value: '', disabled: this.requireOtp }, Validators.required],
      password: [{ value: '', disabled: this.requireOtp }, Validators.required],
      countrycode: ['', Validators.required],
      tel: [{ value: '', disabled: this.requireOtp }, Validators.required]
    });
  }
  
  createOtpForm(){
    this.validateOtpForm = this.formBuilder.group({
      otp: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.countries = [{
      code: "+593",
      name: "Ecuador"
    }]
    this.country = this.countries[0].code;
  }

  register(){ 
    console.log(this.registerForm.value);
    // User data which we have received from the registration form.
    let formData = this.registerForm.value;
    formData['tel']=formData['countrycode']+formData['tel'];
    delete formData['countrycode'];
    console.log(formData);
    this.loginService.registerUser(formData).subscribe((response)=>{
      console.log(response);
      if(response['mensajeRetorno']=="Usuario Almacenado"){
        //alert('El usuario se ha creado correctamente');
        this.requireOtp=true;   
      }else if(response['mensajeRetorno']=="usuario ya existe"){
        alert("El usuario ya existe");
      }else{
        alert("El usuario no se pudo registrar");
      }
     });
  }

  validateOtp(){
    let obj={
      "email": this.registerForm.value.email,
      //"password": this.registerForm.value.password,
      "otp": this.validateOtpForm.value.otp
    }
    console.log(obj);
    this.loginService.validateOtp(obj).subscribe((response)=>{
      console.log(response);
      // usuario activo
      if(response['codigoRetorno']=="0001"){
        alert('El usuario se ha creado correctamente');  
        localStorage.setItem("token", response['token']);
        localStorage.setItem("user", JSON.stringify(response['usuario']));
        //alert('Usuario '+JSON.stringify(response['usuario'])+' creado correctamente');
      }else{
        alert("Código incorrecto, el usuario no se pudo activar");
      }
     });
  }

}
