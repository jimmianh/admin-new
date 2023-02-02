import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {take} from "rxjs";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss']
})
export class LoginLayoutComponent implements OnInit {

  // @ts-ignore
  validateForm: FormGroup;

   submitForm() {
    if(this.validateForm.invalid){
      this.nzNotificationService.error("Error", "Vui lòng kiểm tra lại thông tin đăng nhập");
      return ;
    }
    const payLoad = {
      username: this.validateForm.get('userName')?.value,
      password: this.validateForm.get('password')?.value
    }
     this.loginService.postLogin(payLoad)
      .subscribe((res) => {
          if (res.accessToken) {
            localStorage.setItem('access_token', res.accessToken)
            this.router.navigate(['/dashboard']);
            // window.location.reload()
          } else {
            this.nzNotificationService.error("Error", "Vui lòng kiểm tra lại thông tin đăng nhập")
          }
        },
        () => this.nzNotificationService.error("Error", "Vui lòng kiểm tra lại thông tin đăng nhập")
      );
  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private nzNotificationService: NzNotificationService,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
