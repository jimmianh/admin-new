import {Component, OnInit} from '@angular/core';
import {CampaignModel} from "../model/CampaignModel";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {CampaignService} from "../service/campaign.service";
import * as moment from "moment/moment";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Message} from "../../../util/StringUtil";
import {CampaignStatusEnum} from "../../../enum/PaymentStatusEnum";
import {PaymentStatus, SystemUtil} from "../../../util/SystemUtil";

@Component({
  selector: 'app-campaign-management-page',
  templateUrl: './campaign-management-page.component.html',
  styleUrls: ['./campaign-management-page.component.scss']
})
export class CampaignManagementPageComponent implements OnInit {
  formSearch!: UntypedFormGroup;
  listCampaign: CampaignModel[] = [];
  offset = 1;
  totalElements!: number;
  limit = 6;
  pageSize!: number;
  campaignStatusEnum!: PaymentStatus[];

  constructor(private fb: UntypedFormBuilder,
              private campaignService: CampaignService,
              private notificationService: NzNotificationService
  ) {
  }

  ngOnInit(): void {
    this.getListCampaign();
    this.createFormSearch();
    this.campaignStatusEnum = SystemUtil.convertEnumToPaymentStatusList(CampaignStatusEnum)
  }

  search() {
    this.searchCampaign();
  }

  searchCampaign() {
    let filter = this.createFilterCampaign();
    this.campaignService.search(filter)
      .subscribe(res => this.handlerResponseListCampaign(res))
  }

  createFilterCampaign(): any {
    let filter = {...this.formSearch.value}
    filter.offset = this.offset;
    filter.limit = this.limit;
    return filter;
  }

  clear() {
    this.formSearch.reset();
    this.offset = 1;
    this.getListCampaign();
  }

  onChange(status: any, id: number) {
    this.updateStatusCampaign(id, status);
  }

  updateStatusCampaign(id: number, status: number) {
    this.campaignService.updateStatus(id, status)
      .subscribe(
        res => {
          if (res.status) {
            this.notificationService.success(Message.NOTIFICATION, Message.UPDATE_SUCCESS)
          } else {
            this.notificationService.success(Message.NOTIFICATION, Message.UPDATE_FAIL)
          }
        },
        () => this.notificationService.success(Message.NOTIFICATION, Message.UPDATE_FAIL)
      )
  }

  onChangePage($event: number) {
    this.offset = $event;
    if (this.checkValueFormSearch()) {
      this.searchCampaign()
      return;
    }
    this.getListCampaign();
  }

  checkValueFormSearch(): boolean {
    if (this.formSearch.value.keyword) return true;
    if (this.formSearch.value.targetAmountEnd) return true;
    if (this.formSearch.value.targetAmountStart) return true;
    if (this.formSearch.value.startDateCreateAt) return true;
    if (this.formSearch.value.endDateCreateAt) return true;
    return false;
  }

  onChangeDate($event: any) {
    let startDate = moment($event[0]).format('DD/MM/YYYY');
    let endDate = moment($event[1]).format('DD/MM/YYYY');
    this.formSearch.controls['startDateCreateAt'].setValue(startDate);
    this.formSearch.controls['endDateCreateAt'].setValue(endDate);
  }


  createFormSearch() {
    this.formSearch = this.fb.group({
      keyword: ["", [Validators.nullValidator]],
      endDateCreateAt: ["", [Validators.nullValidator]],
      startDateCreateAt: ["", [Validators.nullValidator]],
      category: ["", [Validators.nullValidator]],
      status: ["", [Validators.nullValidator]],
      targetAmountStart: ["", [Validators.nullValidator]],
      targetAmountEnd: ["", [Validators.nullValidator]],
      date: [null, [Validators.nullValidator]],
    });
  }

  handlerResponseListCampaign(res: any) {
    this.listCampaign = res?.items
    this.pageSize = res?.totalPages
    this.offset = res?.offset
    this.limit = res?.limit
    this.totalElements = res?.totalElements
  }

  getListCampaign() {
    this.campaignService.getPageCampaign(this.offset, this.limit)
      .subscribe(res => this.handlerResponseListCampaign(res));
  }

  handlerCreatedDate(date: string) {
    return SystemUtil.handlerCreatedDate(date)
  }

}
