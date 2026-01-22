import { createStaticNavigation, StaticParamList } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { SignInScreen } from "../screens/SignInScreen";
import { SignUpScreen } from "../screens/SignUpScreen";

// export const RootStack = createNativeStackNavigator({
//     groups: {
//         LoggedIn: {
//             if: useIsSignedIn,
//             screens: {
//                 Home: HomeScreen,
//                 Profile: ProfileScreen,
//             },
//         },
//         LoggedOut: {
//             if: useIsSignedOut,
//             screens: {
//                 SignIn: SignInScreen,
//                 SignUp: SignUpScreen,
//             },
//         },
//     },
// });

export const RootStack = createNativeStackNavigator({
    initialRouteName: "Login",
    screens: {
        Login: {
            screen: SignInScreen,
            options: {
                headerShown: false
            }
        },
        Home: {
            screen: HomeScreen,
            options: {
                headerBackVisible: false,
                gestureEnabled: false,
            }
        },
        Profile: ProfileScreen
    }
});

export type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

export const Navigation = createStaticNavigation(RootStack);
