import axios, { AxiosInstance } from "axios";
import { IAuthService } from "./IAuthService";
import { UserRole } from "../../../store/UserRole";
import { createAxiosInstance } from "../createAxiosInstance.ts";
import { IRegisterCredentials } from "./credentials/IRegisterCredentials.ts";
import { ISendSMSCodeCredentials } from "./credentials/ISendSMSCodeCredentials.ts";
import { IResponseVerifySMSCode } from "../responses/IResponseVerifySMSCode.ts";
import { IVerifySMSCodeCredentials } from "./credentials/IVerifySMSCodeCredentials.ts";

export class AuthService implements IAuthService {
    private baseURL: string = 'http://93.189.230.10:8081/api/v1/auth/';
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = createAxiosInstance(this.baseURL);
    }

    async verifySMSCode(credentials: IVerifySMSCodeCredentials): Promise<IResponseVerifySMSCode> {
        const response = await this.axiosInstance.post<IResponseVerifySMSCode>('verify-sms-code', credentials);
        console.log(response.status)
        return response.data;
    }

    async sendSMSCode(credentials: ISendSMSCodeCredentials): Promise<void> {
        const response = await this.axiosInstance.post('send-sms-code', credentials);
    }

    login(credentials: any): Promise<{ token: string; }> {
        throw new Error("Method not implemented.");
    }

    async register(credentials: IRegisterCredentials) {
        const response = await this.axiosInstance.post("register", credentials);
    }
}