import React, { FC, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import appStyles from "../../styles/appStyles";
import { authStyles } from "../../styles/authStyles";
import { useAuthContext } from "../../context/auth/useAuthContext";
import { saveUser } from "../../services/userStorage";

export const SignUpScreen: React.FC = () => {
    const safeAreaInsets = useSafeAreaInsets();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [reenteredPassword, setReenteredPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { state, dispatch } = useAuthContext();

    const handleSignUp = () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        if (password !== reenteredPassword) {
            Alert.alert("Passwords do not match")
            return;
        }

        setIsLoading(true);

        setTimeout(async () => {
            setIsLoading(false);
            console.log("saveUser is", saveUser);
            await saveUser(username, password);
            Alert.alert('Success', `Welcome, ${username}! Registration complete`);
            dispatch({ type: 'SIGNUP', payload: { username: username, token: username } });
        }, 2000);
    };


    return (<SafeAreaView style={appStyles.container}>
        { /* Header Section */}
        <View style={authStyles.headerContainer}>
            <Text style={appStyles.title}>Welcome!</Text>
            <Text style={appStyles.subtitle}>Sign up to register</Text>
        </View>

        {/* Form Section */}
        <View style={authStyles.formContainer}>
            <View style={authStyles.inputWrapper}>
                <Text style={authStyles.label}>Username</Text>
                <TextInput
                    style={authStyles.input}
                    placeholder="Enter name"
                    placeholderTextColor="#A0A0A0"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={username}
                    onChangeText={setUsername}
                />
            </View>

            {/* Password Input */}
            <View style={authStyles.inputWrapper}>
                <Text style={authStyles.label}>Password</Text>
                <View style={authStyles.passwordContainer}>
                    <TextInput
                        style={authStyles.passwordInput}
                        placeholder="••••••••"
                        placeholderTextColor="#A0A0A0"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
            </View>

            <View style={authStyles.inputWrapper}>
                <Text style={authStyles.label}>Re-enter Password</Text>
                <View style={authStyles.passwordContainer}>
                    <TextInput
                        style={authStyles.passwordInput}
                        placeholder="••••••••"
                        placeholderTextColor="#A0A0A0"
                        secureTextEntry={true}
                        value={reenteredPassword}
                        onChangeText={setReenteredPassword}
                    />
                </View>
            </View>


            {/* Login Button */}
            <TouchableOpacity
                style={appStyles.blueAppButton}
                onPress={handleSignUp}
                disabled={isLoading}
                activeOpacity={0.8}
            >
                {isLoading ? (
                    <ActivityIndicator color="#FFF" />
                ) : (
                    <Text style={authStyles.loginButtonText}>Sign Up</Text>
                )}
            </TouchableOpacity>
        </View>
    </SafeAreaView>);;
}


