import { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";

export interface User {
    email: string;
    password: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (userData: User, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadUser = () => {
            const token = localStorage.getItem("token");
            const userData = localStorage.getItem("user");
            if (token && userData){
                try {
                    setUser(JSON.parse(userData));
                } catch (error) {
                    console.error("Error parsing user data", error);
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = (userData: User, token:string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () : AuthContextType => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth se tiene que usar en un AuthProvider");
    }
    return context;
};