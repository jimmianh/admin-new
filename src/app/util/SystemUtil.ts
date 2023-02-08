import {AmountByMonth} from "../pages/dashboard/model/Dashboard";

export class SystemUtil {

  static getBaseUrl() {
    return 'http://localhost:8080';
  }

  static local: 'http://localhost:8080';
  static prod: 'https://herofund.up.railway.app';

  static convertEnumToPaymentStatusList(enums: any) {
    let map: PaymentStatus[] = [];
    const keys2 = Object.keys(enums).filter((v) => isNaN(Number(v)));
    keys2.forEach((str, index) => {
      let p = new PaymentStatus()
      p.key = index;
      p.value = str;
      map.push(p);
    });
    return map;
  }

  static convertEnumToMap(enums: any) {
    let map = new Map();
    const keys2 = Object.keys(enums).filter((v) => isNaN(Number(v)));
    keys2.forEach((str, index) => {
      map.set(index, str);
    });
    return map;
  }


  static handlerDateTime(date: string) {
    if (date === null) return null;
    let str = new Date(date)
    let day = str.getDate() < 10 ? `0${str.getDate()}` : str.getDate()
    let month = str.getMonth() < 10 ? `0${str.getMonth() + 1}` : str.getMonth()
    let hours = str.getHours() < 10 ? `0${str.getHours()}` : str.getHours()
    let minutes = str.getMinutes() < 10 ? `0${str.getMinutes()}` : str.getMinutes()
    return `${day}-${month}-${str.getFullYear()}`
  }

  static getAmountFromAmountByMonth(amountByMonth: Array<AmountByMonth>) {
    let map = new Map();
    let now = new Date();
    let monthArr = [];
    let amountArr = [];
    for (let i = 1; i <= now.getMonth() + 1; i++) {
      monthArr.push(`T${i}`);
      if (amountByMonth.length > 0){
        for (let j = 0; j < amountByMonth.length; j++) {
          if (amountByMonth[j].month === i) {
            map.set(i, amountByMonth[j].amount)
            amountArr.push(amountByMonth[j].amount)
            break;
          }
          map.set(i, 0);
        }
      }
    }
    map.set("month", monthArr)
    map.set("amount", amountArr)
    return map;
  }

}

export class PaymentStatus {
  key!: number;
  value!: string;
}
