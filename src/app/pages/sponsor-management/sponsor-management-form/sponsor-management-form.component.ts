import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SponsorService} from "../service/SponsorService";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {FileService} from "../../../service/FileService";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Message} from "../../../util/StringUtil";

@Component({
  selector: 'app-sponsor-management-form',
  templateUrl: './sponsor-management-form.component.html',
  styleUrls: ['./sponsor-management-form.component.scss']
})
export class SponsorManagementFormComponent implements OnInit {

  id!: number;
  validateForm!: UntypedFormGroup;
  loading = false;
  avatarUrl?: string;
  file?: File;

  constructor(private router: ActivatedRoute,
              private _route: Router,
              private sponsorService: SponsorService,
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
    this.sponsorService.getDetail(id).subscribe(res => {
      this.validateForm.get('id')!.setValue(res.id)
      this.validateForm.get('name')!.setValue(res.name)
      this.validateForm.get('image')!.setValue(res.image)
      this.avatarUrl = res.image;
      this.validateForm.get('description')!.setValue(res.description)
      this.validateForm.get('detail')!.setValue(res.detail)
    })
  }

  createForm(): void {
    this.validateForm = this.fb.group({
      id: [null, [Validators.nullValidator]],
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      detail: [null, [Validators.required]],
      image: [null, [Validators.required]],
    });
  }

  handleChange(info: { file: NzUploadFile }): void {
    this.fileService.upload(info.file!.originFileObj!).subscribe(res => {
      this.avatarUrl = res.data;
      this.validateForm.value.image = res.data;
    })
  }

  create(sponsor: any) {
    this.sponsorService.create(sponsor)
      .subscribe(
        () => {
          this.notification.success(Message.NOTIFICATION, Message.CREATE_SUCCESS)
          this._route.navigate(['/sponsor/list'])
        },
        (e) => {
          console.log("error: ", e)
          this.notification.error(Message.NOTIFICATION, Message.CREATE_FAIL);
        }
      )
  }

  update(sponsor: any) {
    this.sponsorService.update(sponsor)
      .subscribe(
        () => {
          this.notification.success(Message.NOTIFICATION, Message.UPDATE_SUCCESS)
          this._route.navigate(['/sponsor/list'])
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
      if (this.r.url.includes('/sponsor/edit')) {
        this.validateForm.value.id = this.id;
        this.update(this.validateForm.value)
      }
      if (this.r.url.includes('/sponsor/form')) {
        this.create(this.validateForm.value);
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
