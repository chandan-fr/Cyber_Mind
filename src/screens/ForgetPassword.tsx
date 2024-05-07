import { Image, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import colors from '../config/colors';
import { fonts } from '../config/fonts';
import { commonstyles } from '../assets/css/CommonStyles';
import { icons } from '../config/icons';
import { images } from '../config/images';

const ForgetPassword = ({ navigation }: { navigation: any }) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={[commonstyles.parent, { backgroundColor: colors.login.bgcolor }]}>
                <View style={{}}>
                    <TouchableOpacity
                        style={[commonstyles.fdRow, styles.navBtn]}
                        onPress={() => navigation.goBack()}
                    >
                        <Image style={styles.arrow} source={icons.arrow} />
                        <Text style={styles.navTxt}>Forget Password</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: "center", marginTop: 50 }}>
                    <Image style={{ width: 130, height: 160 }} source={images.logo} />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
};

export default ForgetPassword;

const styles = StyleSheet.create({
    navBtn: {
        alignSelf: "flex-start",
        alignItems: "center",
        paddingHorizontal: 5,
        paddingVertical: 3,
        columnGap: 3,
        marginLeft: 6,
    },
    arrow: {
        width: 20,
        height: 30,
    },
    navTxt: {
        color: colors.black,
        fontSize: 20,
        fontFamily: fonts.medium,
    },
});