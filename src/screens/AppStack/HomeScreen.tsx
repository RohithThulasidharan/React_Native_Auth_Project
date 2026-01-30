import React, { FC, useEffect, useState } from "react";
import { View, Text, StatusBar, useColorScheme, Button, Alert } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { loadUser, removeUser } from "../../services/userStorage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/navigation";
import { useAuthContext } from "../../context/auth/useAuthContext";

export const HomeScreen: React.FC = () => {
    const safeAreaInsets = useSafeAreaInsets();
    const isDarkMode = useColorScheme() === 'dark';

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [name, setName] = useState<string>('Guest');
    const { state, dispatch } = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
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

    const logout = async () => {
        await removeUser();
        Alert.alert("Successfully logged out!");
        dispatch({ type: 'LOGOUT' })
    }

    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={logout} title="Log out" />
            ),
        });
    }, [navigation]);

    return (
        <View>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <Text>Welcome, {name}</Text>
        </View>
    );
}