import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {BaseStatusEnum} from "../../../enum/base-status-enum";
import {UserService} from "../service/UserService";
import {UserModel} from "../model/UserModel";
import {Router} from "@angular/router";
import {take} from "rxjs";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Message} from "../../../util/StringUtil";

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
  status: number = -1;
  formSearch!: UntypedFormGroup;
  validateForm!: UntypedFormGroup;
  isVisible = false;

  constructor(private userService: UserService,
              private fb: UntypedFormBuilder,
              private notificationService: NzNotificationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.createFormSearch();
    console.log(this.formSearch)
    this.search();
  }

  onChangePage(page: number) {
    this.offset = page;
    this.search();
  }

  resetForm() {
    this.formSearch.reset();
    this.offset = 1;
    this.searchAccount();
  }


  createFormSearch() {
    this.formSearch = this.fb.group({
      name: [null, [Validators.nullValidator]],
      username: [null, [Validators.nullValidator]],
      phone: [null, [Validators.nullValidator]],
      email: [null, [Validators.nullValidator]],
      address: [null, [Validators.nullValidator]],
      id: [null, [Validators.nullValidator]],
      role: [null, [Validators.nullValidator]],
      status: [null, [Validators.nullValidator]],
      offset: [1, [Validators.nullValidator]],
      limit: [10, [Validators.nullValidator]],
    });
  }

  onChange($event: any, id: number) {
    let s = $event ? BaseStatusEnum.ENABLE.valueOf() : BaseStatusEnum.DISABLE.valueOf()
    this.updateStatus(id, s);
  }

  search() {
    this.searchAccount();
  }

  searchAccount() {
    let filter = this.createFilterAccount();
    this.userService.search(filter)
      .subscribe(res => this.handlerResponseListUser(res))
  }

  handlerResponseListUser(res: any) {
    this.listUser = res?.items
    this.pageSize = res?.totalPages
    this.offset = res?.offset
    this.limit = res?.limit
    this.totalElements = res?.totalElements
  }

  createFilterAccount(): any {
    let filter = {...this.formSearch.value}
    filter.offset = this.offset;
    filter.limit = this.limit;
    return filter;
  }

  clear() {
    this.formSearch.reset();
    this.offset = 1;
    this.limit = 10;
    this.search();
  }

  // getPageUser() {
  //   this.userService.getPage(this.offset, this.limit, this.keyword, this.status).subscribe(res => this.handlerDataResponse(res))
  // }

  updateStatus(id: number, status: number) {
    this.userService.updateStatus(id, status)
      .subscribe(
        res => {
          if (res.status) {
            this.notificationService.success(Message.NOTIFICATION, Message.UPDATE_SUCCESS)
          } else {
            this.notificationService.error(Message.NOTIFICATION, Message.UPDATE_FAIL + " " + res.message)
          }
        },
        (err) => this.notificationService.error(Message.NOTIFICATION, Message.UPDATE_FAIL)
      )
  }
  onEdit(id: number ) {
    this.router.navigate(['user', 'edit', id]).then();
  }

  getDetail(id: string) {
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
