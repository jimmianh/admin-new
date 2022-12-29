import {Component, OnInit} from '@angular/core';
import {PaymentChannel, PaymentChannelRequest} from "../model/PaymentChannel";
import {StringUtil} from "../../../util/StringUtil";
import {PaymentChannelService} from "../service/payment-channel.service";
import {take} from "rxjs";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {BaseStatusEnum} from "../../../enum/base-status-enum";

@Component({
  selector: 'app-payment-channel-management-page',
  templateUrl: './payment-channel-management-page.component.html',
  styleUrls: ['./payment-channel-management-page.component.scss']
})
export class PaymentChannelManagementPageComponent implements OnInit {
  listPaymentChannel: PaymentChannel[] = [];
  stringUtil = StringUtil;
  isVisible = false;
  validateForm!: UntypedFormGroup;
  switchValue = false;


  constructor(private paymentChannelService: PaymentChannelService,
              private fb: UntypedFormBuilder) {
  }

  ngOnInit(): void {
    this.getListPaymentChannel();
    this.paymentChannelService.RefreshData.subscribe(() => {
      this.getListPaymentChannel();
    })
    this.validateFormHandler();

  }

  getListPaymentChannel(): void {
    this.paymentChannelService
      .getListPaymentChannel()
      .pipe(take(1))
      .subscribe((res) => {
        this.listPaymentChannel = res;
        this.listPaymentChannel.map((s) => {
          s.secretId = this.stringUtil.handlerClientAndSecret(s.secretId);
          s.clientId = this.stringUtil.handlerClientAndSecret(s.clientId);
        });
      });
  }

  validateFormHandler(): void {
    this.validateForm = this.fb.group({
      id: [null, [Validators.nullValidator]],
      name: [null, [Validators.required]],
      clientId: [null, [Validators.required]],
      secretId: [null, [Validators.required]],
      payerId: [null, [Validators.required]],
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {

    let id = this.validateForm.value.id;
    console.log("this.validateForm.value:", this.validateForm.value)
    if (this.validateForm.valid) {
      if (id === null) {
        this.createPaymentChannel(this.validateForm.value)
        this.isVisible = false;
        this.resetForm();
        return;
      }
      this.updatePaymentChannel(this.validateForm.value);
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

  resetForm(): void {
    this.validateForm.get('id')!.setValue(null)
    this.validateForm.get('name')!.setValue(null)
    this.validateForm.get('clientId')!.setValue(null)
    this.validateForm.get('secretId')!.setValue(null)
    this.validateForm.get('payerId')!.setValue(null)
  }

  createPaymentChannel(request: PaymentChannelRequest) {
    this.paymentChannelService
      .createPaymentChannel(request)
      .pipe(take(1))
      .subscribe((res) => {
        console.log("resss:" + res)
      });
  }

  updatePaymentChannel(request: PaymentChannel) {
    this.paymentChannelService
      .updatePaymentChannel(request)
      .pipe(take(1))
      .subscribe((res) => {
        console.log("resss:" + res)
      });
  }

  getDetail(id: number) {
    this.paymentChannelService.getDetail(id).subscribe(res => {
      this.validateForm.get('id')!.setValue(res.id)
      this.validateForm.get('name')!.setValue(res.name)
      this.validateForm.get('clientId')!.setValue(res.clientId)
      this.validateForm.get('secretId')!.setValue(res.secretId)
      this.validateForm.get('payerId')!.setValue(res.payerId)
    })
    this.isVisible = true;
  }

  disable(id: number, status: number) {
    this.paymentChannelService.disablePaymentChannel(id, status).subscribe(r => console.log(r))
  }

  onChange(status: any, id: number) {
    let s = status ? BaseStatusEnum.ENABLE.valueOf() : BaseStatusEnum.DISABLE.valueOf()
    this.disable(id, s);
  }
}
