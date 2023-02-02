import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SponsorService} from "../../sponsor-management/service/SponsorService";
import {FileService} from "../../../service/FileService";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {Message} from "../../../util/StringUtil";
import {ArticleService} from "../service/article.service";

@Component({
  selector: 'app-article-management-form',
  templateUrl: './article-management-form.component.html',
  styleUrls: ['./article-management-form.component.scss']
})
export class ArticleManagementFormComponent implements OnInit {

  id!: number;
  validateForm!: UntypedFormGroup;
  loading = false;
  avatarUrl?: string;
  file?: File;

  constructor(private router: ActivatedRoute,
              private _route: Router,
              private articleService: ArticleService,
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
    }
  }

  createForm(): void {
    this.validateForm = this.fb.group({
      id: [null, [Validators.nullValidator]],
      name: [null, [Validators.required]],
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

  create(article: any) {
    this.articleService.create(article)
      .subscribe(
        () => {
          this.notification.success(Message.NOTIFICATION, Message.CREATE_SUCCESS)
          this._route.navigate(['/article/list'])
        },
        (e) => {
          console.log("error: ", e)
          this.notification.error(Message.NOTIFICATION, Message.CREATE_FAIL);
        }
      )
  }


  btnSave() {
    this.validateForm.controls['image'].setValue(this.avatarUrl);
    if (this.validateForm.valid) {
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
