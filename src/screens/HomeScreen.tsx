import React, { FC, useEffect, useState } from "react";
import { View, Text, StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { loadUser } from "../services/userStorage";


export const HomeScreen: React.FC = () => {
    const safeAreaInsets = useSafeAreaInsets();
    const isDarkMode = useColorScheme() === 'dark';

    const [name, setName] = useState<string>('Guest');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const value = await loadUser();
                if (value) {
                    setName(value);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                //setIsLoading(false);
            }
        };

        fetchData();

    }, []);

    return (
        <View>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <Text>Welcome, {name}</Text>
        </View>
    );
}