import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../service/categories.service';
import {Message} from "../../../util/StringUtil";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {BaseStatusEnum} from "../../../enum/base-status-enum";
import {Categories, CategoriesRequest} from "../model/Categories";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {FileService} from "../../../service/FileService";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-categories-management-page',
  templateUrl: './categories-management-page.component.html',
  styleUrls: ['./categories-management-page.component.scss']
})
export class CategoriesManagementPageComponent implements OnInit {
  listCategories: Categories[] = [];
  isVisible = false;
  validateForm!: UntypedFormGroup;
  switchValue = false;
  visible = false;
  totalElements: any;
  offset: number = 1;
  limit: number = 6;
  pageSize!: number;
  avatarUrl: any;
  loading = false;
  formSearch!: UntypedFormGroup;
  keyword = "";
  status!: undefined;

  constructor(private categoriesService: CategoriesService,
              private fileService: FileService,
              private notification: NzNotificationService,
              private fb: UntypedFormBuilder) {
  }

  ngOnInit(): void {
    this.getListCategories();
    this.categoriesService.RefreshData.subscribe(() => {
      this.getListCategories();
    })
    this.validateFormHandler();
    this.createFormSearch();

  }

  getListCategories(): void {
    this.categoriesService
      .getListCategories(this.offset, this.limit, this.keyword, this.status)
      .subscribe(
        res => this.handlerDataResponse(res),
        e => console.log(e)
      );
  }

  validateFormHandler(): void {
    this.validateForm = this.fb.group({
      id: [null, [Validators.nullValidator]],
      name: [null, [Validators.required]],
      image: [null, [Validators.required]],
    });
  }

  showModal(): void {
    this.resetForm();
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      if (this.validateForm.value.id === null) {
        this.createCategories(this.validateForm.value)
        this.isVisible = false;
        this.resetForm();
        return;
      }
      this.updateCategories(this.validateForm.value);
      this.isVisible = false;
      this.resetForm();

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  handleCancel(): void {
    this.resetForm();
    this.isVisible = false;
  }

  resetForm(): void {
    this.validateForm.reset();
    this.avatarUrl = "";
  }

  createCategories(request: CategoriesRequest) {
    this.categoriesService
      .createCategories(request)
      .subscribe(res => {
          if (res.status) {
            this.notification.success(Message.NOTIFICATION, Message.CREATE_SUCCESS)
          } else {
            this.notification.error(Message.NOTIFICATION, Message.CREATE_FAIL)
          }
        },
        () => this.notification.error(Message.NOTIFICATION, Message.CREATE_FAIL)
      );
  }

  updateCategories(request: CategoriesRequest) {
    this.categoriesService
      .updateCategories(request)
      .subscribe(
        (res) => {
          if (res.status) {
            this.notification.success(Message.NOTIFICATION, Message.UPDATE_SUCCESS)
          } else {
            this.notification.error(Message.NOTIFICATION, Message.UPDATE_FAIL)
          }
        },
        () => this.notification.error(Message.NOTIFICATION, Message.UPDATE_FAIL)
      );
  }

  getDetail(id: number) {
    this.categoriesService.getDetail(id).subscribe(res => {
      this.validateForm.get('id')!.setValue(res.id);
      this.validateForm.get('name')!.setValue(res.name);
      this.validateForm.get('image')!.setValue(res.image);
      this.avatarUrl = res.image;
    })
    this.isVisible = true;
  }

  disable(id: number, status: number) {
    this.categoriesService.disableCategories(id, status).subscribe(r => console.log(r))
  }

  search(): void {
    this.keyword = this.formSearch.value.keyword ?? "";
    this.status = this.formSearch.value.status ?? null;
    this.getListCategories();
  }

  handlerDataResponse(res: any) {
    this.listCategories = res?.items
    this.pageSize = res?.totalPages
    this.offset = res?.offset
    this.limit = res?.limit
    this.totalElements = res?.totalElements
  }

  onChangePage(page: number) {
    this.offset = page;
    this.getListCategories()
  }

  onChange(status: any, id: number) {
    console.log(status, id)
    let s = status ? BaseStatusEnum.ENABLE.valueOf() : BaseStatusEnum.DISABLE.valueOf()
    this.disable(id, s);
  }

  createFormSearch() {
    this.formSearch = this.fb.group({
      keyword: [null, [Validators.nullValidator]],
      status: [null, [Validators.nullValidator]],
    });
  }

  handleChange(info: { file: NzUploadFile }): void {
    this.fileService.upload(info.file!.originFileObj!).subscribe(res => {
      this.avatarUrl = res.data;
      this.validateForm.controls['image'].setValue(res.data);
    })
  }
}
