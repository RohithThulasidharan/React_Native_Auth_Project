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
    | { type: 'LOGOUT' }