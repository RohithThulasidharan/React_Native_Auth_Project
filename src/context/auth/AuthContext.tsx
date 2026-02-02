import { createContext, ReactNode, useReducer } from "react";

import { AuthAction, AuthState } from "./authState";
import { authReducer, initialState } from "./authReducer";

interface AuthContextProps {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return <AuthContext.Provider value={{ state, dispatch }}>
        {children}
    </AuthContext.Provider>
}
