export interface IAuthService {
    login(credentials: any): Promise<{token: string}>
}