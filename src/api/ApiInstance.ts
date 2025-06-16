import { UserRole } from "../store/UserRole.ts";
import { ApiClient } from "./ApiClient";
import { AuthService } from "./services/authService/AuthService.ts";
import { MockAuthService } from "./services/authService/MockAuthService";

export const api: ApiClient = new ApiClient({
    authService: new AuthService()
});