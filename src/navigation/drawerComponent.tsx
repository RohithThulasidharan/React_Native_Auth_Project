import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useAuthContext } from "../context/auth/useAuthContext";
import { removeUser } from "../services/userStorage";

export const CustomDrawerContent = (props: any) => {
    const navigation = useNavigation();
    const { dispatch } = useAuthContext();

    const logout = async () => {
        await removeUser();
        Alert.alert("Successfully logged out!");
        dispatch({ type: 'LOGOUT' })
    }

    return (
        <View style={styles.container}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: "white" }}>
                <Text style={styles.drawerTitle}>React Native</Text>
                <View style={{ padding: 20 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>

            <View style={styles.logoutContainer}>
                <DrawerItem
                    label="Logout"
                    style={styles.logoutItem}
                    labelStyle={styles.logoutLabel}
                    onPress={logout}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingTop: 40,
    },
    drawerTitle: {
        fontSize: 22,
        fontFamily: 'Poppins-Bold',
        marginLeft: 16,
        marginBottom: 20,
        color: 'rgb(28, 37, 197)',
    },
    logoutContainer: {
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingVertical: 15,
    },
    logoutItem: {// This is for touch area
        width: '60%',
        justifyContent: 'center',
    },
    logoutLabel: {//This is for the text
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: 'crimson',
    },
});
