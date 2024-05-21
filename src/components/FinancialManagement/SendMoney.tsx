import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonstyles } from '../../assets/css/CommonStyles';
import colors from '../../config/colors';

const SendMoney = () => {
    return (
        <View style={[commonstyles.parent, {backgroundColor: colors.sendmoney.bgcolor}]}>
            <Text>SendMoney</Text>
        </View>
    )
};

export default SendMoney;

const styles = StyleSheet.create({});