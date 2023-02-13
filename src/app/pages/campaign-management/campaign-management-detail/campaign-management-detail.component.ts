import {Component, OnInit} from '@angular/core';
import {CampaignService} from "../service/campaign.service";
import {ActivatedRoute} from "@angular/router";
import {CampaignModel} from "../model/CampaignModel";
import {CampaignStatusEnum} from "../../../enum/PaymentStatusEnum";
import {SystemUtil} from "../../../util/SystemUtil";

@Component({
  selector: 'app-campaign-management-detail',
  templateUrl: './campaign-management-detail.component.html',
  styleUrls: ['./campaign-management-detail.component.scss']
})
export class CampaignManagementDetailComponent implements OnInit {

  constructor(
    private campaignService: CampaignService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.getDetail(id);
  }

  id!: string | null;
  campaign!: CampaignModel;
  paymentStatus!: string;
  colorStatus!: string;
  colorPortal!: string;


  getDetail(id: string | null) {
    this.campaignService.getDetail(id)
      .subscribe(res => {
        res && (this.campaign = res);
        let map = SystemUtil.convertEnumToMap(CampaignStatusEnum);
        this.paymentStatus = map.get(this.campaign.status);
        this.colorStatus = this.paymentStatus === CampaignStatusEnum[CampaignStatusEnum.ENABLE] ? "#fcb92c" :
          this.paymentStatus === CampaignStatusEnum[CampaignStatusEnum.URGENT] ? "red" :
            CampaignStatusEnum[CampaignStatusEnum.ENABLE] ? `#009624FF` :`purple`;
        this.colorPortal = this.campaign.portal === 'ADMIN' ? "#108ee9" : "magenta"

      })
  }

  handlerCreatedDate(date: string) {
    if (date === undefined) return "";
    if (date === null) return "";
    return SystemUtil.handlerDateTime(date)
  }
}
