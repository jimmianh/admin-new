import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../../transaction-management/service/transaction-service.service";
import {CampaignModel, ResponseTransactionCampaign, TransactionDto} from "../model/CampaignModel";
import {ActivatedRoute} from "@angular/router";
import {CampaignService} from "../service/campaign.service";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {SystemUtil} from "../../../util/SystemUtil";

@Component({
  selector: 'app-campaign-transaction-page',
  templateUrl: './campaign-transaction-page.component.html',
  styleUrls: ['./campaign-transaction-page.component.scss']
})
export class CampaignTransactionPageComponent implements OnInit {

  responseTransaction!: ResponseTransactionCampaign;
  offset: number = 1;
  limit: number = 6;
  dateFormat: any;
  id!: any;
  formSearch!: UntypedFormGroup;
  campaign!: CampaignModel;
  listTransaction!: TransactionDto[];

  constructor(
    private transactionService: TransactionService,
    private campaignService: CampaignService,
    private activeRoute: ActivatedRoute,
    private fb: UntypedFormBuilder
  ) {
  }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get('id')
    this.getTransactionByCampaignId(this.id);
    this.getDetail(this.id);
    this.createFormSearch();
  }

  getTransactionByCampaignId(id: any) {
    this.transactionService.getTransactionByCampaignId(id, this.offset, this.limit)
      .subscribe(res => {
        res && (this.responseTransaction = res);
        this.listTransaction = this.responseTransaction.items;
      })
  }
  searchTransaction(){
    let filter = this.createFilter();
    console.log(filter)
    // this.transactionService.search(filter)
    //   .subscribe(res => console.log(res))
  }

  createFilter(): any {
    let filter = {...this.formSearch.value}
    filter.offset = this.offset;
    filter.limit = this.limit;
    return filter;
  }
  getDetail(id: string | null) {
    this.campaignService.getDetail(id)
      .subscribe(res => {
        res && (this.campaign = res);
      })
  }

  onChangePage($event: number) {
    this.offset = $event;
    this.getTransactionByCampaignId(this.id);
  }

  onChange($event: any) {
    this.offset = $event;
    this.searchTransaction();
  }

  btnSearch() {
    this.offset = 1;
    this.searchTransaction()
  }

  resetForm() {
    this.formSearch.reset();
    this.offset = 1;
    this.getTransactionByCampaignId(this.id);
  }

  createFormSearch(){
    this.formSearch = this.fb.group({
      keyword: ["", [Validators.nullValidator]],
      campaignId: ["", [Validators.nullValidator]],
      paymentStatus: ["", [Validators.nullValidator]],
      startAmount: ["", [Validators.nullValidator]],
      endAmount: ["", [Validators.nullValidator]],
      startDateSendingTime: ["", [Validators.nullValidator]],
      endDateSendingTime: ["", [Validators.nullValidator]],
      date: ["", [Validators.nullValidator]],
    });
  }

  handlerCreatedDate(date: string) {
    return SystemUtil.handlerCreatedDate(date)
  }
}
