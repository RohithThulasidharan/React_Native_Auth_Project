export interface AuthState {
    username: string | null;
    token: string | null;
}

export type AuthAction =
    | {
        type: 'LOGIN'; payload: {
            username: string
            token: string
        }
    }
    | { // Just added for practice even if its a copy of LOGIN action format in this copy
        type: 'SIGNUP'; payload: {
            username: string
            token: string
        }
    }
    | { type: 'LOGOUT' }