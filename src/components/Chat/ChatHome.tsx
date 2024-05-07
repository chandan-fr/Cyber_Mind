import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { commonstyles } from '../../assets/css/CommonStyles'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../../config/colors'
import { icons } from '../../config/icons'
import { _Height } from '../../config/staticVariables'
import { fonts } from '../../config/fonts'
import Messages from './Messages'
import Online from './Online'
import Group from './Group'

const ChatHome = ({ navigation }: { navigation: any }): JSX.Element => {
    const [isSelected, setIsSelected] = useState<string>("messages");

    const handleMenuItem = (menuName: string) => {
        setIsSelected(menuName);
    };

    return (
        <View style={[commonstyles.parent, { backgroundColor: colors.chathome.bgcolor }]}>
            {/* top header section */}
            <LinearGradient
                useAngle={true}
                angle={90}
                angleCenter={{ x: 0.4, y: 0 }}
                colors={colors.chathome.gdcolor}
                style={styles.lgStyle}
            >
                <View style={{ marginHorizontal: 30, rowGap: 20 }}>
                    {/* top text */}
                    <View style={[styles.topMenuWrap, commonstyles.fdRow]}>
                        <TouchableOpacity
                            style={[styles.menuWrap, commonstyles.acjc]}
                            onPress={() => navigation.openDrawer()}
                        >
                            <Image source={icons.menu} style={styles.menu} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ padding: 2 }}
                        >
                            <Image source={icons.search} style={styles.search} />
                        </TouchableOpacity>
                    </View>

                    {/* menu bar */}
                    <View style={[commonstyles.fdRow, styles.menuBarWrap]}>
                        <TouchableOpacity
                            style={[styles.menuItemWrap, commonstyles.acjc]}
                            onPress={() => handleMenuItem("messages")}
                        >
                            <View>
                                <Text style={styles.menuItemTxt}>Messages</Text>
                                {isSelected === "messages" ? <View style={styles.underline} /> : null}
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.menuItemWrap, commonstyles.acjc]}
                            onPress={() => handleMenuItem("online")}
                        >
                            <View>
                                <Text style={styles.menuItemTxt}>Online</Text>
                                {isSelected === "online" ? <View style={styles.underline} /> : null}
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.menuItemWrap, commonstyles.acjc]}
                            onPress={() => handleMenuItem("group")}
                        >
                            <View>
                                <Text style={styles.menuItemTxt}>Group</Text>
                                {isSelected === "group" ? <View style={[styles.underline, { backgroundColor: colors.chathome.groupunderline }]} /> : null}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>

            {/* menu content section */}
            <View style={[commonstyles.parent]}>
                {isSelected === "messages" ? <Messages /> : null}
                {isSelected === "online" ? <Online /> : null}
                {isSelected === "group" ? <Group /> : null}
            </View>
        </View>
    )
};

export default ChatHome;

const styles = StyleSheet.create({
    lgStyle: {
        width: "100%",
        ...Platform.select({
            ios: {
                height: _Height * 0.21,
            },
            android: {
                height: _Height * 0.24,
            }
        }),
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    topMenuWrap: {
        marginTop: 25,
        alignItems: "center",
        justifyContent: "space-between",
    },
    menuWrap: {
        width: 45,
        height: 45,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: colors.white,
    },
    menu: {
        width: 30,
        height: 30,
        tintColor: colors.white,
    },
    search: {
        width: 30,
        height: 30,
        tintColor: colors.white,
    },
    menuBarWrap: {
        marginTop: 20,
        marginHorizontal: 5,
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    menuItemWrap: {
        minWidth: 90,
        columnGap: 15,
    },
    menuItemTxt: {
        color: colors.white,
        fontSize: 15,
        fontFamily: fonts.medium,
    },
    underline: {
        width: 27,
        height: 4,
        backgroundColor: colors.chathome.underline,
        alignSelf: "flex-start",
        borderRadius: 11,
        marginTop: 5,
    },
});