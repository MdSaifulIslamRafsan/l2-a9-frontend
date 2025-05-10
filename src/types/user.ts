export interface IUser {
  userId: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  photo?: string;
  iat?: number;
  exp?: number;
}
