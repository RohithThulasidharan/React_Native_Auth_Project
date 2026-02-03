import React, { FC, useEffect, useState } from "react";
import { View, Text, StatusBar, useColorScheme, Button, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { loadUser, removeUser } from "../../services/userStorage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/navigation";
import { useAuthContext } from "../../context/auth/useAuthContext";
import { useGetPosts } from "../../features/posts/useGetPosts";
import { PostsList } from "../Components/PostsList";

export const HomeScreen: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { state, dispatch } = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);
    const { posts, loading, error } = useGetPosts();

    useEffect(() => {
        if (posts) {
            dispatch({ type: 'SET_POSTS', payload: posts });
        }
    }, [posts, dispatch]);

    return (
        <SafeAreaView edges={['right', 'bottom', 'left']}>
            <PostsList posts={posts} />
        </SafeAreaView>
    );
}