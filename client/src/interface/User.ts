export interface User {
  _id: string;
  username: string;
  name: string;
  lastname: string;
  accountId: string;
  balance: number;
}

export interface Error {
  error: string
}