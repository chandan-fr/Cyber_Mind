import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskAndChoreHome from '../components/TaskAndChoreManagement/TaskAndChoreHome';
import AddTask from '../components/TaskAndChoreManagement/AddTask';

const TaskAndChoreStack = createNativeStackNavigator();

const TaskAndChoreNavigation = (): JSX.Element => {
    return (
        <TaskAndChoreStack.Navigator initialRouteName='t&chome' screenOptions={{ headerShown: false }}>
            <TaskAndChoreStack.Screen name='t&chome' component={TaskAndChoreHome} />
            <TaskAndChoreStack.Screen name='addtask' component={AddTask} />
        </TaskAndChoreStack.Navigator>
    )
};

export default TaskAndChoreNavigation;