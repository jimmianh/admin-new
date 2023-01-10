import {Component, OnInit} from '@angular/core';
import {SponsorModal} from "../../sponsor-management/model/SponsorModal";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {BaseStatusEnum} from "../../../enum/base-status-enum";
import {UserService} from "../service/UserService";
import {UserModel} from "../model/UserModel";

interface DataItem {
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-user-management-page',
  templateUrl: './user-management-page.component.html',
  styleUrls: ['./user-management-page.component.scss']
})
export class UserManagementPageComponent implements OnInit{
  listUser: UserModel[] = [];
  pageSize: number = 0;
  totalElements: number = 0;
  offset: number = 1;
  limit: number = 6;
  keyword = "";
  status!: undefined;
  formSearch!: UntypedFormGroup;

  constructor(private userService: UserService, private fb: UntypedFormBuilder) {
  }

  ngOnInit(): void {
    this.getPageUser();
    this.createFormSearch();
  }

  handlerDataResponse(res: any) {
    this.listUser = res?.items
    this.pageSize = res?.totalPages
    this.offset = res?.offset
    this.limit = res?.limit
    this.totalElements = res?.totalElements
  }

  onChangePage(page: number) {
    this.offset = page;
    this.getPageUser();
  }

  resetForm() {
    this.formSearch.reset();
    this.keyword ="";
    this.status = undefined;
    this.getPageUser();
  }

  search() {
    this.keyword = this.formSearch.value.keyword ?? "";
    this.status = this.formSearch.value.status;
    this.getPageUser();
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


  getPageUser() {
    this.userService.getPage(this.offset, this.limit, this.keyword, this.status).subscribe(res => this.handlerDataResponse(res))
  }

  updateStatus(id: number, status: number) {
    this.userService.updateStatus(id, status).subscribe(e => console.log(e))
  }
}
