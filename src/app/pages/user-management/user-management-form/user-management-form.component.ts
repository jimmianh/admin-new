import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FileService} from "../../../service/FileService";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {Message} from "../../../util/StringUtil";
import {UserService} from "../service/UserService";


@Component({
  selector: 'app-user-management-form',
  templateUrl: './user-management-form.component.html',
  styleUrls: ['./user-management-form.component.scss']
})
export class UserManagementFormComponent implements OnInit {

  id!: number;
  validateForm!: UntypedFormGroup;
  loading = false;
  avatarUrl?: string;
  file?: File;

  constructor(private router: ActivatedRoute,
              private userService: UserService,
              private r: Router,
              private fileService: FileService,
              private notification: NzNotificationService,
              private fb: UntypedFormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
    let a = this.router.snapshot.paramMap.get('id');
    if (a) {
      this.id = parseInt(a)
      this.getDetail(this.id)
    }
  }

  getDetail(id: number) {
    this.userService.getDetail(id).subscribe(res => {
      this.validateForm.get('username')!.setValue(res.username)
      this.validateForm.get('role')!.setValue(res.role)
    })
  }

  createForm(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.nullValidator]],
      role: [null, [Validators.required]],
    });
  }



  update(user: any) {
    this.userService.update(user)
      .subscribe(
        () => {
          this.notification.success(Message.NOTIFICATION, Message.UPDATE_SUCCESS)
        },
        (e) => {
          console.log("error: ", e)
          this.notification.error(Message.NOTIFICATION, Message.UPDATE_FAIL);
        }
      )
  }

  btnSave() {
    this.validateForm.controls['image'].setValue(this.avatarUrl);
    if (this.validateForm.valid) {
      if (this.r.url.includes('/user/edit')) {
        this.validateForm.value.id = this.id;
        this.update(this.validateForm.value)
      }

    } else {
      console.log('errr')
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  btnReset() {
    this.validateForm.reset();
  }


}
