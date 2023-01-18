import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {BaseStatusEnum} from "../../../enum/base-status-enum";
import {FaqModel} from "../model/FaqModel";
import {FaqService} from "../sevice/FaqService";

@Component({
  selector: 'app-faq-management-page',
  templateUrl: './faq-management-page.component.html',
  styleUrls: ['./faq-management-page.component.scss']
})
export class FaqManagementPageComponent implements OnInit{
  listFaq: FaqModel[] = [];
  pageSize: number = 0;
  totalElements: number = 0;
  offset: number = 1;
  limit: number = 6;
  campaign = "";
  faqId!: undefined;
  formSearch!: UntypedFormGroup;

  constructor(private faqService: FaqService, private fb: UntypedFormBuilder) {
  }

  ngOnInit(): void {
    this.getPageFaq();
    this.createFormSearch();
  }

  handlerDataResponse(res: any) {
    this.listFaq = res?.items
    this.pageSize = res?.totalPages
    this.offset = res?.offset
    this.limit = res?.limit
    this.totalElements = res?.totalElements
  }

  onChangePage(page: number) {
    this.offset = page;
    this.getPageFaq();
  }

  resetForm() {
    this.formSearch.reset();
    this.campaign ="";
    this.faqId = undefined;
    this.getPageFaq();
  }

  search() {
    this.campaign = this.formSearch.value.keyword ?? "";
    this.faqId = this.formSearch.value.status;
    this.getPageFaq();
  }

  createFormSearch() {
    this.formSearch = this.fb.group({
      keyword: [null, [Validators.nullValidator]],
      status: [null, [Validators.nullValidator]],
      offset: [1, [Validators.nullValidator]],
      limit: [10, [Validators.nullValidator]],
    });
  }

  onChange($event: any, id: number) {
    let s = $event ? BaseStatusEnum.ENABLE.valueOf() : BaseStatusEnum.DISABLE.valueOf()
    this.updateStatus(id, s);
  }


  getPageFaq() {
    this.faqService.getPage(this.offset, this.limit, this.campaign, this.faqId).subscribe(res => this.handlerDataResponse(res))
  }

  updateStatus(id: number, status: number) {
    this.faqService.updateStatus(id, status).subscribe(e => console.log(e))
  }
}

