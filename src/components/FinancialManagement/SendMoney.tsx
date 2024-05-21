import { Image, Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { commonstyles } from '../../assets/css/CommonStyles';
import colors from '../../config/colors';
import { icons } from '../../config/icons';
import { fonts } from '../../config/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { _TransactionType, _Width, numericRegex } from '../../config/staticVariables';
import { Transaction_Error, Transaction_Form } from '../../config/CustomTypes';
import { Dropdown } from 'react-native-element-dropdown';
import { getAllTransactionCategory } from '../../services/slices/UserSlice';
import { showModal } from '../../services/slices/UtilitySlice';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { convertToTimeStamp, getDateTimeFromTimestamp, getFormatedDateTime } from '../../utility/UtilityFunctions';

const SendMoney = ({ navigation }: { navigation: any }) => {
    const { transaction_category, token } = useSelector((state: any) => state.userSlice);
    const [tnxData, setTnxData] = useState<Transaction_Form>({ tnx_amount: "", category: "", note: "", date_time: 0, tnx_type: "" });
    const [openDateModal, setOpenDateModal] = useState<boolean>(false);
    const [tnxError, setTnxError] = useState<Transaction_Error>({});
    const _Header = { headers: { Authorization: "Bearer " + token } };
    const amountRef = useRef<TextInput>(null);

    const dispatch: Dispatch<any> = useDispatch();

    const validateTnxData = (): Transaction_Error => {
        const error: Transaction_Error = {};
        const { tnx_amount, category, date_time, tnx_type } = tnxData;
        if (!tnx_amount) {
            error.tnx_amount = "Transaction Amount is Required!";
            dispatch(showModal({ msg: "Transaction Amount is Required!", type: "error" }));
        } else if (!numericRegex.test(tnx_amount)) {
            error.tnx_amount = "Only Numerics are allowed!";
            dispatch(showModal({ msg: "Only Numerics are allowed!", type: "error" }));
        } else if (!category) {
            error.tnx_amount = "Transaction Amount is Required!";
            dispatch(showModal({ msg: "Transaction Amount is Required!", type: "error" }));
        }

        return error;
    };

    const onChange = (event: DateTimePickerEvent, date: Date | undefined) => {
        setTnxData({ ...tnxData, date_time: convertToTimeStamp(date) });
        setOpenDateModal(false);
    };

    const handleAddTransaction = () => {
        const validationErrors: any = validateTnxData();
        setTnxError(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            // dispatch()
        }
    };

    useEffect(() => {
        dispatch(getAllTransactionCategory({ _Header }));
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[commonstyles.parent, { backgroundColor: colors.sendmoney.bgcolor }]}>
                {/* nav icon */}
                <View style={styles.navWrap}>
                    <TouchableOpacity
                        style={[styles.navBtn, commonstyles.acjc]}
                        onPress={() => navigation.goBack()}
                    >
                        <Image style={styles.navImg} source={icons.arrow} />
                    </TouchableOpacity>
                </View>

                {/* heading top */}
                <View style={[commonstyles.acjc, { marginTop: 30 }]}>
                    <Text style={styles.heading}>Add a new Transaction</Text>
                </View>

                {/* amount */}
                <TouchableOpacity
                    style={[commonstyles.fdRow, commonstyles.acjc, styles.amountWrap]}
                    activeOpacity={0.9}
                    onPress={() => amountRef && amountRef.current?.focus()}
                >
                    <Text style={styles.dollar}>$</Text>
                    <TextInput
                        ref={amountRef}
                        style={styles.inputAmount}
                        placeholder='0'
                        placeholderTextColor={colors.sendmoney.amount}
                        keyboardType='decimal-pad'
                        value={tnxData.tnx_amount}
                        maxLength={10}
                        onChangeText={value => setTnxData({ ...tnxData, tnx_amount: value })}
                    />
                </TouchableOpacity>

                {/* rest inputs section */}
                <View style={{ marginTop: 50, marginHorizontal: 40, rowGap: 20 }}>
                    {/* category */}
                    <View style={{ backgroundColor: colors.white, borderRadius: 12 }}>
                        <Dropdown
                            style={styles.dropdownBox}
                            data={transaction_category}
                            placeholder='Select...'
                            placeholderStyle={{ color: colors.sendmoney.placeholder, fontSize: 15, fontFamily: fonts.medium }}
                            containerStyle={{ borderRadius: 12 }}
                            itemContainerStyle={{ borderRadius: 12 }}
                            itemTextStyle={{ color: colors.sendmoney.placeholder, fontSize: 15, fontFamily: fonts.medium }}
                            selectedTextStyle={{ color: colors.sendmoney.amount, fontSize: 15, fontFamily: fonts.medium }}
                            labelField='label'
                            valueField='value'
                            value={tnxData.category}
                            onChange={(item: { label: string, value: string }) => setTnxData({ ...tnxData, category: item.value })}
                        />
                    </View>

                    {/* notes */}
                    <View style={{ backgroundColor: colors.white, borderRadius: 12 }}>
                        <TextInput
                            style={styles.inputBox}
                            placeholder='Note'
                            placeholderTextColor={colors.sendmoney.placeholder}
                            value={tnxData.note}
                            onChangeText={value => setTnxData({ ...tnxData, note: value })}
                        />
                    </View>

                    {/* date & time */}
                    <View style={{ backgroundColor: colors.white, borderRadius: 12, justifyContent: "center" }}>
                        <View style={[commonstyles.fdRow, { alignItems: "center", height: 50, paddingLeft: 10, paddingRight: 5 }]}>
                            <Text style={[styles.inputDate, { color: tnxData.date_time ? colors.sendmoney.amount : colors.sendmoney.placeholder }]}>
                                {tnxData.date_time ? getDateTimeFromTimestamp(tnxData.date_time, "datetime") : "Select Date"}
                            </Text>

                            <TouchableOpacity
                                style={[commonstyles.acjc, { paddingHorizontal: 5, paddingVertical: 3 }]}
                                onPress={() => setOpenDateModal(true)}
                            >
                                <Image style={styles.calendar} source={icons.calendar} />
                            </TouchableOpacity>
                        </View>

                        {openDateModal && <DateTimePicker
                            value={new Date()}
                            mode={'date'}
                            is24Hour={false}
                            onChange={onChange}
                            style={{ position: "absolute", right: 0 }}
                        />}
                    </View>

                    {/* type */}
                    <View style={{ backgroundColor: colors.white, borderRadius: 12 }}>
                        <Dropdown
                            style={styles.dropdownBox}
                            data={_TransactionType}
                            placeholder='Select...'
                            placeholderStyle={{ color: colors.sendmoney.placeholder, fontSize: 15, fontFamily: fonts.medium }}
                            containerStyle={{ borderRadius: 12 }}
                            itemContainerStyle={{ borderRadius: 12 }}
                            itemTextStyle={{ color: colors.sendmoney.placeholder, fontSize: 15, fontFamily: fonts.medium }}
                            selectedTextStyle={{ color: colors.sendmoney.amount, fontSize: 15, fontFamily: fonts.medium }}
                            labelField='label'
                            valueField='value'
                            value={tnxData.tnx_type}
                            onChange={(item: { label: string, value: string }) => setTnxData({ ...tnxData, tnx_type: item.value })}
                        />
                    </View>

                    {/* save button */}
                    <TouchableOpacity
                        style={[styles.save, commonstyles.acjc]}
                        onPress={handleAddTransaction}
                    >
                        <Text style={styles.saveBtnTxt}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default SendMoney;

const styles = StyleSheet.create({
    navWrap: {
        alignItems: "flex-start",
        ...Platform.select({
            ios: { marginTop: 80, },
            android: { marginTop: 70, }
        }),
        marginHorizontal: 20,
    },
    navBtn: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: colors.sendmoney.nav,
        borderRadius: 40,
    },
    navImg: {
        width: 23,
        height: 23,
        tintColor: colors.sendmoney.nav,
    },
    heading: {
        fontSize: 17,
        fontFamily: fonts.medium,
        color: colors.sendmoney.headingtop,
    },
    amountWrap: {
        backgroundColor: colors.white,
        marginHorizontal: 40,
        borderRadius: 39,
        marginTop: 20,
    },
    dollar: {
        fontSize: 40,
        fontFamily: fonts.medium,
        color: colors.sendmoney.amount,
    },
    inputAmount: {
        maxWidth: _Width / 2,
        color: colors.sendmoney.amount,
        fontFamily: fonts.medium,
        ...Platform.select({
            ios: {
                fontSize: 40,
                height: 45,
            },
            android: {
                // height: 45,
                fontSize: 40,
                paddingVertical: 0,
            }
        }),
    },
    inputBox: {
        height: 50,
        borderRadius: 12,
        paddingLeft: 10,
        fontSize: 15,
        fontFamily: fonts.medium,
        color: colors.sendmoney.amount,
    },
    dropdownBox: {
        height: 52,
        borderRadius: 12,
        paddingRight: 5,
        paddingLeft: 10,
    },
    save: {
        backgroundColor: colors.sendmoney.savebtnbg,
        height: 40,
        borderRadius: 12,
        marginHorizontal: 20,
    },
    saveBtnTxt: {
        fontSize: 15,
        fontFamily: fonts.semibold,
        color: colors.white,
    },
    inputDate: {
        fontSize: 15,
        fontFamily: fonts.medium,
        flex: 1,
    },
    calendar: {
        width: 30,
        height: 30,
        tintColor: colors.sendmoney.nav,
    },
});