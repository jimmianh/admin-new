import {Component} from '@angular/core';
import {CommentModel} from "../model/CommentModel";
import {Message} from "../../../util/StringUtil";
import {CommentService} from "../service/comment.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-comment-management-detail',
  templateUrl: './comment-management-detail.component.html',
  styleUrls: ['./comment-management-detail.component.scss']
})
export class CommentManagementDetailComponent{
  isVisible = false;
  currentComment!: CommentModel;

  constructor(private commentService: CommentService,
              private notificationService: NzNotificationService,) {
  }

  open(data: CommentModel) {
    this.currentComment = data;
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
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
}
