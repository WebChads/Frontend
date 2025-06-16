import { UserRole } from "../store/UserRole.ts";
import { ApiClient } from "./ApiClient";
import { MockAuthService } from "./services/authService/MockAuthService";

export const api: ApiClient = new ApiClient({
    authService: new MockAuthService(UserRole.Player)
});