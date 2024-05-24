import { Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskAndChoreHome from '../components/TaskAndChoreManagement/TaskAndChoreHome';

const TaskAndChoreStack = createNativeStackNavigator();

const TaskAndChoreNavigation = (): JSX.Element => {
    return (
        <TaskAndChoreStack.Navigator initialRouteName='t&chome' screenOptions={{ headerShown: false }}>
            <TaskAndChoreStack.Screen name='t&chome' component={TaskAndChoreHome} />
        </TaskAndChoreStack.Navigator>
    )
};

export default TaskAndChoreNavigation;