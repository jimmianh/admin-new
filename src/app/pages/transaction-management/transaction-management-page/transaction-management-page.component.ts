import {Component, OnInit} from '@angular/core';
import {Transaction} from "../modal/TransactionModel";
import {TransactionService} from "../service/transaction-service.service";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import * as moment from 'moment'
import {offset} from "@popperjs/core";
import {SystemUtil} from "../../../util/SystemUtil";

@Component({
  selector: 'app-transaction-management-page',
  templateUrl: 'transaction-management-page.component.html',
  styleUrls: ['transaction-management-page.component.scss']
})
export class TransactionManagementPageComponent implements OnInit {

  constructor(private transactionService: TransactionService, private fb: UntypedFormBuilder) {
  }

  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Transaction[] = [];
  listOfData: readonly Transaction[] = [];
  setOfCheckedId = new Set<number>();
  pageSize: number = 0;
  totalElements: number = 0;
  offset: number = 1;
  limit: number = 6;
  formSearch!: UntypedFormGroup;

  ngOnInit(): void {
    this.getListTransaction();
    // this.transactionService.RefreshData.subscribe(() => {
    //   this.getListTransaction();
    // })
    this.createFormSearch();
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  getStt(stt: number) {
    const ind = (Number(this.offset) * this.limit + stt + 1) - this.limit;
    return ind
  }
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly Transaction[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }


  getListTransaction() {
    this.transactionService.getPageTransaction(this.offset, this.limit)
      .subscribe(res => this.handlerDataResponse(res))
  }

  onChangePage(page: number) {
    this.offset = page;
    if (this.checkValueFormSearch()) {
      this.searchTransaction();
      return;
    }
    this.getListTransaction();
  }

  checkValueFormSearch(): boolean {
    if (this.formSearch.value.keyword) return true;
    if (this.formSearch.value.campaignId) return true;
    if (this.formSearch.value.paymentStatus) return true;
    if (this.formSearch.value.startAmount) return true;
    if (this.formSearch.value.endAmount) return true;
    if (this.formSearch.value.startDateSendingTime) return true;
    if (this.formSearch.value.endDateSendingTime) return true;
    return false;
  }

  resetForm(): void {
    this.formSearch.reset();
    this.offset = 1;
    this.getListTransaction();
  }

  btnSearch() {
    this.offset = 1;
    this.searchTransaction()
  }

  searchTransaction() {
    let filter = this.createFilter();
    this.transactionService.search(filter)
      .subscribe(res => this.handlerDataResponse(res))
  }

  createFilter(): any {
    let filter = {...this.formSearch.value}
    filter.offset = this.offset;
    filter.limit = this.limit;
    return filter;
  }

  handlerDataResponse(res: any) {
    this.listOfData = res?.items
    this.pageSize = res?.totalPages
    this.offset = res?.offset
    this.limit = res?.limit
    this.totalElements = res?.totalElements
  }

  createFormSearch() {
    this.formSearch = this.fb.group({
      keyword: ["", [Validators.nullValidator]],
      campaignId: ["", [Validators.nullValidator]],
      paymentStatus: ["", [Validators.nullValidator]],
      startAmount: ["", [Validators.nullValidator]],
      endAmount: ["", [Validators.nullValidator]],
      status: ["", [Validators.nullValidator]],
      accountId: ["", [Validators.nullValidator]],
      startDateSendingTime: ["", [Validators.nullValidator]],
      endDateSendingTime: ["", [Validators.nullValidator]],
      date: ["", [Validators.nullValidator]],
    });
  }

  onChange($event: any) {
    let startDate = moment($event[0]).format('DD/MM/YYYY');
    let endDate = moment($event[1]).format('DD/MM/YYYY');
    this.formSearch.value.startDateSendingTime = startDate;
    this.formSearch.value.endDateSendingTime = endDate;
  }

  handlerDateTime(date: string) {
    return SystemUtil.handlerDateTime(date)
  }
}
