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

const AuthStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#f4511e' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
            }}
        >
            <Stack.Screen
                name={APP_SCREENS.HOME}
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={APP_SCREENS.DETAIL}
                component={DetailScreen}
            />
        </Stack.Navigator>
    );
}

export type RootStackParamList = StaticParamList<typeof Stack>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

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

    // Recommended by React Navigation docs to use the Groups directly under one stack navigator rather than creating
    // 2 different stack navigators and conditionally using them.
    return (<NavigationContainer theme={theme}>
        {isLoading ? (
            < Stack.Screen name={APP_SCREENS.SPLASH} component={SplashScreen} />
        ) :
            state.token ? (
                <Drawer.Navigator >
                    <Drawer.Screen name={APP_DRAWERS.HOME} component={HomeStack} />
                    <Drawer.Screen name={APP_DRAWERS.PROFILE} component={ProfileScreen} />
                </Drawer.Navigator>
            ) : (
                <AuthStack.Navigator>
                    <Stack.Group screenOptions={{ headerShown: false }}>
                        <Stack.Screen name={AUTH_SCREENS.LOGIN} component={SignInScreen} />
                        <Stack.Screen name={AUTH_SCREENS.SIGN_UP} component={SignUpScreen} />
                        <Stack.Screen name={AUTH_SCREENS.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
                    </Stack.Group>
                </AuthStack.Navigator>
            )
        }
    </NavigationContainer >
    );
}
