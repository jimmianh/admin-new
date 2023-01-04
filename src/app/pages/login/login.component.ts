import { Component, OnInit } from '@angular/core';
import {LoginService} from "./login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {take} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
