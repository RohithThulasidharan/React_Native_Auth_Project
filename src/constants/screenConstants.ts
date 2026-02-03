export const AUTH_SCREENS = {
    LOGIN: 'Login',
    SIGN_UP: 'SignUp',
    FORGOT_PASSWORD: 'ForgotPassword'
};

export const APP_DRAWERS = {
    HOME: "Home",
    PROFILE: "Profile"
}
export const APP_SCREENS = {
    DRAWER_ROOT: 'Dashboard',
    DETAIL: 'Detail',
    SPLASH: 'Splash'
} as const; // Without it, TypeScript thinks APP_SCREENS.HOME is just any string.
//  With as const, TypeScript knows it is specifically the literal string "Home",
//  which allows it to be used as a key in your type definition.
