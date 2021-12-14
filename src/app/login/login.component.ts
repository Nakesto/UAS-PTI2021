import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: string = "vincent";
  password: string = "vincent123";
  title = 'angular-form';
  dataForm: FormGroup;
  constructor(private formBuilder: FormBuilder, public router: Router) {
    this.dataForm = this.formBuilder.group({
      email: formBuilder.control('', [Validators.required]),
      password: formBuilder.control('', [Validators.required])
    });
  }

  public control(name: string) {
    return this.dataForm.get(name);
  }

  ngOnInit(): void {

  }

  login() {
    const email = this.control('email').value;
    const pass = this.control('password').value;
    if (email === this.user && pass === this.password) {
      this.router.navigate(['admin']);
      localStorage.setItem('role', 'admin');
    } else {
      this.router.navigate(['']);
    }
  }
}
