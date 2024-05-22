import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { commonstyles } from '../../assets/css/CommonStyles';
import colors from '../../config/colors';
import { icons } from '../../config/icons';
import { fonts } from '../../config/fonts';
import { _ExpenseFilterType, _Height, _Width } from '../../config/staticVariables';
import { dateFNS } from '../../utility/UtilityFunctions';
import { Dropdown } from 'react-native-element-dropdown';
import BarChart from '../../utility/BarChart';

const Transactions = ({ navigation }: { navigation: any }) => {
    const [expenseFilterView, setExpenseFilterView] = useState<string>("Weekly");

    const expenses = { Sun: 476, Mon: 776, Tue: 334, Wed: 224, Thu: 123, Fri: 998, Sat: 550 };
    const expensesmonth = { "Jan": 476, "Feb": 776, "Mar": 334, "Apr": 224, "May": 123, "Jun": 998, "Jul": 550, "Aug": 476, "Sep": 776, "Oct": 334, "Nov": 224, "Dec": 123 };

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
                        <Text numberOfLines={2} style={styles.pageHeading}>Transaction</Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.menu, commonstyles.acjc]}
                    >
                        <Image source={icons.dots} style={styles.menuImg} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            {/* body */}
            <View style={[styles.body, commonstyles.parent]}>
                <View style={{ rowGap: Platform.OS === "ios" ? 8 : 0, marginBottom: 20, }}>
                    <View style={[commonstyles.fdRow, commonstyles.acjsb]}>
                        <Text style={styles.expnsTxt}>Expenses</Text>
                        <Text style={styles.expnsAmount}>-$123.456</Text>
                    </View>

                    <Text style={styles.today}>Today : {dateFNS(new Date())}</Text>
                </View>

                {/* bar chart section */}
                <View style={styles.container}>
                    <View style={{ alignItems: "flex-end", marginBottom: Platform.OS === "ios" ? 15 : 10 }}>
                        <Dropdown
                            data={_ExpenseFilterType}
                            style={[styles.dropdownBox]}
                            placeholder='Select...'
                            placeholderStyle={{ color: colors.sendmoney.placeholder, fontSize: 15, fontFamily: fonts.medium }}
                            containerStyle={{ borderRadius: 12 }}
                            itemContainerStyle={{ borderRadius: 12 }}
                            itemTextStyle={{ color: colors.transaction.expnsfilter, fontSize: 15, fontFamily: fonts.medium }}
                            selectedTextStyle={{ color: colors.transaction.expnsfilter, fontSize: 15, fontFamily: fonts.medium }}
                            iconColor={colors.transaction.expnsfilter}
                            labelField='label'
                            valueField='value'
                            value={expenseFilterView}
                            onChange={(item: { label: string, value: string }) => {
                                setExpenseFilterView(item.value);
                            }}
                        />
                    </View>

                    {/* barChart */}
                    <BarChart data={expenseFilterView === "Weekly" ? expenses : expensesmonth} />
                </View>
            </View>
        </View>
    )
};

export default Transactions;

const styles = StyleSheet.create({
    lgStyle: {
        width: "100%",
        ...Platform.select({
            ios: {
                height: _Height * 0.18,
            },
            android: {
                height: _Height * 0.19,
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
    body: {
        backgroundColor: colors.transaction.bgcolor,
        marginTop: -30,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    expnsTxt: {
        fontSize: 22,
        fontFamily: fonts.semibold,
        color: colors.transaction.expnstxt,
    },
    expnsAmount: {
        fontSize: 33,
        fontFamily: fonts.medium,
        color: colors.transaction.expnsamount,
    },
    today: {
        fontSize: 14,
        fontFamily: fonts.regular,
        color: colors.transaction.today,
        alignSelf: "flex-end"
    },
    container: {
        paddingHorizontal: 8,
        paddingBottom: 15,
        paddingTop: 5,
        backgroundColor: colors.white,
        borderRadius: 16,
        shadowColor: colors.transaction.chartshadow,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    dropdownBox: {
        height: 40,
        borderRadius: 12,
        paddingRight: 5,
        paddingLeft: 10,
        width: _Width / 3.6,
    },
});