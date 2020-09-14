import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from '../../../shared/service/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public validateOtpForm: FormGroup;
  public mensaje: any;
  public requireOtp: boolean = false;
  public countries: any;
  public country: any;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
    
    
  }

  owlcarousel = [
    {
      title: "Bienvenido a Rolim",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
    {
      title: "Welcome to Multikart",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
    {
      title: "Welcome to Multikart",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    }
  ]
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true
  };

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      usuario: [''],
      password: [''],
    })
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: [{ value: '', disabled: this.requireOtp }, [Validators.required, Validators.email]],
      nombre: [{ value: '', disabled: this.requireOtp }, Validators.required],
      password: [{ value: '', disabled: this.requireOtp }, Validators.required],
      countrycode: ['', Validators.required],
      tel: [{ value: '', disabled: this.requireOtp }, Validators.required]
    })
  }
  createOtpForm(){
    this.validateOtpForm = this.formBuilder.group({
      otp: ['', Validators.required],
    })
  }


  ngOnInit() {
    this.createLoginForm();
    this.createRegisterForm();
    this.createOtpForm();
    this.countries = [{
      code: "+593",
      name: "Ecuador"
    }]
    this.country = this.countries[0].code;
  }

  login(){ 
    console.log(this.loginForm.value);
    // User data which we have received from the registration form.
    
    this.loginService.login(this.loginForm.value).subscribe((response)=>{
      console.log(response);
      if(response['codigoRetorno']=="0001"){
        localStorage.setItem("token", response['token']);
        localStorage.setItem("user", JSON.stringify(response['usuario']));
        
        this.router.navigate(['']);
        // .then(() => {
        //   window.location.reload();
        // });
      }else if(response['codigoRetorno']=="0003"){
        this.requireOtp=true; 

      }else{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        
      }
      this.mensaje=response['mensajeRetorno'];
      //alert(this.mensaje);
     });
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
        alert('El usuario se ha creado correctamente');  
        this.requireOtp=true;   
      }else if(response['mensajeRetorno']=="usuario ya existe"){
        alert("El usuario ya existe");
      }else{
        alert("El usuario no se pudo registrar");
      }
     });
  }

  validateOtp(){
    //console.log(this.registerForm.value);
    let obj={
      "email": this.loginForm.value.email,
      //"password": this.loginForm.value.password,
      "otp": this.validateOtpForm.value.otp
    }
    console.log(obj);
    this.loginService.validateOtp(obj).subscribe((response)=>{
      console.log(response);
      // usuario activo
      if(response['codigoRetorno']=="0001"){
        alert('El usuario se ha activado correctamente');  
        localStorage.setItem("token", response['token']);
        localStorage.setItem("user", JSON.stringify(response['usuario']));
        
        this.router.navigate([''])
        .then(() => {
          window.location.reload(); 
        }); 
      }else{
        alert("Código incorrecto, el usuario no se pudo activar");
      }
     });
  }

  back(){
    this.router.navigate(['']);
  }

}
