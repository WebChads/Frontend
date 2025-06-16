import { createContext } from "react";
import { authStore } from "../store/AuthStore";

export const AuthContext = createContext(authStore);