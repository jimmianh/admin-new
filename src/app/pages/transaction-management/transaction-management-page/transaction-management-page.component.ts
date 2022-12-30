import {Component, OnInit} from '@angular/core';
import {Transaction} from "../modal/TransactionModel";
import {TransactionService} from "../service/transaction-service.service";

@Component({
  selector: 'app-transaction-management-page',
  templateUrl: 'transaction-management-page.component.html',
  styleUrls: ['transaction-management-page.component.scss']
})
export class TransactionManagementPageComponent implements OnInit{

  constructor(private transactionService: TransactionService) {
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

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
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

  ngOnInit(): void {
    this.getListTransaction();
  }

  getListTransaction(){
    this.transactionService.getPageTransaction(this.offset, this.limit).subscribe(res =>{
      this.listOfData = res?.items
      this.pageSize = res?.totalPages
      this.offset = res?.offset
      this.limit = res?.limit
      this.totalElements = res?.totalElements
    })
  }

  onChangePage(page: number) {
    this.offset = page;
    this.getListTransaction();
  }
}
