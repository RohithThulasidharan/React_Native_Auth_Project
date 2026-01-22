import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../config/navigation";
import { saveUser } from "../services/userStorage";


export const SignInScreen: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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

        setTimeout(() => {
            setIsLoading(false);
            saveUser(username)
            Alert.alert('Success', `Welcome back, ${username}!`);
            //navigation.navigate('Home');
            navigation.replace('Home');
        }, 2000);
    };

    return (<SafeAreaView style={styles.container}>
        { /* Header Section */}
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter name"
                    placeholderTextColor="#A0A0A0"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={username}
                    onChangeText={setUsername}
                />
            </View>

            {/* Password Input */}
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
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
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={isLoading}
                activeOpacity={0.8}
            >
                {isLoading ? (
                    <ActivityIndicator color="#FFF" />
                ) : (
                    <Text style={styles.loginButtonText}>Log In</Text>
                )}
            </TouchableOpacity>
        </View>
    </SafeAreaView>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#444'
    },
    headerContainer: {
        marginTop: 40,
        marginBottom: 40,
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666666',
    },
    formContainer: {
        paddingHorizontal: 24,
        marginBottom: 20,
    },
    inputWrapper: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 8,
    },
    input: {
        height: 50,
        backgroundColor: '#F5F6FA',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#1A1A1A',
        borderWidth: 1,
        borderColor: '#E8E8E8',
    },
    passwordContainer: {
        height: 50,
        backgroundColor: '#F5F6FA',
        borderRadius: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E8E8E8',
    },
    passwordInput: {
        flex: 1,
        fontSize: 16,
        color: '#1A1A1A',
    },
    loginButton: {
        height: 56,
        backgroundColor: '#007AFF',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#007AFF',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});