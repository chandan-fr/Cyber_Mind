import { Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { commonstyles } from '../../assets/css/CommonStyles';
import colors from '../../config/colors';
import { images } from '../../config/images';
import { _Height } from '../../config/staticVariables';
import { icons } from '../../config/icons';
import { fonts } from '../../config/fonts';
import ToggleSwitch from 'toggle-switch-react-native';
import { Event_State } from '../../config/CustomTypes';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { getFormatedDateTime } from '../../utility/UtilityFunctions';


const AddEvent = ({ navigation }: { navigation: any }) => {
    const [alert, setAlert] = useState<boolean>(false);
    const [repeat, setRepeat] = useState<boolean>(false);
    const [toggle, setToggle] = useState<boolean>(false);
    const [alertOptn, setAlertOptn] = useState<string>("optn1");
    const [repeatOptn, setRepeatOptn] = useState<string>("Daily");
    const [mode, setMode] = useState<any>("");
    const [startTimeValue, setStartTimeValue] = useState<Event_State>({ date: "", time: "", open: false });
    const [endTimeValue, setEndTimeValue] = useState<Event_State>({ date: "", time: "", open: false });

    const onChange = (event: DateTimePickerEvent, date: Date | undefined) => {
        if (mode === "date") {
            if (startTimeValue.open) {
                setStartTimeValue({ ...startTimeValue, date: getFormatedDateTime(date, mode), open: false });
            }
            if (endTimeValue.open) {
                setEndTimeValue({ ...endTimeValue, date: getFormatedDateTime(date, mode), open: false });
            }
        } else {
            if (startTimeValue.open) {
                setStartTimeValue({ ...startTimeValue, time: getFormatedDateTime(date, mode), open: false });
            }
            if (endTimeValue.open) {
                setEndTimeValue({ ...endTimeValue, time: getFormatedDateTime(date, mode), open: false });
            }
        }
    };

    const openCalendarModal = (calendarMode: string, startOrEnd: string) => {
        if (calendarMode === "date") {
            setMode(calendarMode);
            if (startOrEnd === "start") setStartTimeValue({ ...startTimeValue, open: true });
            else setEndTimeValue({ ...endTimeValue, open: true });
        } else {
            setMode(calendarMode);
            if (startOrEnd === "start") setStartTimeValue({ ...startTimeValue, open: true });
            else setEndTimeValue({ ...endTimeValue, open: true });
        }
    };


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
                        <Text style={styles.pageHeading}>Create Event</Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.menu, commonstyles.acjc]}
                    >
                        <Image source={icons.dots} style={styles.menuImg} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            {/* body */}
            <KeyboardAvoidingView
                style={commonstyles.parent}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
            >
                <View style={commonstyles.parent}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ paddingTop: 25, rowGap: 30 }}>
                            {/* 1st block */}
                            <View style={styles.wrapper}>
                                {/* event name */}
                                <TextInput
                                    placeholder='Event Name'
                                    placeholderTextColor={colors.addevent.placeholder}
                                    style={styles.inputBox}
                                />

                                <View style={styles.hr} />

                                {/* location */}
                                <TextInput
                                    placeholder='Location'
                                    placeholderTextColor={colors.addevent.placeholder}
                                    style={styles.inputBox}
                                />

                                <View style={styles.hr} />

                                {/* alert */}
                                <View style={[styles.alertWrap, commonstyles.fdRow, commonstyles.acjsb]}>
                                    <Text style={styles.alert}>Alert</Text>

                                    <TouchableOpacity
                                        style={[styles.alertBtn, commonstyles.acjc]}
                                        onPress={() => setAlert(!alert)}
                                    >
                                        <Image
                                            style={[styles.dropdown, { transform: [{ rotate: alert ? "-90deg" : "180deg" }] }]}
                                            source={icons.arrow}
                                        />
                                    </TouchableOpacity>
                                </View>

                                {/* alert options */}
                                {alert && <View style={[styles.alertOptnWrap]}>
                                    <View style={[commonstyles.fdRow, commonstyles.acjsb, { columnGap: 15 }]}>
                                        <TouchableOpacity
                                            style={[styles.alertOption, commonstyles.fdRow, commonstyles.parent]}
                                            onPress={() => setAlertOptn("optn1")}
                                        >
                                            <Image style={styles.alertOptnImg} source={alertOptn === "optn1" ? icons.checkcircle : icons.checkcirclew} />
                                            <Text style={styles.alertOptnTxt}>At time of event</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.alertOption, commonstyles.fdRow, commonstyles.parent]}
                                            onPress={() => setAlertOptn("optn2")}
                                        >
                                            <Image style={styles.alertOptnImg} source={alertOptn === "optn2" ? icons.checkcircle : icons.checkcirclew} />
                                            <Text style={styles.alertOptnTxt}>10 mins before</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={[commonstyles.fdRow, commonstyles.acjsb, { columnGap: 15 }]}>
                                        <TouchableOpacity
                                            style={[styles.alertOption, commonstyles.fdRow, commonstyles.parent]}
                                            onPress={() => setAlertOptn("optn3")}
                                        >
                                            <Image style={styles.alertOptnImg} source={alertOptn === "optn3" ? icons.checkcircle : icons.checkcirclew} />
                                            <Text style={styles.alertOptnTxt}>1 hour before</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.alertOption, commonstyles.fdRow, commonstyles.parent]}
                                            onPress={() => setAlertOptn("optn4")}
                                        >
                                            <Image style={styles.alertOptnImg} source={alertOptn === "optn4" ? icons.checkcircle : icons.checkcirclew} />
                                            <Text style={styles.alertOptnTxt}>1 day before</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>}
                            </View>

                            {/* 2nd block */}
                            <View style={styles.wrapper}>
                                {/* all day */}
                                <View style={[styles.alertWrap, commonstyles.fdRow, commonstyles.acjsb]}>
                                    <Text style={styles.alert}>All-Day</Text>

                                    <ToggleSwitch
                                        isOn={toggle}
                                        onColor={colors.addevent.toggleactive}
                                        offColor={colors.addevent.toggle}
                                        onToggle={isOn => setToggle(isOn)}
                                        size="medium"
                                    />
                                </View>

                                <View style={styles.hr} />

                                {/* start event */}
                                <View style={[styles.alertWrap, commonstyles.fdRow, commonstyles.acjsb, { columnGap: 10 }]}>
                                    <Text style={[styles.alert, { flex: 0.3 }]}>Start</Text>

                                    <View style={[commonstyles.parent, commonstyles.fdRow, commonstyles.acjsb]}>
                                        <TouchableOpacity
                                            style={[commonstyles.fdRow, { flex: 1, alignItems: "center" }]}
                                            onPress={() => openCalendarModal('date', "start")}
                                        >
                                            <Image style={styles.eventTimeImg} source={icons.calendar} />

                                            <TextInput
                                                placeholder='Enter Date'
                                                placeholderTextColor={colors.addevent.placeholder}
                                                style={styles.eventInput}
                                                value={startTimeValue.date}
                                                editable={false}
                                            />
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[commonstyles.fdRow, { flex: 0.6, alignItems: "center" }]}
                                            onPress={() => openCalendarModal('time', "start")}
                                        >
                                            <Image style={styles.eventTimeImg} source={icons.timer} />

                                            <TextInput
                                                placeholder='Time'
                                                placeholderTextColor={colors.addevent.placeholder}
                                                style={styles.eventInput}
                                                value={startTimeValue.time}
                                                editable={false}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.hr} />

                                {/* end event */}
                                <View style={[styles.alertWrap, commonstyles.fdRow, commonstyles.acjsb, { columnGap: 10 }]}>
                                    <Text style={[styles.alert, { flex: 0.3 }]}>End</Text>

                                    <View style={[commonstyles.parent, commonstyles.fdRow, commonstyles.acjsb]}>
                                        <TouchableOpacity
                                            style={[commonstyles.fdRow, { flex: 1, alignItems: "center" }]}
                                            onPress={() => openCalendarModal('date', "end")}
                                        >
                                            <Image style={styles.eventTimeImg} source={icons.calendar} />

                                            <TextInput
                                                placeholder='Enter Date'
                                                placeholderTextColor={colors.addevent.placeholder}
                                                style={styles.eventInput}
                                                value={endTimeValue.date}
                                                editable={false}
                                            />
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[commonstyles.fdRow, { flex: 0.6, alignItems: "center" }]}
                                            onPress={() => openCalendarModal('time', "end")}
                                        >
                                            <Image style={styles.eventTimeImg} source={icons.timer} />

                                            <TextInput
                                                placeholder='Time'
                                                placeholderTextColor={colors.addevent.placeholder}
                                                style={styles.eventInput}
                                                value={endTimeValue.time}
                                                editable={false}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.hr} />

                                {/* repeat */}
                                <View style={[styles.alertWrap, commonstyles.fdRow, commonstyles.acjsb]}>
                                    <Text style={styles.alert}>Repeat</Text>

                                    <TouchableOpacity
                                        style={[styles.alertBtn, commonstyles.acjc]}
                                        onPress={() => setRepeat(!repeat)}
                                    >
                                        <Image
                                            style={[styles.dropdown, { transform: [{ rotate: repeat ? "-90deg" : "180deg" }] }]}
                                            source={icons.arrow}
                                        />
                                    </TouchableOpacity>
                                </View>

                                {/* repeat options */}
                                {repeat && <View style={[styles.repeatOptnWrap]}>
                                    <View style={[commonstyles.fdRow, commonstyles.acjsb, {}]}>
                                        <TouchableOpacity
                                            style={[repeatOptn === "Daily" ? styles.repeatOptionActv : styles.repeatOption, commonstyles.fdRow, commonstyles.acjc]}
                                            onPress={() => setRepeatOptn("Daily")}
                                        >
                                            <Text style={repeatOptn === "Daily" ? styles.repeatOptnTxtActv : styles.repeatOptnTxt}>Daily</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[repeatOptn === "Weekly" ? styles.repeatOptionActv : styles.repeatOption, commonstyles.fdRow, commonstyles.acjc]}
                                            onPress={() => setRepeatOptn("Weekly")}
                                        >
                                            <Text style={repeatOptn === "Weekly" ? styles.repeatOptnTxtActv : styles.repeatOptnTxt}>Weekly</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[repeatOptn === "Monthly" ? styles.repeatOptionActv : styles.repeatOption, commonstyles.fdRow, commonstyles.acjc]}
                                            onPress={() => setRepeatOptn("Monthly")}
                                        >
                                            <Text style={repeatOptn === "Monthly" ? styles.repeatOptnTxtActv : styles.repeatOptnTxt}>Monthly</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>}
                            </View>

                            {/* 3rd block */}
                            <View style={styles.wrapper}>
                                {/* url */}
                                <TextInput
                                    placeholder='URL'
                                    placeholderTextColor={colors.addevent.placeholder}
                                    style={styles.inputBox}
                                />

                                <View style={styles.hr} />

                                {/* Notes */}
                                <TextInput
                                    placeholder='Notes'
                                    placeholderTextColor={colors.addevent.placeholder}
                                    style={styles.notesBox}
                                    multiline={true}
                                    numberOfLines={3}
                                />
                            </View>

                            {
                                startTimeValue.open || endTimeValue.open ?
                                    <DateTimePicker
                                        value={new Date()}
                                        mode={mode}
                                        is24Hour={false}
                                        onChange={onChange}
                                    />
                                    :
                                    null
                            }
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>

            {/* footer section */}
            <View style={[commonstyles.fdRow, commonstyles.acjsb, { marginHorizontal: 25, marginTop: 25, marginBottom: Platform.OS === "android" ? 10 : 5 }]}>
                <TouchableOpacity
                    style={[styles.closeBtn, commonstyles.acjc]}
                >
                    <Image style={styles.close} source={icons.close} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.saveBtn, commonstyles.acjc]}
                >
                    <Text style={styles.save}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default AddEvent;

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
    wrapper: {
        shadowColor: colors.addevent.wrappershadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        backgroundColor: colors.addevent.wrapperbg,
        marginHorizontal: 20,
        borderRadius: 18,
        paddingVertical: 12,
    },
    inputBox: {
        color: colors.black,
        height: 45,
        fontSize: 16,
        fontFamily: fonts.regular,
        marginHorizontal: 15,
    },
    notesBox: {
        color: colors.black,
        fontSize: 16,
        fontFamily: fonts.regular,
        marginHorizontal: 15,
        textAlignVertical: "top",
    },
    hr: {
        borderWidth: 1,
        borderColor: colors.addevent.hr,
        marginVertical: 3,
    },
    alertWrap: {
        height: 45,
        marginHorizontal: 15,
    },
    alert: {
        color: colors.addevent.placeholder,
        fontSize: 16,
        fontFamily: fonts.regular,
        ...Platform.select({
            ios: {},
            android: { marginLeft: 3, }
        }),
    },
    alertBtn: {
        paddingLeft: 5,
    },
    dropdown: {
        width: 30,
        height: 30,
        tintColor: colors.addevent.dropdown,
    },
    alertOptnWrap: {
        rowGap: 20,
        marginHorizontal: 30,
        marginTop: 15,
        marginBottom: 10,
    },
    alertOptnImg: {
        width: 15,
        height: 15,
        ...Platform.select({
            ios: {},
            android: { marginBottom: 3 },
        }),
    },
    alertOption: {
        alignItems: "center",
        columnGap: 10,
    },
    alertOptnTxt: {
        fontSize: 12,
        fontFamily: fonts.medium,
        color: colors.black,
    },
    repeatOptnWrap: {
        marginHorizontal: 30,
        marginTop: 15,
        marginBottom: 10,
    },
    repeatOption: {
        columnGap: 10,
        backgroundColor: colors.addevent.repeatbtnbg,
        width: 75,
        paddingVertical: 5,
        borderRadius: 19,
    },
    repeatOptionActv: {
        columnGap: 10,
        backgroundColor: colors.addevent.repeatbtnbgactv,
        width: 75,
        paddingVertical: 5,
        borderRadius: 19,
        shadowColor: colors.addevent.repeatbtnshadow,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 6,
    },
    repeatOptnTxt: {
        fontSize: 12,
        fontFamily: fonts.medium,
        color: colors.addevent.repeatbtntxt,
    },
    repeatOptnTxtActv: {
        fontSize: 12,
        fontFamily: fonts.medium,
        color: colors.white,
    },
    eventInput: {
        fontSize: 12,
        fontFamily: fonts.medium,
        ...Platform.select({
            ios: {},
            android: { paddingTop: 3, paddingBottom: 0, height: 30, }
        }),
        flex: 1,
        color: colors.black,
    },
    eventTimeImg: {
        width: 20,
        height: 20,
        tintColor: colors.addevent.repeatbtnbgactv,
    },
    close: {
        width: 15,
        height: 15,
        tintColor: colors.white,
    },
    closeBtn: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: colors.addevent.close,
    },
    saveBtn: {
        backgroundColor: colors.addevent.savebg,
        paddingHorizontal: 15,
        paddingVertical: 4,
        borderRadius: 21.5,
    },
    save: {
        fontSize: 16,
        fontFamily: fonts.medium,
        color: colors.white,
    },
});