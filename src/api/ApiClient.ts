import { AuthRepository } from "./repositories/AuthRepository";
import { IAuthService } from "./services/authService/IAuthService"

export class ApiClient {
    public auth: AuthRepository

    constructor(config: {
        authService: IAuthService,
    }) {
        this.auth = new AuthRepository(config.authService);
    }
}