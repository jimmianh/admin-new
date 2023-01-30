import {Component, OnInit} from '@angular/core';
import {SponsorModal} from "../model/SponsorModal";
import {SponsorService} from "../service/SponsorService";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {BaseStatusEnum} from "../../../enum/base-status-enum";
import {SystemUtil} from "../../../util/SystemUtil";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Message, StringUtil} from "../../../util/StringUtil";

@Component({
  selector: 'app-sponsor-management-page',
  templateUrl: './sponsor-management-page.component.html',
  styleUrls: ['./sponsor-management-page.component.scss']
})
export class SponsorManagementPageComponent implements OnInit {

  listSponsor: SponsorModal[] = [];
  pageSize: number = 0;
  totalElements: number = 0;
  offset: number = 1;
  limit: number = 6;
  keyword = "";
  status!: undefined;
  formSearch!: UntypedFormGroup;

  constructor(private sponsorService: SponsorService,
              private nzNotificationService: NzNotificationService,
              private fb: UntypedFormBuilder) {
  }

  ngOnInit(): void {
    this.getPageSponsor();
    this.createFormSearch();
  }

  handlerDataResponse(res: any) {
    this.listSponsor = res?.items
    this.pageSize = res?.totalPages
    this.offset = res?.offset
    this.limit = res?.limit
    this.totalElements = res?.totalElements
  }

  onChangePage(page: number) {
    this.offset = page;
    this.getPageSponsor();
  }

  resetForm() {
    this.formSearch.reset();
    this.keyword ="";
    this.status = undefined;
    this.getPageSponsor();
  }

  search() {
    this.keyword = this.formSearch.value.keyword ?? "";
    this.status = this.formSearch.value.status;
    this.getPageSponsor();
  }

  createFormSearch() {
    this.formSearch = this.fb.group({
      keyword: [null, [Validators.nullValidator]],
      status: [null, [Validators.nullValidator]],
      offset: [1, [Validators.nullValidator]],
      limit: [10, [Validators.nullValidator]],
    });
  }

  onChange($event: any, id: number) {
    let s = $event ? BaseStatusEnum.ENABLE.valueOf() : BaseStatusEnum.DISABLE.valueOf()
    this.updateStatus(id, s);
  }


  getPageSponsor() {
    this.sponsorService.getPage(this.offset, this.limit, this.keyword, this.status).subscribe(res => this.handlerDataResponse(res))
  }

  updateStatus(id: number, status: number) {
    this.sponsorService.updateStatus(id, status)
      .subscribe(
        e => {
          if (e.status){
            this.nzNotificationService.success("Action", e.message)
          }else {
            this.nzNotificationService.success("Action", e.message)
          }
        },
        () => this.nzNotificationService.success("Action", Message.UPDATE_FAIL)
      )
  }

  handlerDateTime(date: string) {
    return SystemUtil.handlerDateTime(date)
  }
}
