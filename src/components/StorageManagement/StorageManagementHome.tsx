import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../config/colors';
import { commonstyles } from '../../assets/css/CommonStyles';
import LinearGradient from 'react-native-linear-gradient';
import { icons } from '../../config/icons';
import { _Height } from '../../config/staticVariables';
import { fonts } from '../../config/fonts';

const StorageManagementHome = ({ navigation }: { navigation: any }): JSX.Element => {
    return (
        <View style={[commonstyles.parent, { backgroundColor: colors.dsmhome.bgcolor }]}>
            {/* top header section */}
            <LinearGradient
                useAngle={true}
                angle={90}
                angleCenter={{ x: 0.4, y: 0 }}
                colors={colors.dsmhome.gdcolor}
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
                        <Text numberOfLines={2} style={styles.pageHeading}>Manage Your File</Text>
                    </View>

                    <View
                        style={[styles.menu, commonstyles.acjc]}
                    />
                </View>
            </LinearGradient>

            {/* google drive */}
            <LinearGradient
                useAngle={true}
                angle={90}
                angleCenter={{ x: 0.4, y: 0 }}
                colors={colors.dsmhome.gdcolor}
                style={styles.driveWrap}
            >
                <View style={[commonstyles.fdRow, { alignItems: "flex-end", columnGap: 20 }]}>
                    <View style={[styles.dImgWrap, commonstyles.acjc]}>
                        <Image style={styles.drive} source={icons.drive} />
                    </View>

                    <View>
                        <Text style={styles.dTxt}>Google Drive</Text>
                        <Text style={styles.dSubTxt}>Manage Your File</Text>
                    </View>
                </View>

                <View style={styles.memoProgressWrap}>
                    <View style={[commonstyles.fdRow, commonstyles.acjsb, { marginHorizontal: 5 }]}>
                        <Text style={styles.memoryTxt}>33 GB Used</Text>
                        <Text style={styles.memoryTxt}>95 GB Free</Text>
                    </View>

                    <View style={styles.progressWrap}>
                        <View style={[styles.progress, { width: "25.78%" }]} />
                    </View>
                </View>
            </LinearGradient>

            <View style={[commonstyles.parent, { marginHorizontal: 25, marginTop: 30 }]}>
                {/* heading */}
                <View style={[commonstyles.fdRow, commonstyles.acjsb]}>
                    <Text style={styles.recentFiles}>Recent Files</Text>

                    <TouchableOpacity
                        style={{ paddingHorizontal: 3, paddingVertical: 5 }}
                    >
                        <Text style={styles.seeMore}>See More</Text>
                    </TouchableOpacity>
                </View>

                {/* files */}
                <View style={[styles.filesContainer, commonstyles.parent]}>
                    <FlatList
                        data={[1, 1, 1, 1, 1, 1]}
                        style={{ paddingTop: 10 }}
                        keyExtractor={(_, item) => item.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View
                                style={[styles.files, commonstyles.fdRow]}
                            >
                                <TouchableOpacity
                                    style={[styles.playWrap, commonstyles.acjc]}
                                >
                                    <Image style={styles.play} source={icons.play} />
                                </TouchableOpacity>

                                <View style={[commonstyles.parent, {}]}>
                                    <Text numberOfLines={1} style={styles.fileHeading}>Tutorial Part - 1</Text>
                                    <Text style={styles.fileSubHeading}>45:48 mints</Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
        </View>
    )
};

export default StorageManagementHome;

const styles = StyleSheet.create({
    lgStyle: {
        width: "100%",
        ...Platform.select({
            ios: {
                height: _Height * 0.16,
            },
            android: {
                height: _Height * 0.17,
            }
        }),
    },
    navWrap: {
        marginHorizontal: 20,
        ...Platform.select({
            ios: { marginTop: 70, },
            android: { marginTop: 60, }
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
    pageHeading: {
        ...Platform.select({
            ios: { fontSize: 22, },
            android: { fontSize: 20, }
        }),
        color: colors.white,
        fontFamily: fonts.semibold,
        textAlign: "center",
    },
    driveWrap: {
        marginTop: 30,
        marginHorizontal: 20,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 30,
    },
    dImgWrap: {
        width: 60,
        height: 60,
        backgroundColor: colors.white,
        borderRadius: 60,
    },
    drive: {
        width: 40,
        height: 40,
    },
    dTxt: {
        fontSize: 22,
        fontFamily: fonts.medium,
        color: colors.white,
    },
    dSubTxt: {
        fontSize: 12,
        fontFamily: fonts.regular,
        color: colors.white,
        marginTop: -5
    },
    memoryTxt: {
        fontSize: 10,
        fontFamily: fonts.medium,
        color: colors.white,
    },
    progressWrap: {
        backgroundColor: colors.white,
        height: 11,
        borderRadius: 42,
    },
    progress: {
        backgroundColor: colors.dsmhome.progress,
        height: 11,
        borderRadius: 42,
    },
    memoProgressWrap: {
        marginHorizontal: 10,
        marginTop: 40,
        ...Platform.select({
            ios: {
                rowGap: 5,
                marginBottom: 6,
            },
            android: {
                rowGap: 3,
                marginBottom: 10,
            },
        }),
    },
    recentFiles: {
        fontSize: 25,
        color: colors.black,
        fontFamily: fonts.semibold,
    },
    seeMore: {
        fontSize: 15,
        color: colors.black,
        fontFamily: fonts.medium,
    },
    filesContainer: {
        marginTop: 10,
        ...Platform.select({
            ios: { marginBottom: 25 },
            android: { marginBottom: 5 }
        }),
        marginHorizontal: 5,
    },
    files: {
        backgroundColor: colors.white,
        borderRadius: 8,
        shadowColor: colors.dsmhome.fileshadow,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: "center",
        columnGap: 20,
    },
    playWrap: {
        backgroundColor: colors.white,
        borderRadius: 8,
        width: 40,
        height: 40,
        shadowColor: colors.dsmhome.playshadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.65,
        shadowRadius: 3.84,
        elevation: 5,
    },
    play: {
        width: 20,
        height: 20,
    },
    fileHeading: {
        fontSize: 15,
        color: colors.black,
        fontFamily: fonts.medium,
    },
    fileSubHeading: {
        fontSize: 12,
        color: colors.black,
        fontFamily: fonts.medium,
    },
});