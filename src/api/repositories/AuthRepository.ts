import { IAuthService } from "../services/authService/IAuthService";

export class AuthRepository {
    private service: IAuthService

    constructor (service: IAuthService) {
        this.service = service;
    }

    async login(credentials: any) {
        try {
            return await this.service.login(credentials);
        } catch (e: any) {
            throw new Error(`Auth failed: ${e.message}`)
        }
    }
}