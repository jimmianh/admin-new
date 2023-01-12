import {CampaignStatusEnum} from "../enum/PaymentStatusEnum";

export class SystemUtil {

  static getBaseUrl() {
    return 'http://localhost:8080';
  }

  static getTokenTest() {
    return "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInBob25lIjoiMDk2OTQ1MTY5MSIsInByb2ZpbGVJZCI6MSwiZXhwIjoxNjcyODkxMTk5LCJpYXQiOjE2NzI4MDQ3OTksImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dfQ.PRtrFN4rIQT5WdSCQfz3vkPPWzdKaNdJejMxLbKbgTg";
  }

  static convertEnumToMap(enums: any) {
    let map: PaymentStatus[] = [];
    const keys2 = Object.keys(CampaignStatusEnum).filter((v) => isNaN(Number(v)));
    keys2.forEach((str, index) => {
      let p = new PaymentStatus()
      p.key = index;
      p.value = str;
      map.push(p);
    });
    return map;
  }

  static local: 'http://localhost:8080';
  static prod: 'https://herofund.up.railway.app';
}

export class PaymentStatus {
  key!: number;
  value!: string;
}
