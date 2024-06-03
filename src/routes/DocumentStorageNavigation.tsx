import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StorageManagementHome from '../components/StorageManagement/StorageManagementHome';

const DocumentStorageStack = createNativeStackNavigator();

const DocumentStorageNavigation = (): JSX.Element => {
    return (
        <DocumentStorageStack.Navigator
            initialRouteName='smhome'
            screenOptions={{ headerShown: false }}
        >
            <DocumentStorageStack.Screen name='smhome' component={StorageManagementHome} />
        </DocumentStorageStack.Navigator>
    )
};

export default DocumentStorageNavigation;