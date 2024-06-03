import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import HealthTrackingHome from '../components/HealthTracking/HealthTrackingHome';

const HealthTrackingStack = createNativeStackNavigator();

const HealthTrackingNavigation = (): JSX.Element => {
    return (
        <HealthTrackingStack.Navigator
            initialRouteName='hthome'
            screenOptions={{ headerShown: false }}
        >
            <HealthTrackingStack.Screen name='hthome' component={HealthTrackingHome} />
        </HealthTrackingStack.Navigator>
    )
};

export default HealthTrackingNavigation;