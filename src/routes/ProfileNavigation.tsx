import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfile from '../components/Profile/UserProfile';
import EditProfile from '../components/Profile/EditProfile';
import { Platform } from 'react-native';

const ProfileStack = createNativeStackNavigator();

const ProfileNav = () => {
    return (
        <ProfileStack.Navigator
            initialRouteName='userprofile'
            screenOptions={{
                headerShown: false,
            }}
        >
            <ProfileStack.Screen
                name='userprofile'
                component={UserProfile}
            />
            <ProfileStack.Screen
                name='editprofile'
                component={EditProfile}
            />
        </ProfileStack.Navigator>
    )
};

export default ProfileNav;