import { AuthAction, AuthState } from "./authState";

export const initialState: AuthState = {
    username: null,
    token: null
}

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, username: action.payload.username, token: action.payload.username };
        case 'LOGOUT':
            return { ...state, username: null, token: null };
        default:
            return state;
    }
}