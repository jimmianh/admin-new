import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../categories-management/service/categories.service";
import {Categories} from "../../categories-management/model/Categories";
import * as moment from "moment/moment";
import {CampaignService} from "../service/campaign.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Message} from "../../../util/StringUtil";
import {FileService} from "../../../service/FileService";
import {NzUploadFile} from "ng-zorro-antd/upload";


@Component({
  selector: 'app-campaign-management-form',
  templateUrl: './campaign-management-form.component.html',
  styleUrls: ['./campaign-management-form.component.scss']
})
export class CampaignManagementFormComponent implements OnInit {

  validateForm!: UntypedFormGroup;
  id!: number;
  loading = false;
  avatarUrl?: string;
  file?: File;
  dateFormat = 'dd/MM/yyyy';
  listCategory: Categories[] = [];
  date = null;

  constructor(
    private categoryService: CategoriesService,
    private fileService: FileService,
    private campaignService: CampaignService,
    private notificationService: NzNotificationService,
    private fb: UntypedFormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.getListActiveCategory();
  }

  uploadImage(info: { file: NzUploadFile }): void {
    this.fileService.upload(info.file!.originFileObj!).subscribe(res => {
      this.avatarUrl = res.data;
      this.validateForm.controls['image'].setValue(res.data);
    })
  }

  btnSave() {
    if (this.validateForm.valid) {
      this.createCampaign(this.validateForm.value);
    } else {
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

  createForm(): void {
    this.validateForm = this.fb.group({
      id: [null, [Validators.nullValidator]],
      title: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      description: [null, [Validators.required]],
      detail: [null, [Validators.required]],
      image: [null, [Validators.required]],
      targetAmount: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });
  }

  getListActiveCategory() {
    this.categoryService.getListActiveCategory()
      .subscribe(res => this.listCategory = res)
  }

  createCampaign(request: any) {
    this.campaignService.create(request)
      .subscribe(
        res => {
          if (res.status === true) {
            this.notificationService.success(Message.NOTIFICATION, Message.CREATE_SUCCESS)
          } else {
            this.notificationService.error(Message.NOTIFICATION, Message.CREATE_FAIL)
          }
        },
        () => this.notificationService.error(Message.NOTIFICATION, Message.CREATE_FAIL)
      )
  }

  onChangeDate(result: any) {
    let startDate = null;
    let endDate = null;
    if (result.length > 0) {
      startDate = moment(result[0]).format('DD/MM/YYYY');
      endDate = moment(result[1]).format('DD/MM/YYYY');
    }
    this.validateForm.controls['startDate'].setValue(startDate);
    this.validateForm.controls['endDate'].setValue(endDate);
  }
}
