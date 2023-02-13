import {Component, OnInit, ViewChild} from '@angular/core';
import {CommentModel} from "../model/CommentModel";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {CommentService} from "../service/comment.service";
import * as moment from "moment/moment";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Message} from "../../../util/StringUtil";
import {CommentManagementDetailComponent} from "../comment-management-detail/comment-management-detail.component";
import {ActivatedRoute} from "@angular/router";
import {SystemUtil} from "../../../util/SystemUtil";

@Component({
  selector: 'app-comment-management-page',
  templateUrl: './comment-management-page.component.html',
  styleUrls: ['./comment-management-page.component.scss']
})

export class CommentManagementPageComponent implements OnInit {
  formSearch!: UntypedFormGroup;
  listComment: CommentModel[] = [];
  offset = 1;
  totalElements!: number;
  limit = 6;
  pageSize!: number;
  isVisible = false;
  articleId: any

  @ViewChild('myModal') modal!: CommentManagementDetailComponent;

  constructor(private fb: UntypedFormBuilder,
              private commentService: CommentService,
              private notificationService: NzNotificationService,
              private route: ActivatedRoute
  ) {
  }

  showModal(data: CommentModel): void {
    this.modal.open(data);
  }

  ngOnInit(): void {
    this.createFormSearch();
    this.articleId = this.route.snapshot.queryParamMap.get('article_id');
    if (this.articleId){
      this.formSearch.value.articleId = this.articleId;
      this.search();
    }else {
      this.getListComment();
    }
  }

  search() {
    this.searchComment();
  }

  searchComment() {
    let filter = this.createFilterComment();
    this.commentService.search(filter)
      .subscribe(res => this.handlerResponseListComment(res))
  }

  createFilterComment(): any {
    let filter = {...this.formSearch.value}
    filter.offset = this.offset;
    filter.limit = this.limit;
    return filter;
  }

  clear() {
    this.formSearch.reset();
    this.offset = 1;
    this.getListComment();
  }

  onChange($event: any, id: number) {
    let status = $event ? 1 : 0;
    this.updateStatusComment(id, status);
  }

  updateStatusComment(id: number, status: number) {
    this.commentService.updateStatus(id, status)
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
      this.searchComment()
      return;
    }
    this.getListComment();
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
      content: ["", [Validators.nullValidator]],
      id: ["", [Validators.nullValidator]],
      articleId: ["", [Validators.nullValidator]],
      articleTitle: ["", [Validators.nullValidator]],
      endDateCreateAt: ["", [Validators.nullValidator]],
      startDateCreateAt: ["", [Validators.nullValidator]],
      accountId: ["", [Validators.nullValidator]],
      username: ["", [Validators.nullValidator]],
      status: ["", [Validators.nullValidator]],
    });
  }

  handlerResponseListComment(res: any) {
    this.listComment = res?.items
    this.pageSize = res?.totalPages
    this.offset = res?.offset
    this.limit = res?.limit
    this.totalElements = res?.totalElements
  }

  getListComment() {
    this.commentService.getPageComment(this.offset, this.limit)
      .subscribe(res => this.handlerResponseListComment(res));
  }

  handlerCreatedDate(d: string){
    return SystemUtil.handlerDateTime(d);
  }
}
