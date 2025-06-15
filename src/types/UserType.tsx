export interface User {
    id: number;
    firstName: string;
    otherName: string;
    fullName?: string;
    role: string;
    token: string;
}