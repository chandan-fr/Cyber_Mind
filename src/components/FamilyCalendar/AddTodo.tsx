import { Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { _Height } from '../../config/staticVariables';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';
import { commonstyles } from '../../assets/css/CommonStyles';
import { images } from '../../config/images';
import { icons } from '../../config/icons';

const AddTodo = ({ navigation }: { navigation: any }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            tabBarVisible: false,
        });
    }, [navigation]);


    return (
        <View style={[commonstyles.parent, { backgroundColor: colors.addevent.bgcolor }]}>
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
                        <Text style={styles.pageHeading}>To Do</Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.menu, commonstyles.acjc]}
                    >
                        <Image source={icons.dots} style={styles.menuImg} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            {/* body */}
            <View>
                
            </View>
        </View>
    )
};


export default AddTodo;

const styles = StyleSheet.create({
    headerTop: {
        ...Platform.select({
            ios: {
                height: _Height * 0.13,
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
        borderRadius: 30,
    },
    menuImg: {
        width: 20,
        height: 20,
        tintColor: colors.white,
    },
    pageHeading: {
        fontSize: 26,
        color: colors.white,
        fontFamily: fonts.semibold,
    },
});