import { NavigationContainer, StaticParamList, Theme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { HomeScreen } from "../screens/AppStack/HomeScreen";
import { ProfileScreen } from "../screens/AppStack/ProfileScreen";
import { SignInScreen } from "../screens/AuthStack/SignInScreen";
import { SignUpScreen } from "../screens/AuthStack/SignUpScreen";
import { APP_DRAWERS, APP_SCREENS, AUTH_SCREENS } from "../constants/screenConstants";
import { SplashScreen } from "../screens/SplashScreen";
import { loadUser } from "../services/userStorage";
import { useAuthContext } from "../context/auth/useAuthContext";
import { ForgotPasswordScreen } from "../screens/AuthStack/ForgotPasswordScreen";
import { DetailScreen } from "../screens/AppStack/DetailScreen";
import { CustomDrawerContent } from "./drawerComponent";

const AuthStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

// Nesting Drawer inside the Stack instead of the other way around. Called "RootStack"method.
// Done so that the Detail screen can be shown as a Screen over the Drawer, maintaining the drawer
// Without having to deal with the Stack Header coming below the Drawer on the top left.
const AppStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: 'rgb(28, 37, 197)' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
            }}
        >
            <Stack.Screen
                name={APP_SCREENS.DRAWER_ROOT}
                component={DrawerGroup}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={APP_SCREENS.DETAIL}
                component={DetailScreen}
                initialParams={{ postId: undefined as number | undefined }}
            />
        </Stack.Navigator>
    );
};
const DrawerGroup = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerLabelStyle: { fontFamily: 'Poppins-Bold', fontSize: 16 },
                drawerActiveTintColor: 'rgb(28, 37, 197)',
                drawerInactiveTintColor: '#474646',
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            {/* The Home Screen lives directly here now */}
            <Drawer.Screen name={APP_DRAWERS.HOME} component={HomeScreen} />
            <Drawer.Screen name={APP_DRAWERS.PROFILE} component={ProfileScreen} />
        </Drawer.Navigator>
    );
};

export type RootStackParamList = {
    [APP_SCREENS.SPLASH]: undefined;
    [APP_SCREENS.DRAWER_ROOT]: undefined;
    [APP_SCREENS.DETAIL]: { postId: number };
}

export type AuthStackParamList = StaticParamList<typeof AuthStack>;


type NavigationProps = {
    theme: Theme;
};

export const Navigation = ({ theme }: NavigationProps) => {
    const { state, dispatch } = useAuthContext();
    const [isLoading, setLoading] = useState(true);

    // const { isLoading, isLoggedIn } = useAuthCheck();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const value = await loadUser();
                if (value)
                    dispatch({ type: 'LOGIN', payload: { username: value, token: value } });
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // Render Splash directly to avoid Navigator nesting errors since its not part of both stacks
    if (isLoading) {
        return <SplashScreen />;
    }

    return (<NavigationContainer theme={theme}>
        {state.token ? (
            <AppStack />
        ) : (
            <AuthStack.Navigator>
                <AuthStack.Group >
                    <AuthStack.Screen name={AUTH_SCREENS.LOGIN} component={SignInScreen} options={{ headerShown: false }} />
                    <AuthStack.Screen name={AUTH_SCREENS.SIGN_UP} component={SignUpScreen} />
                    <AuthStack.Screen name={AUTH_SCREENS.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
                </AuthStack.Group>
            </AuthStack.Navigator>
        )
        }
    </NavigationContainer >
    );
}
