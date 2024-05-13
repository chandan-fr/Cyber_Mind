import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonstyles } from '../../assets/css/CommonStyles';
import colors from '../../config/colors';

const AddEvent = ({ navigation }: { navigation: any }) => {
    return (
        <View style={[commonstyles.parent, { backgroundColor: colors.createevent.bgcolor }]}>
            <Text>CreateEvent</Text>
        </View>
    )
};

export default AddEvent;

const styles = StyleSheet.create({});