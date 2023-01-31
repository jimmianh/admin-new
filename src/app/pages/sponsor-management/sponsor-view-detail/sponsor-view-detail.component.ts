import { Component, OnInit } from '@angular/core';
import {SponsorService} from "../service/SponsorService";
import data from "../../user-management/user-management-page/data";
import {CampaignService} from "../../campaign-management/service/campaign.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sponsor-view-detail',
  templateUrl: './sponsor-view-detail.component.html',
  styleUrls: ['./sponsor-view-detail.component.scss']
})
export class SponsorViewDetailComponent implements OnInit {

  data: any
  id : number | undefined;

  constructor(
    private route: ActivatedRoute,
    private sponsorService: SponsorService,
  ) { }

  getDetail(id: number) {
    this.sponsorService.getDetail(id).subscribe(res => {
      if(res){
        this.data = res
        console.log(this.data)
      }
    })
  }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.getDetail(id);
  }
}
