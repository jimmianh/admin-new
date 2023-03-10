import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FileService} from "../../../service/FileService";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {Message} from "../../../util/StringUtil";
import {FaqService} from "../sevice/FaqService";

@Component({
  selector: 'app-faq-management-form',
  templateUrl: './faq-management-form.component.html',
  styleUrls: ['./faq-management-form.component.scss']
})
export class FaqManagementFormComponent implements OnInit {

  id!: number;
  validateForm!: UntypedFormGroup;
  loading = false;
  avatarUrl?: string;
  file?: File;
  isUpdate = false;

  constructor(private router: ActivatedRoute,
              private faqService: FaqService,
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
    this.faqService.getDetail(id).subscribe(res => {
      this.validateForm.get('id')!.setValue(res.id)
      this.validateForm.get('campaignId')!.setValue(res.campaignId)
      this.validateForm.get('detail')!.setValue(res.detail)
    })
  }

  createForm(): void {
    this.validateForm = this.fb.group({
      id: [null, [Validators.nullValidator]],
      campaignId: [null, [Validators.required]],
      detail: [null, [Validators.required]],
    });
  }

  handleChange(info: { file: NzUploadFile }): void {
    this.fileService.upload(info.file!.originFileObj!).subscribe(res => {
      this.avatarUrl = res.data;
      this.validateForm.value.image = res.data;
    })
  }

  create(sponsor: any) {
    this.faqService.create(sponsor)
      .subscribe(
        () => {
          this.notification.success(Message.NOTIFICATION, Message.CREATE_SUCCESS)
        },
        (e) => {
          console.log("error: ", e)
          this.notification.error(Message.NOTIFICATION, Message.CREATE_FAIL);
        }
      )
  }

  update(sponsor: any) {
    this.faqService.update(sponsor)
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
      if (this.r.url.includes('/faq/edit')) {
        this.validateForm.value.id = this.id;
        this.update(this.validateForm.value)
      }
      if (this.r.url.includes('/faq/form')) {
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
