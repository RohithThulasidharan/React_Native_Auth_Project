import React, { FC } from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const SignUpScreen: React.FC = () => {
    const safeAreaInsets = useSafeAreaInsets();

    return (<View>
        <Text>Sign Up</Text>
    </View>);
}
