import React, { FC, useState } from "react";
import { View, Text, StatusBar, useColorScheme, StyleSheet } from "react-native";
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
    const { posts } = state;
    const post = posts.find(p => p.id === postId);
    const [isLoading, setIsLoading] = useState(true);

    return <SafeAreaView edges={['right', 'bottom', 'left']} style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Text style={styles.welcomeText}>Welcome, {state.username}</Text>
        <>
            <Text style={styles.postTitle}>{post?.title ?? 'No title'}</Text>
            <Text style={styles.postBody}>{post?.body ?? 'No body content'}</Text>
        </>
    </SafeAreaView>;
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },

    welcomeText: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 16,
        color: '#111827',
    },

    postTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 6,
        color: '#1F2937',
    },

    postBody: {
        fontSize: 14,
        lineHeight: 20,
        color: '#6B7280',
    },
});