import React from "react";
import { FlatList } from "react-native";

import { Post } from "../../features/posts/useGetPosts";
import PostCard from "./PostCard";

type PostsListProps = {
    posts: Post[];
}

export const PostsList = ({ posts }: PostsListProps) => {
    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
                return <PostCard {...item} onPress={() => console.log(`Post ${item.id} pressed`)} />;
            }}
        />
    );
}