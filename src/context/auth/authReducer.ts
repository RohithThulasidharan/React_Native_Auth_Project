import { AuthAction, AuthState } from "./authState";

export const initialState: AuthState = {
    username: null,
    token: null,
    posts: [],
}

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, username: action.payload.username, token: action.payload.username };
        case 'SIGNUP':
            return { ...state, username: action.payload.username, token: action.payload.username };
        case 'LOGOUT':
            return { ...state, username: null, token: null };
        case "SET_POSTS":
            return { ...state, posts: action.payload };
        default:
            return state;
    }
}