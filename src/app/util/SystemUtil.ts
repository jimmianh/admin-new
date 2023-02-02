export class SystemUtil {

  static getBaseUrl() {
    return 'https://herofund.up.railway.app';
  }

  static getTokenTest() {
    return "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInBob25lIjoiMDk2OTQ1MTY5MSIsInByb2ZpbGVJZCI6MSwiZXhwIjoxNjcyODkxMTk5LCJpYXQiOjE2NzI4MDQ3OTksImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dfQ.PRtrFN4rIQT5WdSCQfz3vkPPWzdKaNdJejMxLbKbgTg";
  }

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

  static convertEnumToMap(enums: any){
    let map = new Map();
    const keys2 = Object.keys(enums).filter((v) => isNaN(Number(v)));
    keys2.forEach((str, index) => {
      map.set(index,str);
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

  static local: 'http://localhost:8080';
  static prod: 'https://herofund.up.railway.app';
}

export class PaymentStatus {
  key!: number;
  value!: string;
}
