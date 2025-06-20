import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/auth/LoginPage";
import { VerifyPage } from "../pages/auth/VerifyPage";
import { PersonalDataPage } from "../pages/auth/PersonalDataPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { ProfilePage } from "../pages/profile/ProfilePage";
import { ProfileEditPage } from "../pages/profile/ProfileEditPage";
import { DocumentPage } from "../pages/DocumentPage";
import { TournamentsPage } from "../pages/TournamentsPage";
import { TournamentDetailsPage } from "../pages/TournamentDetailsPage";
import { TournamentFilterPage } from "../pages/TournamentsFilterPage";
import AdminRoutes from "./AdminRoutes";
import { ProtectedRoute } from "./ProtectedRoutes";
import { UserRole } from "../store/UserRole";


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/personalData" element={<PersonalDataPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<ProfileEditPage />} />
            <Route path="/documents" element={<DocumentPage />} />
            <Route path="/tournaments" element={<TournamentsPage />} />
            <Route path="/tournaments/:id" element={<TournamentDetailsPage />} />
            <Route path="/tournament/filter" element={<TournamentFilterPage />} />
            <Route path="/admin/*" element={
                <ProtectedRoute allowedRoles={[UserRole.Admin]}>
                    <AdminRoutes />
                </ProtectedRoute>
            } />
        </Routes>
    )
}