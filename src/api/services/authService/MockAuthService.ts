import { UserRole } from "../../../store/UserRole";
import { IAuthService } from "./IAuthService";

const tokens = new Map<UserRole, string>([
    [UserRole.Admin, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTAxNDQ4OTEsInVzZXJfaWQiOiJmN2JlZmJhOC0zOGRhLTQ1OTAtOGRhYS0wMGQ2MzIzODcxOWQiLCJ1c2VyX3JvbGUiOiJBZG1pbmlzdHJhdG9yIn0.0Y29a1K61PSlly5BtA0uKoAfFMcoflmtareIvUs9dU0"],
    [UserRole.Player, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTAxNTA3MzksInVzZXJfaWQiOiJmYmUwYTYwMy0zNmUyLTQ3ZTUtODc5Ni1hMmY3NDgwOWU4YWIiLCJ1c2VyX3JvbGUiOiJQbGF5ZXIifQ.R27nOajYrtgyuXXDp6GEf1V_0zwI94jZaFE3bU4lDR8"]
]);

export class MockAuthService implements IAuthService {
    private defaultToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTAxNDQ4OTEsInVzZXJfaWQiOiJmN2JlZmJhOC0zOGRhLTQ1OTAtOGRhYS0wMGQ2MzIzODcxOWQiLCJ1c2VyX3JvbGUiOiJBZG1pbmlzdHJhdG9yIn0.0Y29a1K61PSlly5BtA0uKoAfFMcoflmtareIvUs9dU0";
    private currentToken: string 

    constructor(userRole: UserRole) {
        this.currentToken = tokens.get(userRole) || this.defaultToken;
    }

    async login(credentials: any): Promise<{ token: string; }> {
        return {
            token: this.currentToken
        };
    }
}