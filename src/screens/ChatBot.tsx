import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonstyles } from '../assets/css/CommonStyles';

const ChatBot = ({ navigation }: { navigation: any }): JSX.Element => {
    return (
        <View style={[commonstyles.parent, commonstyles.acjc]}>
            <Text style={commonstyles.cstext}>AI Chatbot Assistant</Text>
            <Text style={commonstyles.cstext}>Coming Soon!</Text>
            <View style={{ marginTop: 50 }}>
                <Button title='Back' onPress={() => navigation.navigate("drawernav")} />
            </View>
        </View>
    )
};

export default ChatBot;

const styles = StyleSheet.create({});