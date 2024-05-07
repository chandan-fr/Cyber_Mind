import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainDrawer from '../components/MainDrawer';
import { Platform, StyleSheet } from 'react-native';
import CustomDrawerScreen from '../components/CustomDrawerScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigation = (): JSX.Element => {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: styles.drawerStyle,
                drawerType: "front",
                swipeEdgeWidth: Platform.OS === "android" ? 100 : undefined
            }}
            drawerContent={(props) => <CustomDrawerScreen {...props} />}
        >
            <Drawer.Screen name='bottomnav' options={{ headerShown: false }} component={MainDrawer} />
        </Drawer.Navigator>
    )
};

export default DrawerNavigation;

const styles = StyleSheet.create({
    drawerStyle: {
        backgroundColor: "transparent",
    },
});