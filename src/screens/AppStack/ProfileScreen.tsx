import React, { FC } from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";



export const ProfileScreen: React.FC = () => {
    const safeAreaInsets = useSafeAreaInsets();

    return (<View>
        <Text>Your Profile</Text>
    </View>);
}