import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Splash from '../screens/Splash';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import OnBoardScreen from '../screens/OnBoardScreen';
import ForgetPassword from '../screens/ForgetPassword';
import DrawerNavigation from './DrawerNavigation';
import FinancialManagementNavigation from './FinancialManagementNavigation';
import TaskAndChoreNavigation from './TaskAndChoreNavigation';


const RootStack = createNativeStackNavigator();

const RootNavigation = (): JSX.Element => {
    return (
        <RootStack.Navigator initialRouteName='splash' screenOptions={{ headerShown: false }}>
            <RootStack.Screen name='splash' component={Splash} />
            <RootStack.Screen name='onboardscreen' component={OnBoardScreen} />
            <RootStack.Screen name='welcomescreen' component={WelcomeScreen} />
            <RootStack.Screen name='signup' component={SignUp} />
            <RootStack.Screen name='login' component={Login} />
            <RootStack.Screen name='forgetpassword' component={ForgetPassword} />
            <RootStack.Screen name='drawernav' component={DrawerNavigation} />
            <RootStack.Screen name='finman' component={FinancialManagementNavigation} />
            <RootStack.Screen name='taskchore' component={TaskAndChoreNavigation} />
        </RootStack.Navigator>
    )
};

export default RootNavigation;