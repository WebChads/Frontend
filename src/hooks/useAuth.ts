import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
    const authStore  = useContext(AuthContext);

    return {
        user: authStore.user,
        isLoading: authStore.isLoading,
        login: authStore.login,
        logout: authStore.logout,
        hasRole: authStore.hasRole
    }
}