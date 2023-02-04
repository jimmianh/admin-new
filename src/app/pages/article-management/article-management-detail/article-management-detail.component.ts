import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../service/article.service";
import {ActivatedRoute} from "@angular/router";
import {ArticleModel} from "../model/ArticleModel";
import {SystemUtil} from "../../../util/SystemUtil";
import {CampaignStatusEnum} from "../../../enum/PaymentStatusEnum";

@Component({
  selector: 'app-article-management-detail',
  templateUrl: './article-management-detail.component.html',
  styleUrls: ['./article-management-detail.component.scss']
})
export class ArticleManagementDetailComponent implements OnInit {

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.getDetail(id);
  }

  id!: string | null;
  article!: ArticleModel;
  stringStatus!: string;
  colorStatus!: string;

  getDetail(id: string | null) {
    this.articleService.getDetail(id)
      .subscribe(res => {
        res && (this.article = res.data);
        this.stringStatus = this.article.status == 1? "ENABLE" : "DISABLE";
        this.colorStatus = this.article.status == 1? "#87d068" : "red";
      });
  }

  handlerCreatedDate(date: string) {
    if (date === undefined) return "";
    if (date === null) return "";
    return SystemUtil.handlerDateTime(date)
  }
}
