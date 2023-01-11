import {Component, OnInit} from '@angular/core';
import {SponsorModal} from "../../sponsor-management/model/SponsorModal";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {BaseStatusEnum} from "../../../enum/base-status-enum";
import {UserService} from "../service/UserService";
import {UserModel} from "../model/UserModel";
import {Router} from "@angular/router";
import data from "./data";
import {PaymentChannel} from "../../payment-channel-management/model/PaymentChannel";
import {take} from "rxjs";

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
  validateForm!: UntypedFormGroup;
  isVisible = false;

  constructor(private userService: UserService, private fb: UntypedFormBuilder, private router: Router) {
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
  onEdit(id: number ) {
    this.router.navigate(['user', 'edit', id]).then();
  }

  getDetail(id: number) {
    this.userService.getDetail(id).subscribe(res => {
      this.validateForm.get('username')!.setValue(res.username)
      this.validateForm.get('role')!.setValue(res.role)
    })
    this.isVisible = true;
  }

  updateUser(request: UserModel) {
    this.userService
      .update(request)
      .pipe(take(1))
      .subscribe((res) => {
        console.log("resss:" + res)
      });
  }

  handleOk(): void {
    console.log("this.validateForm.value:", this.validateForm.value)
    if (this.validateForm.valid) {
      this.updateUser(this.validateForm.value);
      this.isVisible = false;
      this.resetForm();

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  handleCancel(): void {
    this.resetForm();
    this.isVisible = false;
  }
}
