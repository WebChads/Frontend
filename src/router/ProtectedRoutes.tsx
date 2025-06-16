import { observer } from "mobx-react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserRole } from "../store/UserRole";
import { ReactNode } from "react";

interface IProtectedRouteProps {
    allowedRoles: UserRole[];
    children?: ReactNode;
}

export const ProtectedRoute = observer(({ children, allowedRoles }: IProtectedRouteProps) => {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!auth.hasRole(allowedRoles)) {
        return <Navigate to="/not-authorized" replace />;
    }

    // Возвращаем children если они есть, иначе Outlet для вложенных маршрутов
    return children ? <>{children}</> : <Outlet />;
});