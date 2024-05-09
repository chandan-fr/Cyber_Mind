import { Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { commonstyles } from '../../assets/css/CommonStyles';
import colors from '../../config/colors';
import { icons } from '../../config/icons';
import { _Height } from '../../config/staticVariables';
import { fonts } from '../../config/fonts';
import { images } from '../../config/images';


const FamilyCalendarHome = ({ navigation }: { navigation: any }) => {
    return (
        <View style={commonstyles.parent}>
            {/* top content */}
            <ImageBackground
                style={styles.headerTop}
                source={images.fchbg}
            >
                {/* navigation */}
                <View style={[styles.navWrap, commonstyles.fdRow]}>
                    <TouchableOpacity
                        style={[styles.nav, commonstyles.acjc]}
                        onPress={() => navigation.goBack()}
                    >
                        <Image source={icons.arrow} style={styles.navImg} />
                    </TouchableOpacity>

                    <View>
                        <Text style={styles.yearOnTop}>{2024}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.bellWrap}
                    >
                        <Image source={icons.bell} style={styles.bell} />

                        <View style={styles.notiDot} />
                    </TouchableOpacity>
                </View>

                <View style={[styles.months, commonstyles.fdRow, commonstyles.acjsb]}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.month}>Jan</Text>
                        {/* <View style={styles.underline } /> */}
                    </View>

                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.month}>Feb</Text>
                        <View style={styles.underline} />
                    </View>

                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.month}>March</Text>
                        {/* <View style={styles.underline } /> */}
                    </View>
                </View>
            </ImageBackground>

            {/* calendar */}
            <View style={styles.calendarWrap}>

            </View>
        </View>
    )
};

export default FamilyCalendarHome;

const styles = StyleSheet.create({
    headerTop: {
        ...Platform.select({
            ios: {
                height: _Height * 0.19,
            },
            android: {
                height: _Height * 0.23,
            }
        }),
    },
    navWrap: {
        marginHorizontal: 20,
        marginTop: 25,
        alignItems: "center",
        justifyContent: "space-between",
    },
    nav: {
        borderWidth: 1,
        borderColor: colors.white,
        width: 35,
        height: 35,
        borderRadius: 30,
    },
    navImg: {
        width: 25,
        height: 25,
        tintColor: colors.white,
    },
    bellWrap: {
        padding: 3,
    },
    bell: {
        width: 20,
        height: 20,
        tintColor: colors.black,
    },
    notiDot: {
        width: 8,
        height: 8,
        backgroundColor: colors.homeheader.belldot,
        borderRadius: 5,
        position: "absolute",
        right: 3,
        top: 3,
    },
    yearOnTop: {
        fontSize: 27,
        color: colors.white,
        fontFamily: fonts.bold,
    },
    months: {
        marginHorizontal: 30,
        marginTop: 30,
    },
    month: {
        fontSize: 27,
        color: colors.fchome.month,
        fontFamily: fonts.bold,
    },
    underline: {
        width: "60%",
        height: 3,
        borderRadius: 70,
        backgroundColor: colors.fchome.underline,
    },
    calendarWrap:{
        padding: 18.23,
        borderRadius: 13.67,
        backgroundColor: colors.white,
        borderWidth: 1.14,
        borderColor: colors.fchome.calendarborder,
        marginTop: 8,
        marginHorizontal: 4,
    }
});