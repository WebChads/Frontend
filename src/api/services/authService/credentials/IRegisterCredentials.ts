import { UserRole } from "../../../../store/UserRole";

export interface IRegisterCredentials {
    phone_number: string;
    role: UserRole
}