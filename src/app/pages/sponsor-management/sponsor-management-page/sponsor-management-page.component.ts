import {Component, OnInit} from '@angular/core';
import {SponsorModal} from "../model/SponsorModal";
import {SponsorService} from "../service/SponsorService";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {BaseStatusEnum} from "../../../enum/base-status-enum";

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
  formSearch!: UntypedFormGroup;

  constructor(private sponsorService: SponsorService, private fb: UntypedFormBuilder) {
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
    this.getPageSponsor();
  }

  search() {

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
    this.sponsorService.getPage(this.offset, this.limit).subscribe(res => this.handlerDataResponse(res))
  }

  updateStatus(id: number, status: number) {
    this.sponsorService.updateStatus(id, status).subscribe(e => console.log(e))
  }
}
