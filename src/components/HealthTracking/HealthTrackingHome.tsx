import { FlatList, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { commonstyles } from '../../assets/css/CommonStyles';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../config/colors';
import { icons } from '../../config/icons';
import { _Height, _Width } from '../../config/staticVariables';
import { fonts } from '../../config/fonts';
import ToggleSwitch from 'toggle-switch-react-native';
import { images } from '../../config/images';

const HealthTrackingHome = ({ navigation }: { navigation: any }): JSX.Element => {
    const [isToggle, setIsToggle] = useState<boolean>(true);

    const getHeight = (i: number): number => {
        if (i === 0 || i === 1) {
            return 150;
        } else if (i === 2 || i === 4) {
            return 100;
        } else {
            return 220;
        }
    };

    return (
        <View style={[commonstyles.parent]}>
            {/* top header section */}
            <LinearGradient
                useAngle={true}
                angle={90}
                angleCenter={{ x: 0.4, y: 0 }}
                colors={colors.hthome.gdcolor}
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
                        <Text numberOfLines={2} style={styles.pageHeading}>Nutrition Finder</Text>
                    </View>

                    <View
                        style={[styles.menu, commonstyles.acjc]}
                    />
                </View>

                {/* circular Progress Bar */}
                <View style={{ width: 175, height: 180, borderWidth: 0, alignSelf: "center", marginTop: 20 }}>

                </View>

                {/* my analysis toggle */}
                <View style={[styles.analysisContainer, commonstyles.fdRow, commonstyles.acjsb]}>
                    <Text style={styles.analysisTxt}>My Analysis</Text>

                    <View style={commonstyles.acjc}>
                        <ToggleSwitch
                            isOn={isToggle}
                            // onColor={colors.addevent.toggleactive}
                            // offColor={colors.addevent.toggle}
                            onToggle={isOn => setIsToggle(isOn)}
                            size="medium"
                            thumbOnStyle={{ backgroundColor: colors.hthome.toggleactvthmb }}
                            trackOnStyle={{ backgroundColor: colors.hthome.togglebg }}
                            trackOffStyle={{ backgroundColor: colors.hthome.togglebg }}
                        />

                        <Text style={[styles.onOff, isToggle ? { left: 6 } : { right: 6 }]}>{isToggle ? "On" : "Off"}</Text>
                    </View>
                </View>
            </LinearGradient>

            {/* activity monitor */}
            <View style={[styles.activityMonitorWrap, commonstyles.parent]}>
                {/* <FlatList
                    data={[1, 1, 1, 1, 1]}
                    keyExtractor={(_, item) => item.toString()}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    columnWrapperStyle={[commonstyles.fdRow, { marginBottom: 20, justifyContent: "space-between" }]}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={[styles.activityCard, { height: getHeight(index) }]}
                        >
                            <Text>{index}</Text>
                        </TouchableOpacity>
                    )}
                /> */}

                <ScrollView
                    style={{ paddingTop: 10, marginBottom: Platform.OS === "ios" ? 25 : 5 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={[commonstyles.parent, commonstyles.fdRow, commonstyles.acjsb, { paddingBottom: 20 }]}>
                        <View style={{ rowGap: 20 }}>
                            <TouchableOpacity style={[styles.activityCard, { height: 200, backgroundColor: "#14CDD9" }]}>
                                <Text style={[styles.title, { color: colors.white }]}>Physical Activity</Text>

                                <View style={{}}>
                                    <Text style={[styles.value, { color: colors.white }]}>8500</Text>
                                    <Text style={[styles.unit, { color: "#09818E" }]}>steps</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.activityCard, { height: 160 }]}>
                                <Text style={styles.title}>Hydration</Text>

                                <View style={{}}>
                                    <Text style={styles.value}>450.72</Text>
                                    <Text style={styles.unit}>Kcal</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.activityCard, { height: 160 }]}>
                                <Text style={styles.title}>Sleep and Recovery</Text>

                                <View style={{}}>
                                    <Text style={styles.value}>08.32</Text>
                                    <Text style={styles.unit}>hours</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ rowGap: 20 }}>
                            <TouchableOpacity style={[styles.activityCard, { height: 200 }]}>
                                <Text style={styles.title}>Mental Well-being</Text>

                                <View style={{}}>
                                    <Text style={styles.value}>0.55</Text>
                                    <Text style={styles.unit}>liters</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.activityCard, { height: 340 }]}>
                                <Text style={styles.title}>Diet</Text>

                                <Image style={{ width: (_Width - 30) / 2, height: 100, marginLeft: -28 }} resizeMode='stretch' source={images.heartline} />

                                <View style={{}}>
                                    <Text style={styles.value}>105</Text>
                                    <Text style={styles.unit}>bpm</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
};

export default HealthTrackingHome;

const styles = StyleSheet.create({
    lgStyle: {
        width: "100%",
        ...Platform.select({
            ios: {
                height: _Height * 0.49,
            },
            android: {
                height: _Height * 0.53,
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
    analysisContainer: {
        marginHorizontal: 30,
        backgroundColor: colors.hthome.analysisbg,
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 15,
    },
    analysisTxt: {
        fontSize: 16,
        fontFamily: fonts.medium,
        color: colors.black,
    },
    onOff: {
        fontSize: 8,
        textTransform: "uppercase",
        color: colors.black,
        fontFamily: fonts.semibold,
        position: "absolute",
        top: 6,
    },
    activityMonitorWrap: {
        backgroundColor: colors.hthome.bgcolor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
        paddingHorizontal: 25,
        paddingTop: 25,
    },
    activityCard: {
        borderWidth: 2,
        borderColor: colors.hthome.activitycardborder,
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        width: (_Width - 75) / 2,
        borderRadius: 30,
        padding: 15,
        justifyContent: "space-between"
    },
    title: {
        fontSize: 16,
        fontFamily: fonts.medium,
        color: colors.black,
    },
    value: {
        fontSize: 16,
        fontFamily: fonts.medium,
        color: colors.black,
    },
    unit: {
        fontSize: 11,
        fontFamily: fonts.regular,
        color: "#A7A7A7",
    },
});