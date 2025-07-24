export interface User {
  id: number;
  firstName: string;
  otherName: string;
  username: string; 
  accountNumber: string;
  role: string;
  status: string;
  sessionStatus: string;
  token: string;
  fullName?: string;
}
