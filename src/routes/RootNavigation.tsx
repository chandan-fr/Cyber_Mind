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
import HealthTrackingNavigation from './HealthTrackingNavigation';
import LearningTrainingNavigation from './LearningTrainingNavigation';
import SustainableLivingNavigation from './SustainableLivingNavigation';
import DocumentStorageNavigation from './DocumentStorageNavigation';
import ChatBot from '../screens/ChatBot';
import AssetManagement from '../screens/AssetManagement';
import FamilyVisionBoard from '../screens/FamilyVisionBoard';


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
            <RootStack.Screen name='healthandwellness' component={HealthTrackingNavigation} />
            <RootStack.Screen name='learningandtraining' component={LearningTrainingNavigation} />
            <RootStack.Screen name='sustainliving' component={SustainableLivingNavigation} />
            <RootStack.Screen name='documentandstorage' component={DocumentStorageNavigation} />
            <RootStack.Screen name='chatbot' component={ChatBot} />
            <RootStack.Screen name='assetmanager' component={AssetManagement} />
            <RootStack.Screen name='familyvision' component={FamilyVisionBoard} />
        </RootStack.Navigator>
    )
};

export default RootNavigation;