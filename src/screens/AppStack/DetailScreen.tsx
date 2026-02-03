import React, { FC, useState } from "react";
import { View, Text, StatusBar, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useAuthContext } from "../../context/auth/useAuthContext";
import { RootStackParamList } from "../../navigation/navigation";
import { APP_SCREENS } from "../../constants/screenConstants";

type Props = NativeStackScreenProps<RootStackParamList, typeof APP_SCREENS.DETAIL>;

export const DetailScreen: React.FC<Props> = ({ route }: Props) => {
    const { postId } = route.params;
    const isDarkMode = useColorScheme() === 'dark';
    const { state, dispatch } = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);

    return <SafeAreaView edges={['right', 'bottom', 'left']}>
        <View>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <Text>Welcome, {state.username}</Text>
            <Text>Welcome, {postId}</Text>
        </View>
    </SafeAreaView>;
}