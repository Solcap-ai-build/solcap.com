
export type UserRole = "admin" | "technician" | "user";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  emailVerified: boolean;
}
