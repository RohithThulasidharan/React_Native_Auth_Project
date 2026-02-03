import React from "react";
import { FlatList } from "react-native";

import { Post } from "../features/posts/useGetPosts";
import PostCard from "./PostCard";
import { useNavigation } from "@react-navigation/native";
import { APP_SCREENS } from "../constants/screenConstants";
import { RootStackParamList } from "../navigation/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type PostsListProps = {
    posts: Post[];
}

export const PostsList = ({ posts }: PostsListProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const goToDetail = (postId: number) => {
        navigation.navigate(APP_SCREENS.DETAIL, { postId: postId })
    }

    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
                return <PostCard {...item} onPress={() => goToDetail(item.id)} />;
            }}
        />
    );
}