import React, { FC, useState } from "react";
import { View, Text, StatusBar, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthContext } from "../../context/auth/useAuthContext";

export const DetailScreen: React.FC = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const { state, dispatch } = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);

    return <SafeAreaView>
        <View>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <Text>Welcome, {state.username}</Text>
        </View>
    </SafeAreaView>;
}