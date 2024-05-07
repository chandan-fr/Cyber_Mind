import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatHome from '../components/Chat/ChatHome';
import P2PChat from '../components/Chat/P2PChat';

const ChatStack = createNativeStackNavigator();

const ChatNav = () => {
    return (
        <ChatStack.Navigator
            initialRouteName='chathome'
            screenOptions={{ headerShown: false }}
        >
            <ChatStack.Screen name='chathome' component={ChatHome} />
            <ChatStack.Screen name='p2pchat' component={P2PChat} />
        </ChatStack.Navigator>
    )
};

export default ChatNav;