export interface User {
  email: string;
  name: string;
  createdAt: Date;
}

export interface IRespSignIn {
  message: string;
  tokenJwt: string;
  user: User;
}
