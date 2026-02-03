import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useAuthContext } from "../context/auth/useAuthContext";
import { removeUser } from "../services/userStorage";
import DeviceInfo from "react-native-device-info";

export const CustomDrawerContent = (props: any) => {
    const navigation = useNavigation();
    const { dispatch } = useAuthContext();
    const appVersion = DeviceInfo.getVersion();
    const buildNumber = DeviceInfo.getBuildNumber();

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
                <TouchableOpacity
                    style={styles.logoutItem}
                    onPress={logout}
                >
                    <Text style={styles.logoutLabel}>Logout</Text>
                </TouchableOpacity>
                <Text style={styles.versionLabel}>{appVersion}.{buildNumber}</Text>
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
        paddingBottom: 10,
    },
    logoutLabel: {//This is for the text
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: 'crimson',
    },
    versionLabel: {
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 10,
        color: 'grey',
    }
});
