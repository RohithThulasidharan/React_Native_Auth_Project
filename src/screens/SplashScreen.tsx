import React from 'react';
import { View, Image, StyleSheet, ImageBackground, Text } from 'react-native';

import { Images } from '../assets/Images';

export const SplashScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            {/* 1. Background Blurred Image */}
            <ImageBackground
                source={Images.SPLASH}
                style={StyleSheet.absoluteFill}
                blurRadius={20} // This is your Layer Blur
            >
                {/* 2. Dark Overlay to make the text pop */}
                <View style={styles.overlay} />
            </ImageBackground>

            {/* 3. Foreground Content */}
            <View style={styles.content}>
                <Image
                    source={Images.SPLASH}
                    style={styles.profileImage}
                />

                <Text style={styles.loadingStyle}>Loading...</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    overlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: '#444',
    },
    loadingStyle: {
        marginTop: 20,
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
    }
});
