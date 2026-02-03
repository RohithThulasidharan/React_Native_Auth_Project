import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthStackParamList, RootStackParamList } from "../../navigation/navigation";
import { saveUser } from "../../services/userStorage";
import appStyles from "../../styles/appStyles";
import { useAuthContext } from "../../context/auth/useAuthContext";
import { authStyles } from "./authStyles";
import { AUTH_SCREENS } from "../../constants/screenConstants";


export const SignInScreen: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { state, dispatch } = useAuthContext();

    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        if (password !== '1234') {
            Alert.alert("Incorrect password. Try again!")
            return;
        }

        setIsLoading(true);

        setTimeout(async () => {
            setIsLoading(false);
            console.log("saveUser is", saveUser);
            await saveUser(username);
            Alert.alert('Success', `Welcome back, ${username}!`);
            dispatch({ type: 'LOGIN', payload: { username: username, token: username } });
        }, 2000);
    };

    const goToSignUp = () => {
        navigation.navigate(AUTH_SCREENS.SIGN_UP);
        console.log('Go to Register');
    };

    const goToForgotPassword = () => {
        navigation.navigate(AUTH_SCREENS.FORGOT_PASSWORD);
        console.log('Go to Register');
    };

    return (<SafeAreaView style={appStyles.container}>
        { /* Header Section */}
        <View style={authStyles.headerContainer}>
            <Text style={appStyles.title}>Welcome Back</Text>
            <Text style={appStyles.subtitle}>Sign in to continue</Text>
        </View>

        {/* Form Section */}
        <View style={authStyles.formContainer}>
            <View style={[authStyles.inputWrapper]}>
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


            {/* Login Button */}
            <TouchableOpacity
                style={appStyles.blueAppButton}
                onPress={handleLogin}
                disabled={isLoading}
                activeOpacity={0.8}
            >
                {isLoading ? (
                    <ActivityIndicator color="#FFF" />
                ) : (
                    <Text style={authStyles.loginButtonText}>Log In</Text>
                )}
            </TouchableOpacity>

            <Text style={styles.footerText}>
                New user?{' '}
                <Text style={styles.registerText} onPress={goToSignUp}>
                    Register here
                </Text>
            </Text>

            <Text style={[styles.registerText, styles.forgotPassword]} onPress={goToForgotPassword}>
                Forgot password?
            </Text>
        </View>
    </SafeAreaView>);
}

const styles = StyleSheet.create({
    footerText: {
        marginTop: 24,
        color: '#666',
        fontSize: 14,
    },
    registerText: {
        color: '#007BFF',
        fontWeight: '600',
    },
    forgotPassword: {
        marginTop: 12,
    },
});
