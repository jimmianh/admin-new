export class StringUtil {
  constructor() {}

  static handlerClientAndSecret(s: string) {
    if (s.length > 10) return s.slice(0, 10) + '****';
    return s;
  }
}
