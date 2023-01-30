import {Component, OnInit} from '@angular/core';
import {ArticleModel} from "../model/ArticleModel";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ArticleService} from "../service/article.service";
import * as moment from "moment/moment";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Message} from "../../../util/StringUtil";
import {SystemUtil} from "../../../util/SystemUtil";

@Component({
  selector: 'app-article-management-page',
  templateUrl: './article-management-page.component.html',
  styleUrls: ['./article-management-page.component.scss']
})
export class ArticleManagementPageComponent implements OnInit {
  formSearch!: UntypedFormGroup;
  listArticle: ArticleModel[] = [];
  offset = 1;
  totalElements!: number;
  limit = 6;
  pageSize!: number;

  constructor(private fb: UntypedFormBuilder,
              private articleService: ArticleService,
              private notificationService: NzNotificationService
  ) {
  }

  ngOnInit(): void {
    this.getListArticle();
    this.createFormSearch();
  }

  search() {
    this.searchArticle();
  }

  searchArticle() {
    let filter = this.createFilterArticle();
    this.articleService.search(filter)
      .subscribe(res => this.handlerResponseListCampaign(res))
  }

  createFilterArticle(): any {
    let filter = {...this.formSearch.value}
    filter.offset = this.offset;
    filter.limit = this.limit;
    return filter;
  }

  clear() {
    this.formSearch.reset();
    this.offset = 1;
    this.getListArticle();
  }

  onChange($event: any, id: number) {
    let status = $event ? 1 : 0;
    this.updateStatusArticle(id, status);
  }

  updateStatusArticle(id: number, status: number) {
    this.articleService.updateStatus(id, status)
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
      this.searchArticle()
      return;
    }
    this.getListArticle();
  }

  checkValueFormSearch(): boolean {
    if (this.formSearch.value.keyword) return true;
    if (this.formSearch.value.id) return true;
    if (this.formSearch.value.campaignId) return true;
    if (this.formSearch.value.campaignTitle) return true;
    if (this.formSearch.value.status) return true;
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
      id: ["", [Validators.nullValidator]],
      campaignId: ["", [Validators.nullValidator]],
      campaignTitle: ["", [Validators.nullValidator]],
      endDateCreateAt: ["", [Validators.nullValidator]],
      startDateCreateAt: ["", [Validators.nullValidator]],
      category: ["", [Validators.nullValidator]],
      status: ["", [Validators.nullValidator]],
      date: [null, [Validators.nullValidator]],
    });
  }

  handlerResponseListCampaign(res: any) {
    this.listArticle = res?.items
    this.pageSize = res?.totalPages
    this.offset = res?.offset
    this.limit = res?.limit
    this.totalElements = res?.totalElements
  }

  getListArticle() {
    this.articleService.getPageArticle(this.offset, this.limit)
      .subscribe(res => this.handlerResponseListCampaign(res));
  }
  handlerDateTime(date: string) {
    return SystemUtil.handlerDateTime(date)
  }

}
