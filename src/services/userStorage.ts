import AsyncStorage from "@react-native-async-storage/async-storage";

import { STORAGE_KEYS } from "../constants/storageKeys";

export const saveUser = async (name: string, password: string | null = null) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.USER_NAME, name);
        if (password)
            await AsyncStorage.setItem(STORAGE_KEYS.PASSWORD, password);
    } catch (e) {
        console.error(e);
    }
}

export const loadUser = async () => {
    try {
        const value = await AsyncStorage.getItem(STORAGE_KEYS.USER_NAME);
        return value != null ? value : null;
    } catch (e) {
        console.error('Failed to load user', e);
        return null;
    }
};

export const removeUser = async () => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEYS.USER_NAME);
        await AsyncStorage.removeItem(STORAGE_KEYS.PASSWORD);
    } catch (e) {
        console.error('Failed to remove user', e);
    }
};