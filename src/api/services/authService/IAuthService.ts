import { IResponseVerifySMSCode } from "../responses/IResponseVerifySMSCode"
import { IRegisterCredentials } from "./credentials/IRegisterCredentials"
import { ISendSMSCodeCredentials } from "./credentials/ISendSMSCodeCredentials"
import { IVerifySMSCodeCredentials } from "./credentials/IVerifySMSCodeCredentials"

export interface IAuthService {
    register(credentials: IRegisterCredentials): Promise<void>
    sendSMSCode(credentials: ISendSMSCodeCredentials): Promise<void>
    verifySMSCode(credentials: IVerifySMSCodeCredentials): Promise<IResponseVerifySMSCode>
}

