import { Routes, Route } from "react-router-dom";
import {LoginPage} from "../pages/auth/LoginPage";
import { VerifyPage } from "../pages/auth/VerifyPage";
import { PersonalDataPage } from "../pages/auth/PersonalDataPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { ProfilePage } from "../pages/profilePage";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element = {<LoginPage/>}/>
            <Route path="/verify" element = {<VerifyPage/>}/>
            <Route path="/register" element = {<RegisterPage/>}/>
            <Route path="/personalData" element = {<PersonalDataPage/>}/>
            <Route path="/profile" element = {<ProfilePage/>}/>
        </Routes>
    )
}