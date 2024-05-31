import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SustainableLivingHome from '../components/SLM/SustainableLivingHome';

const SustainableLivingStack = createNativeStackNavigator();

const SustainableLivingNavigation = (): JSX.Element => {
    return (
        <SustainableLivingStack.Navigator
            initialRouteName='slhome'
            screenOptions={{ headerShown: false }}
        >
            <SustainableLivingStack.Screen name='slhome' component={SustainableLivingHome} />
        </SustainableLivingStack.Navigator>
    )
};

export default SustainableLivingNavigation;