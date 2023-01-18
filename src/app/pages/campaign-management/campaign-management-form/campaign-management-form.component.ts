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
import {SponsorModal} from "../../sponsor-management/model/SponsorModal";
import {SponsorService} from "../../sponsor-management/service/SponsorService";
import {ActivatedRoute, Router} from "@angular/router";
import {CampaignModel} from "../model/CampaignModel";


@Component({
  selector: 'app-campaign-management-form',
  templateUrl: './campaign-management-form.component.html',
  styleUrls: ['./campaign-management-form.component.scss']
})
export class CampaignManagementFormComponent implements OnInit {

  validateForm!: UntypedFormGroup;
  id!: any;
  loading = false;
  avatarUrl?: string;
  file?: File;
  dateFormat = 'dd/MM/yyyy';
  listCategory: Categories[] = [];
  listSponsor: SponsorModal[] = [];
  date: Date[] = [];
  campaign?: CampaignModel;

  constructor(
    private categoryService: CategoriesService,
    private sponsorService: SponsorService,
    private fileService: FileService,
    private campaignService: CampaignService,
    private notificationService: NzNotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: UntypedFormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    if (this.id) {
      this.getDetail(this.id);
    }
    this.createForm();
    this.getListActiveCategory();
    this.getSponsorActive();
  }

  uploadImage(info: { file: NzUploadFile }): void {
    this.fileService.upload(info.file!.originFileObj!).subscribe(res => {
      this.avatarUrl = res.data;
      this.validateForm.controls['image'].setValue(res.data);
    })
  }

  getDetail(id: any) {
    this.campaignService.getDetail(id)
      .subscribe(res => {
        res && this.updateFormDetail(res);
        res && (this.campaign = res);
      });
  }

  btnSave() {
    console.log(this.id)
    if (this.validateForm.valid) {
      if (this.id) {
        this.updateCampaign(this.validateForm.value)
      } else {
        this.createCampaign(this.validateForm.value);
      }
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
      sponsorId: [null, [Validators.nullValidator]],
    });
  }

  getListActiveCategory() {
    this.categoryService.getListActiveCategory()
      .subscribe(res => this.listCategory = res)
  }

  getSponsorActive() {
    this.sponsorService.getAllSponsorActive().subscribe(sponsors => sponsors && (this.listSponsor = sponsors))
  }

  createCampaign(request: any) {
    this.campaignService.create(request)
      .subscribe(
        res => {
          if (res.status === true) {
            this.notificationService.success(Message.NOTIFICATION, Message.CREATE_SUCCESS)
            this.router.navigate(['/campaign/list']).then((r) => console.log(r))
          } else {
            this.notificationService.error(Message.NOTIFICATION, Message.CREATE_FAIL)
          }
        },
        () => this.notificationService.error(Message.NOTIFICATION, Message.CREATE_FAIL)
      )
  }

  updateFormDetail(campaign: CampaignModel) {
    this.validateForm.controls['id'].setValue(campaign.id)
    this.validateForm.controls['title'].setValue(campaign.title)
    this.validateForm.controls['startDate'].setValue(campaign.startDate)
    this.validateForm.controls['endDate'].setValue(campaign.endDate)
    this.validateForm.controls['description'].setValue(campaign.description)
    this.validateForm.controls['detail'].setValue(campaign.detail)
    this.validateForm.controls['image'].setValue(campaign.image)
    this.avatarUrl = campaign.image;
    this.date = [new Date(campaign.startDate), new Date(campaign.endDate)];
    this.validateForm.controls['targetAmount'].setValue(campaign.targetAmount)
    this.validateForm.controls['categoryId'].setValue(campaign?.category?.id)
    this.validateForm.controls['sponsorId'].setValue(campaign.sponsor.id)
  }

  updateCampaign(campaign: any) {
    this.campaignService.updateCampaign(campaign)
      .subscribe(
        res => {
          if (res.status === true) {
            this.notificationService.success(Message.NOTIFICATION, Message.UPDATE_SUCCESS)
            this.router.navigate(['/campaign/list']).then((r) => console.log(r))
          } else {
            this.notificationService.error(Message.NOTIFICATION, Message.UPDATE_FAIL)
          }
        },
        () => this.notificationService.error(Message.NOTIFICATION, Message.UPDATE_FAIL)
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
