import { Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { commonstyles } from '../assets/css/CommonStyles';
import BgGradient from '../utility/BgGradient';
import { images } from '../config/images';
import { fonts } from '../config/fonts';
import GradientButton from '../utility/GradientButton';
import colors from '../config/colors';
import { _Height } from '../config/staticVariables';


const WelcomeScreen = ({ navigation }: { navigation: any }) => {
    const [visible, setVisible] = useState<boolean>(true);

    const modalFunc = () => {
        setVisible(false)
    };

    return (
        <SafeAreaView style={commonstyles.parent}>
            <BgGradient height={_Height} colors={colors.welcomescr.gdcolor} />

            <View style={[styles.topBox, commonstyles.acje]}>
                <Image style={commonstyles.logo} source={images.logo} />
            </View>

            <View style={[styles.bottomBox]}>
                <View style={[commonstyles.acjc, { rowGap: 10 }]}>
                    <Text style={styles.heading}>
                        Welcome To Cybermind
                    </Text>

                    <Text style={styles.para}>
                        Aenean lacus sapien, bibendum vitae imperdiet et, sodales id purus.
                    </Text>
                </View>

                <View style={{ rowGap: 20 }}>
                    <GradientButton title='Sign Up' height={55} size={18} onPress={() => navigation.navigate("signup")} radius={30} />

                    <TouchableOpacity
                        style={[commonstyles.acjc, styles.btnOutline]}
                        onPress={() => navigation.navigate("login")}
                    >
                        <Text style={styles.btnTxt}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    topBox: {
        flex: 1,
    },
    bottomBox: {
        flex: 1.1,
        justifyContent: "center",
        rowGap: 40,
        marginHorizontal: 30,
    },
    heading: {
        ...Platform.select({
            ios: {
                fontSize: 26,
                textTransform: "uppercase",
                color: colors.welcomescr.heading,
                fontFamily: fonts.semibold,
            },
            android: {
                fontSize: 26,
                textTransform: "uppercase",
                color: colors.welcomescr.heading,
                fontFamily: fonts.semibold,
                textAlign: "center",
            }
        })
    },
    para: {
        fontSize: 16,
        textTransform: "uppercase",
        color: colors.black,
        fontFamily: fonts.regular,
        textAlign: "center",
    },
    btnOutline: {
        height: 55,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colors.welcomescr.outlnbtn,
    },
    btnTxt: {
        fontSize: 18,
        color: colors.black,
        fontFamily: fonts.medium,
    },
});