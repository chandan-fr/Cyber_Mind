import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FamilyCalendarHome from '../components/FamilyCalendar/FamilyCalendarHome';
import AddEvent from '../components/FamilyCalendar/AddEvent';
import AddTodo from '../components/FamilyCalendar/AddTodo';

const FCStack = createNativeStackNavigator();

const FamilyCalendarNavigation = (): JSX.Element => {
    return (
        <FCStack.Navigator
            initialRouteName='fchome'
            screenOptions={{
                headerShown: false,
            }}
        >
            <FCStack.Screen name='fchome' component={FamilyCalendarHome} />
            <FCStack.Screen name='addevent' component={AddEvent} />
            <FCStack.Screen name='addtodo' component={AddTodo} />
        </FCStack.Navigator>
    )
};

export default FamilyCalendarNavigation;