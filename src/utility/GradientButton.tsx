import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button_Props } from '../config/CustomTypes';
import { commonstyles } from '../assets/css/CommonStyles';
import { fonts } from '../config/fonts';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../config/colors';


const GradientButton = ({ title, width, height, onPress, size, radius }: Button_Props): JSX.Element => {
    const handleOnPress = () => {
        onPress();
    };

    return (
        <TouchableOpacity
            style={[styles.btn, { borderRadius: radius }]}
            onPress={handleOnPress}
        >
            <LinearGradient
                useAngle={true}
                angle={45}
                angleCenter={{ x: 0.4, y: 2 }}
                colors={colors.gdbtn.gdcolor}
                style={[
                    commonstyles.acjc,
                    {
                        width: width ? width : "auto",
                        height: height ? height : "auto",
                        borderRadius: radius,
                    }
                ]}
            >
                <Text style={[styles.btnTxt, { fontSize: size }]}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
};

export default GradientButton;

const styles = StyleSheet.create({
    btn: {
        ...Platform.select({
            ios: {
                shadowColor: colors.gdbtn.shadowcolor,
                shadowOpacity: 0.55,
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 4,
                // backgroundColor: colors.gdbtn.shadowcolorargb,
            },
            android: {
                elevation: 4,
                shadowColor: colors.gdbtn.shadowcolorargb,
            }
        }),
    },
    btnTxt: {
        fontFamily: fonts.medium,
        color: colors.white,
    },
});