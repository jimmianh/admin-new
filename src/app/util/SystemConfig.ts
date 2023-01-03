export class SystemConfig {

  static getBaseUrl() {
    return 'https://herofund.up.railway.app';
  }

  static getTokenTest() {
    return "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY3NTMwNjQ0OCwiaWF0IjoxNjcyNzE0NDQ4LCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XX0.qqHwqEdiKfmSKj7ExBnjFN60T0iWtucG_gYqlNYtE4Q";
  }

  static local: 'http://localhost:8080';
  static prod: 'https://herofund.up.railway.app';
}
