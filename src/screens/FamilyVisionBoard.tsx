import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonstyles } from '../assets/css/CommonStyles';

const FamilyVisionBoard = ({ navigation }: { navigation: any }): JSX.Element => {
    return (
        <View style={[commonstyles.parent, commonstyles.acjc]}>
            <Text style={commonstyles.cstext}>Family Vision Board</Text>
            <Text style={commonstyles.cstext}>Coming Soon!</Text>
            <View style={{marginTop: 50}}>
                <Button title='Back' onPress={()=> navigation.navigate("drawernav")} />
            </View>
        </View>
    )
};

export default FamilyVisionBoard;

const styles = StyleSheet.create({});