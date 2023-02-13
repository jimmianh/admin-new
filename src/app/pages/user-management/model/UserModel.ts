export interface UserModel {
  id : number;
  username: string;
  role: string
  status: number;
  createdAt: string;
  updatedAt: string;
  profile: {
    id: number;
    accountId: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    avatar: string;
    phone: string;
    address: string;
    createdAt: string;
    updatedAt: string;
  }
}
