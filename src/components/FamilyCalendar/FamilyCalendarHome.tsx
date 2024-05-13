import { FlatList, Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { commonstyles } from '../../assets/css/CommonStyles';
import colors from '../../config/colors';
import { icons } from '../../config/icons';
import { _Height, _Width, monthsArray } from '../../config/staticVariables';
import { fonts } from '../../config/fonts';
import { images } from '../../config/images';
import Calendar from './Calendar';
import { Date_State } from '../../config/CustomTypes';
import { getImagUrl, getMonthArray } from '../../utility/UtilityFunctions';
import { useSelector } from 'react-redux';


const FamilyCalendarHome = ({ navigation }: { navigation: any }) => {
    const { user } = useSelector((state: any) => state.userSlice);
    const currentDay: number = new Date().getDate();
    const [currentDate, setCurrentDate] = useState<Date_State>(
        {
            currentMonth: new Date().toLocaleString('en-US', { month: 'long' }),
            currentYear: new Date().getFullYear(),
            currentMonthIndex: new Date().getMonth(),
        }
    );

    const monthData = getMonthArray(currentDate.currentMonthIndex);

    const handleDatePress = (date: number) => {
        console.log("date==>", date);

    };

    const getItemLayout = (_: any, index: number) => ({
        length: 110,
        offset: 90 * index,
        index
    });

    useEffect(() => {
        // console.log("page rendered==>");
    }, []);

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

                {/* month view */}
                <View style={[styles.months, commonstyles.fdRow, commonstyles.acjsb]}>
                    <FlatList
                        data={monthsArray}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        initialScrollIndex={currentDate.currentMonthIndex}
                        getItemLayout={getItemLayout}
                        // pagingEnabled
                        keyExtractor={(_, i) => i.toString()}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                style={{ alignItems: "center", paddingHorizontal: 20, height: 55 }}
                                onPress={() => setCurrentDate({ ...currentDate, currentMonthIndex: index })}
                            >
                                <Text style={[styles.month, { color: item.monthIndex === currentDate.currentMonthIndex ? colors.white : colors.fchome.month }]}>
                                    {item.monthName}
                                </Text>
                                {item.monthIndex === currentDate.currentMonthIndex ? <View style={styles.underline} /> : null}
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </ImageBackground>

            {/* body */}
            <View style={commonstyles.parent}>
                <FlatList
                    data={[1]}
                    scrollEnabled
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={() => (
                        <View>
                            {/* calendar */}
                            <View style={styles.calendarWrap}>
                                <Calendar data={monthData} currentDay={currentDay} monthIndex={currentDate.currentMonthIndex} onDayPress={handleDatePress} navigation={navigation} />
                            </View>

                            {/* events */}
                            <View style={{ marginTop: 30, flex: 1 }}>
                                {/* head */}
                                <View>
                                    <Text style={[styles.eventHeading, { textAlign: "center", }]}>
                                        Today Event
                                    </Text>

                                    <TouchableOpacity
                                        style={[styles.addEventBtn, commonstyles.acjc, { marginRight: 20, alignSelf: "flex-end", marginTop: Platform.OS === "android" ? -37 : -32 }]}
                                        onPress={() => navigation.navigate("addevent")}
                                    >
                                        <Image source={icons.plus} style={styles.plus} />
                                    </TouchableOpacity>
                                </View>

                                {/* event content */}
                                <View style={[{ marginTop: 20, marginHorizontal: 20 }]}>
                                    <FlatList
                                        data={[{ bg: "#B0C2FF", time: "9:30" }, { bg: "#F6BDFF", time: "10:00" }, { bg: "#FF9B96", time: "10:30" }]}
                                        keyExtractor={(_, index) => index.toString()}
                                        renderItem={({ item, index }) => (
                                            <>
                                                <View style={[commonstyles.fdRow, { columnGap: 20 }]}>
                                                    <View style={{ marginTop: -10 }}>
                                                        <Text style={styles.hour}>{item.time}</Text>
                                                        <Text style={styles.hourFormat}>am</Text>
                                                    </View>

                                                    <View style={{ rowGap: 15, flex: 1 }}>
                                                        <View style={styles.topLine} />

                                                        <View style={[styles.contentBox, { backgroundColor: item.bg }]}>

                                                        </View>
                                                    </View>
                                                </View>

                                                {index === 2 ? null : <View style={{ marginBottom: 40 }} />}
                                            </>
                                        )}
                                    />
                                </View>
                            </View>

                            {/* Remainder & todo */}
                            <View style={{ marginTop: 20, }}>
                                {/* head */}
                                <View style={[commonstyles.fdRow, commonstyles.acjsb, { marginHorizontal: 20, }]}>
                                    <View>
                                        <Text style={[styles.eventHeading, { color: colors.black }]}>Reminder / Todo</Text>
                                        <Text style={styles.reminderSubHeading}>Dont forget schedule for tomorrow</Text>
                                    </View>

                                    <TouchableOpacity
                                        style={[styles.addEventBtn, commonstyles.acjc]}
                                        onPress={() => navigation.navigate("addtodo")}
                                    >
                                        <Image source={icons.plus} style={styles.plus} />
                                    </TouchableOpacity>
                                </View>

                                {/* todo content */}
                                <View style={{ marginHorizontal: 20, marginTop: 15, }}>
                                    <FlatList
                                        data={["#C5FFB0", "#BDEAFF", "#C5FFB0"]}
                                        keyExtractor={(_, index) => index.toString()}
                                        renderItem={({ item, index }) => (
                                            <TouchableOpacity
                                                style={[styles.remTodoWrap, commonstyles.fdRow, { backgroundColor: item }]}
                                            >
                                                <Image style={styles.reminderImg} source={user?.profile_img ? { uri: getImagUrl(user?.profile_img) } : icons.man} />

                                                <View style={[commonstyles.parent, { rowGap: Platform.OS === "android" ? 4 : 8 }]}>
                                                    <Text style={styles.reminderTodoHeading} numberOfLines={1}>
                                                        Helping a local business reinvent itself
                                                    </Text>

                                                    <View style={[commonstyles.fdRow, { alignItems: "center", columnGap: 6 }]}>
                                                        <Image style={styles.timer} source={icons.timer} />
                                                        <Text style={styles.time}>12:30 pm - 2:00 pm</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    )
};

export default FamilyCalendarHome;

const styles = StyleSheet.create({
    headerTop: {
        ...Platform.select({
            ios: {
                height: _Height * 0.22,
            },
            android: {
                height: _Height * 0.25,
            }
        }),
    },
    navWrap: {
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "space-between",
        ...Platform.select({
            ios: { marginTop: 60, },
            android: { marginTop: 50, }
        })
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
        fontFamily: fonts.bold,
    },
    underline: {
        width: "60%",
        height: 3,
        borderRadius: 70,
        backgroundColor: colors.fchome.underline,
        ...Platform.select({
            ios: {
                marginTop: 5
            },
            android: {}
        })
    },
    calendarWrap: {
        padding: 18.23,
        borderRadius: 13.67,
        backgroundColor: colors.white,
        borderWidth: 1.14,
        borderColor: colors.fchome.calendarborder,
        marginTop: 8,
        marginHorizontal: 4,
    },
    addEventBtn: {
        backgroundColor: colors.fchome.addeventbg,
        width: 40,
        height: 40,
        borderRadius: 30,
    },
    plus: {
        width: 15,
        height: 15,
        tintColor: colors.white,
    },
    eventHeading: {
        fontSize: 18,
        color: colors.fchome.eventheading,
        fontFamily: fonts.semibold,
    },
    reminderSubHeading: {
        fontSize: 12,
        color: colors.black,
        fontFamily: fonts.regular,
    },
    remTodoWrap: {
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        marginBottom: 10,
        columnGap: 10,
    },
    reminderImg: {
        width: 35,
        height: 35,
        borderRadius: 9.03,
    },
    timer: {
        width: 10,
        height: 10,
    },
    time: {
        fontSize: 8,
        fontFamily: fonts.medium,
        color: colors.black,
    },
    reminderTodoHeading: {
        fontSize: 10,
        fontFamily: fonts.medium,
        color: colors.black,
    },
    hour: {
        fontSize: 16,
        fontFamily: fonts.semibold,
        color: colors.black,
    },
    hourFormat: {
        fontSize: 14,
        fontFamily: fonts.medium,
        color: colors.black,
    },
    topLine: {
        borderWidth: 1,
        borderColor: colors.fchome.eventtimeline,
        width: "100%",
    },
    contentBox: {
        minHeight: 80,
        borderRadius: 10,
    },
});