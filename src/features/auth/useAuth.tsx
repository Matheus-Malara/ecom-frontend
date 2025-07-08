import {createContext, useContext, useState, type ReactNode} from "react";
import {toast} from "react-toastify";
import {loginUser} from "@/services/authApi";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("accessToken"));

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const {accessToken, refreshToken} = await loginUser({email, password});

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            setIsAuthenticated(true);
            toast.success("Login successful");
            return true;
        } catch {
            toast.error("Invalid credentials");
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsAuthenticated(false);
        toast.info("Logged out");
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}
