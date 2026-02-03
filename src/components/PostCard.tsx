import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Post } from '../features/posts/useGetPosts';

type PostCardProps = Post & {
    onPress?: () => void;
};

const PostCard = ({ id, user_id, title, body, onPress }: PostCardProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
            {/* Left Side: Name and Number */}
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{title}</Text>
                <Text style={styles.number}>{body}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    number: {
        fontSize: 14,
        color: '#666',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusDot: {
        width: 12,
        height: 12,
        borderRadius: 6, // Makes it round
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        color: '#888',
    },
});

export default PostCard;