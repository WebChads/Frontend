import { makeAutoObservable } from 'mobx';
import { jwtDecode } from "jwt-decode";
import { api } from '../api/ApiInstance';
import { UserRole } from './UserRole';
import { IVerifySMSCodeCredentials } from '../api/services/authService/credentials/IVerifySMSCodeCredentials';

export interface IUser {
    id: string,
    role: UserRole
}

export class AuthStore {
    user: IUser | null = null;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
        this.initialize();
    }

    initialize() {
        this.isLoading = true;
        const token = localStorage.getItem('token');
        if (token) {
            try {
                this.user = parseJWT(token);
            } catch (e) {
                localStorage.removeItem('token')
            }
        }
        this.isLoading = false;
    }

    hasRole(allowedRoles: UserRole[]) {
        return this.user !== null && allowedRoles.includes(this.user.role);
    }

    async login(credentials: IVerifySMSCodeCredentials) {
        this.isLoading = true;
        try {
            const { token } = await api.auth.verifySMSCode(credentials);
            localStorage.setItem('token', token);
            this.user = await parseJWT(token);
        } finally {
            this.isLoading = false;
        }
    }

    logout() {
        this.user = null;
        localStorage.removeItem('token');
    }
}

function parseJWT(token: string) {
    const decode = jwtDecode(token);
    const user = jwtToUser(decode);

    return user;
}

function jwtToUser(jwtPayload: any): IUser {
    let role: UserRole;

    switch (jwtPayload.user_role) {
        case "Administrator":
            role = UserRole.Admin;
            break;
        case "Player":
            role = UserRole.Player;
            break;
        case "Trainer":
            role = UserRole.Trainer;
            break;
        default:
            role = UserRole.Player;
    }

    return {
        id: jwtPayload.user_id,
        role: role
    };
}

export const authStore = new AuthStore();