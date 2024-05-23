import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { commonstyles } from '../../assets/css/CommonStyles';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';
import { _Height } from '../../config/staticVariables';
import { icons } from '../../config/icons';
import LinearGradient from 'react-native-linear-gradient';


const AllTransaction = ({ navigation }: { navigation: any }) => {
    return (
        <View style={commonstyles.parent}>
            {/* top header section */}
            <LinearGradient
                useAngle={true}
                angle={90}
                angleCenter={{ x: 0.5, y: 0 }}
                colors={colors.transaction.gdcolor}
                style={styles.lgStyle}
            >
                {/* navigation */}
                <View style={[styles.navWrap, commonstyles.fdRow]}>
                    <TouchableOpacity
                        style={[styles.nav, commonstyles.acjc]}
                        onPress={() => navigation.goBack()}
                    >
                        <Image source={icons.arrow} style={styles.navImg} />
                    </TouchableOpacity>

                    <View style={commonstyles.parent}>
                        <Text numberOfLines={2} style={styles.pageHeading}>All Transaction</Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.menu, commonstyles.acjc]}
                    >
                        <Image source={icons.dots} style={styles.menuImg} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            {/* body */}
            <View style={[commonstyles.parent, { marginBottom: Platform.OS === "android" ? 5 : 20 }]}>

            </View>

            {/* Download Button */}
            <TouchableOpacity
                style={[styles.downloadBtn, commonstyles.acjc]}
            >
                <Image style={styles.download} source={icons.save} />
            </TouchableOpacity>
        </View>
    )
};

export default AllTransaction;

const styles = StyleSheet.create({
    lgStyle: {
        width: "100%",
        ...Platform.select({
            ios: {
                height: _Height * 0.14,
            },
            android: {
                height: _Height * 0.14,
            }
        }),
    },
    navWrap: {
        marginHorizontal: 20,
        ...Platform.select({
            ios: { marginTop: 60, },
            android: { marginTop: 50, }
        }),
        alignItems: "center",
        justifyContent: "space-between",
        columnGap: 20,
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
    menu: {
        width: 30,
        height: 30,
    },
    menuImg: {
        width: 20,
        height: 20,
        tintColor: colors.white,
    },
    pageHeading: {
        ...Platform.select({
            ios: { fontSize: 22, },
            android: { fontSize: 20, }
        }),
        color: colors.white,
        fontFamily: fonts.semibold,
        textAlign: "center",
    },
    dotmenuWrap: {
        position: "absolute",
        right: 0,
        top: 10,
    },
    downloadBtn: {
        backgroundColor: colors.alltnx.downloadbg,
        width: 50,
        height: 50,
        borderRadius: 40,
        position: "absolute",
        ...Platform.select({
            ios: {
                bottom: 100,
                right: 40,
            },
            android: {
                bottom: 50,
                right: 20,
            }
        }),
        shadowColor: colors.alltnx.downloadbg,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.87,
        shadowRadius: 5.65,
        elevation: 6,
    },
    download: {
        width: 28,
        height: 28,
        tintColor: colors.white,
    },
});