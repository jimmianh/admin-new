import {Component, OnInit} from '@angular/core';
import { CategoriesService } from '../service/categories.service';
import {take} from "rxjs";
import {PaymentChannel, PaymentChannelRequest} from "../../payment-channel-management/model/PaymentChannel";
import {StringUtil} from "../../../util/StringUtil";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {PaymentChannelService} from "../../payment-channel-management/service/payment-channel.service";
import {BaseStatusEnum} from "../../../enum/base-status-enum";
import {Categories, CategoriesRequest} from "../model/Categories";

@Component({
  selector: 'app-categories-management-page',
  templateUrl: './categories-management-page.component.html',
  styleUrls: ['./categories-management-page.component.scss']
})
export class CategoriesManagementPageComponent implements OnInit{
  searchValue = '';
  listCategories: Categories[] = [];
  stringUtil = StringUtil;
  isVisible = false;
  validateForm!: UntypedFormGroup;
  switchValue = false;
  visible = false;

  constructor(private categoriesService: CategoriesService,
              private fb: UntypedFormBuilder) {
  }

  ngOnInit(): void {
    this.getListCategories();
    this.categoriesService.RefreshData.subscribe(() => {
      this.getListCategories();
    })
    this.validateFormHandler();

  }

  getListCategories(): void {
    this.categoriesService
      .getListCategories()
      .pipe(take(1))
      .subscribe((res) => {
            if(res) {
              this.listCategories = res.items;
            }
      });
  }

  validateFormHandler(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    let id = this.validateForm.value.id;
    console.log("this.validateForm.value:", this.validateForm.value)
    if (this.validateForm.valid) {
      if (id === null) {
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
    this.validateForm.get('name')!.setValue(null)
  }

  createCategories(request: CategoriesRequest) {
    this.categoriesService
      .createCategories(request)
      .pipe(take(1))
      .subscribe((res) => {
        console.log("resss:" + res)
      });
  }

  updateCategories(request: PaymentChannel) {
    this.categoriesService
      .updateCategories(request)
      .pipe(take(1))
      .subscribe((res) => {
        console.log("resss:" + res)
      });
  }

  getDetail(id: number) {
    this.categoriesService.getDetail(id).subscribe(res => {
      this.validateForm.get('name')!.setValue(res.name)
    })
    this.isVisible = true;
  }

  disable(id: number, status: number) {
    this.categoriesService.disableCategories(id, status).subscribe(r => console.log(r))
  }

  onChange(status: any, id: number) {
    let s = status ? BaseStatusEnum.ENABLE.valueOf() : BaseStatusEnum.DISABLE.valueOf()
    this.disable(id, s);
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listCategories = this.listCategories.filter((item: Categories) => item.name.indexOf(this.searchValue) !== -1);
  }

}
