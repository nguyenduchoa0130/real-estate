export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  address: string;
  phoneNumber: string;
  role: string;
  salary: number;
  branchId: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}
