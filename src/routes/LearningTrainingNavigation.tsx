import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ELearningHome from '../components/LearningTraining/ELearningHome';

const LearningAndTrainingStack = createNativeStackNavigator();

const LearningTrainingNavigation = (): JSX.Element => {
    return (
        <LearningAndTrainingStack.Navigator
            initialRouteName='landthome'
            screenOptions={{ headerShown: false }}
        >
            <LearningAndTrainingStack.Screen name='landthome' component={ELearningHome} />
        </LearningAndTrainingStack.Navigator>
    )
};

export default LearningTrainingNavigation;