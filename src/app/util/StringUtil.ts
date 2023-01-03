export class StringUtil {
  constructor() {}

  static handlerClientAndSecret(s: string) {
    if (s.length > 10) return s.slice(0, 10) + '****';
    return s;
  }
}

export class Message {
  public static CREATE_SUCCESS = 'Tạo mới thành công!'
  public static UPDATE_SUCCESS = 'Cập nhật thành công!'
  public static CREATE_FAIL = 'Tạo mới thất bại!'
  public static UPDATE_FAIL = 'Cập nhật thất bại!'
  public static NOTIFICATION = 'Notification'
}
