import { Component } from '@angular/core';
import {PaymentChannel} from "../model/PaymentChannel";
import {StringUtil} from "../../../util/StringUtil";
import {PaymentChannelService} from "../service/payment-channel.service";
import {take} from "rxjs";

@Component({
  selector: 'app-payment-channel-management-page',
  templateUrl: './payment-channel-management-page.component.html',
  styleUrls: ['./payment-channel-management-page.component.scss']
})
export class PaymentChannelManagementPageComponent {
  listPaymentChannel: PaymentChannel[] = [];
  stringUtil = StringUtil;

  constructor(private paymentChannelService: PaymentChannelService) {}

  ngOnInit(): void {
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
}
