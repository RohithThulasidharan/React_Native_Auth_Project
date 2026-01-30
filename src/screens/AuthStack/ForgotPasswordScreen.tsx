import React, { FC, useState } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import appStyles from "../../styles/appStyles";
import { authStyles } from "../../styles/authStyles";

export const ForgotPasswordScreen: React.FC = () => {
    const safeAreaInsets = useSafeAreaInsets();
    const [username, setUsername] = useState<string>("");

    const showPassword = () => {
        Alert.alert("Your password is 1234.")
    };

    return (<SafeAreaView style={appStyles.container}>
        <View style={[authStyles.formContainer, styles.container]}>
            <View style={authStyles.inputWrapper}>
                <Text style={authStyles.label}>Username</Text>
                <TextInput
                    style={authStyles.input}
                    placeholder="Enter username"
                    placeholderTextColor="#A0A0A0"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={username}
                    onChangeText={setUsername}
                />
            </View>

            {/* Retrieve Password Button */}
            <TouchableOpacity
                style={appStyles.blueAppButton}
                onPress={showPassword}
                activeOpacity={0.8}
            >
                <Text style={authStyles.loginButtonText}>Get password</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>);
}

const styles = StyleSheet.create({
    container: {
        marginTop: 36,
        justifyContent: 'center',
    },
});
