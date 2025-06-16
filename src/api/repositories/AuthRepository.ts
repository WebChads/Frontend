import { IAuthService } from "../services/authService/IAuthService";
import { IRegisterCredentials } from "../services/authService/credentials/IRegisterCredentials";
import { ISendSMSCodeCredentials } from "../services/authService/credentials/ISendSMSCodeCredentials";
import { IVerifySMSCodeCredentials } from "../services/authService/credentials/IVerifySMSCodeCredentials";
import { IResponseVerifySMSCode } from "../services/responses/IResponseVerifySMSCode";

export class AuthRepository {
    private service: IAuthService

    constructor(service: IAuthService) {
        this.service = service;
    }

    async register(credentials: IRegisterCredentials) {
        try {
            return await this.service.register(credentials);
        } catch (e: any) {
            throw new Error(`Auth failed: ${e.message}`)
        }
    }

    async sendSMSCode(credentials: ISendSMSCodeCredentials) {
        try {
            return await this.service.sendSMSCode(credentials);
        } catch (e: any) {
            throw new Error(`Send-SMS-code failed: ${e.message}`)
        }
    }

    async verifySMSCode(credentials: IVerifySMSCodeCredentials): Promise<IResponseVerifySMSCode> {
        try {
            return await this.service.verifySMSCode(credentials);
        } catch (e: any) {
            throw new Error(`Send-SMS-code failed: ${e.message}`)
        }
    }
}