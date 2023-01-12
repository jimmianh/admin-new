import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {take} from "rxjs";
import {Router} from "@angular/router";
import {LoginService} from "../app/pages/login/login.service";

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss']
})
export class LoginLayoutComponent implements OnInit {

  // @ts-ignore
  validateForm : FormGroup;

  async submitForm(): Promise<void> {
    const payLoad = {
      username: this.validateForm.get('userName')?.value,
      password: this.validateForm.get('password')?.value
    }
    console.log('ádd', payLoad)
    const res = await this.loginService.postLogin(payLoad).pipe(take(1))
      .subscribe((res) => {
        localStorage.setItem('access_token', res.accessToken)
        console.log('res', res)
        if(res.accessToken) {
          this.router.navigate(['/dashboard']);
          // window.location.reload()
        }
        if (res.status === false){
          alert(res.error.message)
        }
      });
  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private loginService: LoginService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
