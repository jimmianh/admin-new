import {Component, OnInit} from '@angular/core';
import {StringUtil} from "../../../util/StringUtil";
import {take} from "rxjs";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {BaseStatusEnum} from "../../../enum/base-status-enum";
import {Faq, FaqRequest} from "../model/Faq";
import {FaqService} from "../service/faq.service";
import {UserModel} from "../../user-management/model/UserModel";

@Component({
  selector: 'app-payment-channel-management-page',
  templateUrl: './faq-management-page.component.html',
  styleUrls: ['./faq-management-page.component.scss']
})
export class FaqManagementPageComponent implements OnInit {
  listFaq: Faq[] = [];
  stringUtil = StringUtil;
  isVisible = false;
  validateForm!: UntypedFormGroup;
  switchValue = false;
  listUser: UserModel[] = [];
  pageSize: number = 0;
  totalElements: number = 0;
  offset: number = 1;
  limit: number = 10;


  constructor(private faqService: FaqService,
              private fb: UntypedFormBuilder) {
  }

  ngOnInit(): void {
    this.getlistFaq();
    this.validateFormHandler();

  }

  getlistFaq() {
    this.faqService.getPageFaq(this.offset, this.limit).subscribe(res => this.handlerDataResponse(res))
  }

  handlerDataResponse(res: any) {
    this.listFaq = res?.items
    this.pageSize = res?.totalPages
    this.offset = res?.offset
    this.limit = res?.limit
    this.totalElements = res?.totalElements
  }

  validateFormHandler(): void {
    this.validateForm = this.fb.group({
      campaignId: [null, [Validators.required]],
      detail: [null, [Validators.required]],
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
        this.createFaq(this.validateForm.value)
        this.isVisible = false;
        this.resetForm();
        return;
      }
      this.updateFaq(this.validateForm.value);
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
    this.validateForm.get('campaignId')!.setValue(null)
    this.validateForm.get('detail')!.setValue(null)
  }

  createFaq(request: FaqRequest) {
    this.faqService
      .create(request)
      .pipe(take(1))
      .subscribe((res) => {
        console.log("resss:" + res)
      });
  }

  updateFaq(request: Faq) {
    this.faqService
      .updateFaq(request)
      .pipe(take(1))
      .subscribe((res) => {
        console.log("resss:" + res)
      });
  }

  getDetail(id: number) {
    this.faqService.getDetail(id).subscribe(res => {
      this.validateForm.get('campaignId')!.setValue(res.data.campaignId)
      this.validateForm.get('detail')!.setValue(res.data.detail)
    })
    this.isVisible = true;
  }

  disable(id: number, status: number) {
    this.faqService.updateStatus(id, status).subscribe(r => console.log(r))
  }

  onChange(status: any, id: number) {
    let s = status ? BaseStatusEnum.ENABLE.valueOf() : BaseStatusEnum.DISABLE.valueOf()
    this.disable(id, s);
  }
}
