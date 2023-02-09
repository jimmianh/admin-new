import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FileService} from "../../../service/FileService";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {Message} from "../../../util/StringUtil";
import {ArticleService} from "../service/article.service";
import {ArticleModel} from "../model/ArticleModel";
import {CampaignService} from "../../campaign-management/service/campaign.service";

@Component({
  selector: 'app-article-management-form',
  templateUrl: './article-management-form.component.html',
  styleUrls: ['./article-management-form.component.scss']
})
export class ArticleManagementFormComponent implements OnInit {

  id!: any;
  campaignId: any;
  validateForm!: UntypedFormGroup;
  loading = false;
  avatarUrl?: string;
  file?: File;
  article?: ArticleModel;
  pageTitle: string = "Tạo mới bài viết";
  returnTitle: string = "Quay lại trang danh sách chiến dịch";
  returnUrl: string = "/campaign/list";
  nameCampaign!: undefined | string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private articleService: ArticleService,
              private campaignService: CampaignService,
              private r: Router,
              private fileService: FileService,
              private notificationService: NzNotificationService,
              private fb: UntypedFormBuilder) {
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.campaignId = this.activatedRoute.snapshot.paramMap.get('campaignId');
    if (this.campaignId){
      this.getDetailCampaign(this.campaignId)
    }
    if (this.id) {
      this.pageTitle = "Chỉnh sửa bài viết"
      this.returnTitle = "Quay lại trang danh sách bài viết"
      this.returnUrl = "/article/list"
      this.getDetail(this.id);
    }
    this.createForm();
  }

  uploadImage(info: { file: NzUploadFile }): void {
    this.fileService.upload(info.file!.originFileObj!).subscribe(res => {
      this.avatarUrl = res.data;
      this.validateForm.controls['image'].setValue(res.data);
    })
  }

  getDetailCampaign(id: any){
    this.campaignService.getDetail(id).subscribe(res => res && (this.nameCampaign = res.title))
  }
  getDetail(id: any) {
    this.articleService.getDetail(id)
      .subscribe(res => {
        res && this.updateFormDetail(res.data);
        res && (this.article = res.data);
        res && (this.nameCampaign = res.data.campaignTitle)
      });
  }

  updateFormDetail(article: ArticleModel) {
    this.validateForm.controls['id'].setValue(article.id)
    this.validateForm.controls['campaignId'].setValue(article.campaignId)
    this.validateForm.controls['title'].setValue(article.title)
    this.validateForm.controls['description'].setValue(article.description)
    this.validateForm.controls['detail'].setValue(article.detail)
    this.validateForm.controls['image'].setValue(article.image)
    this.avatarUrl = article.image;
    this.campaignId = article.campaignId
  }

  createForm(): void {
    this.validateForm = this.fb.group({
      id: [null, [Validators.nullValidator]],
      title: [null, [Validators.nullValidator]],
      campaignId: [null, [Validators.required]],
      detail: [null, [Validators.required]],
      description: [null, [Validators.required]],
      image: [null, [Validators.required]],
    });
  }

  handleChange(info: { file: NzUploadFile }): void {
    this.fileService.upload(info.file!.originFileObj!).subscribe(res => {
      this.avatarUrl = res.data;
      this.validateForm.value.image = res.data;
    })
  }

  btnSave() {
    if (this.validateForm.valid) {
      if (this.id) {
        this.updateArticle(this.validateForm.value)
      } else {
        this.createArticle(this.validateForm.value);
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

  updateArticle(article: any) {
    this.articleService.updateArticle(article)
      .subscribe(
        res => {
          if (res.status === true) {
            this.notificationService.success(Message.NOTIFICATION, Message.UPDATE_SUCCESS)
            this.router.navigate(['/article/list']).then((r) => console.log(r))
          } else {
            this.notificationService.error(Message.NOTIFICATION, Message.UPDATE_FAIL)
          }
        },
        () => this.notificationService.error(Message.NOTIFICATION, Message.UPDATE_FAIL)
      )
  }

  createArticle(article: any) {
    this.articleService.create(article)
      .subscribe(
        res => {
          if (res.status === true) {
            this.notificationService.success(Message.NOTIFICATION, Message.CREATE_SUCCESS)
            this.router.navigate(['/article/list']).then((r) => console.log(r))
          } else {
            this.notificationService.error(Message.NOTIFICATION, Message.CREATE_FAIL)
          }
        },
        () => this.notificationService.error(Message.NOTIFICATION, Message.CREATE_FAIL)
      )
  }

  btnReset() {
    this.validateForm.reset();
  }
}
