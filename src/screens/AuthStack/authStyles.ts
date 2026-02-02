import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
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