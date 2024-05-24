import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import { expenses, expensesmonth, tnxdata } from '../../assets/temp/tempData';

const Transactions = ({ navigation }: { navigation: any }): JSX.Element => {
    const [expenseFilterView, setExpenseFilterView] = useState<string>("Weekly");
    const [transactionCat, setTransactionCat] = useState<string>("All");

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
                {/* Top section */}
                <View style={{ rowGap: Platform.OS === "ios" ? 8 : 0, marginBottom: 20, }}>
                    <View style={[commonstyles.fdRow, commonstyles.acjsb]}>
                        <Text style={styles.expnsTxt}>Expenses</Text>
                        <Text style={styles.expnsAmount}>-$123.456</Text>
                    </View>

                    <Text style={styles.today}>Today : {dateFNS(new Date())}</Text>
                </View>

                {/* bar chart section */}
                <View style={styles.container}>
                    {/* barchart option dropdown */}
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
                    <BarChart data={expenseFilterView === "Weekly" ? expenses : expensesmonth} height={Platform.OS === "android" ? (_Height / 5.5) : (_Height / 6)} />
                </View>

                {/* expense income list */}
                <View style={[commonstyles.parent, { marginTop: Platform.OS === "android" ? 30 : 35, marginBottom: Platform.OS === "android" ? 5 : 20 }]}>
                    {/* header menu */}
                    <View style={[commonstyles.fdRow, commonstyles.acjsb]}>
                        <TouchableOpacity
                            style={[styles.tnxCatMenu, commonstyles.acjc, { backgroundColor: transactionCat === "All" ? colors.transaction.tnxcatmenubg : "transparent" }]}
                            onPress={() => setTransactionCat("All")}
                        >
                            <Text style={[styles.tnxCatMenuTxt, { color: transactionCat === "All" ? colors.white : colors.transaction.tnxcatmenutxt }]}>All</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.tnxCatMenu, commonstyles.acjc, { backgroundColor: transactionCat === "Income" ? colors.transaction.tnxcatmenubg : "transparent" }]}
                            onPress={() => setTransactionCat("Income")}
                        >
                            <Text style={[styles.tnxCatMenuTxt, { color: transactionCat === "Income" ? colors.white : colors.transaction.tnxcatmenutxt }]}>Income</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.tnxCatMenu, commonstyles.acjc, { backgroundColor: transactionCat === "Expense" ? colors.transaction.tnxcatmenubg : "transparent" }]}
                            onPress={() => setTransactionCat("Expense")}
                        >
                            <Text style={[styles.tnxCatMenuTxt, { color: transactionCat === "Expense" ? colors.white : colors.transaction.tnxcatmenutxt }]}>Expense</Text>
                        </TouchableOpacity>
                    </View>

                    {/* transaction */}
                    <View style={[commonstyles.parent, { marginTop: 15 }]}>
                        <FlatList
                            data={[1, 1, 1]}
                            style={{ paddingTop: 10 }}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(_, index) => index.toString()}
                            ListFooterComponent={
                                <TouchableOpacity
                                    style={[commonstyles.acjc, styles.seeMore]}
                                    onPress={() => navigation.navigate("alltnx")}
                                >
                                    <Text style={styles.seeMoreTxt}>See More</Text>
                                </TouchableOpacity>
                            }
                            renderItem={({ item }) => (
                                <View style={{ rowGap: 10, marginBottom: 25, marginHorizontal: 15 }}>
                                    {/* date */}
                                    <Text style={[styles.today, { alignSelf: "flex-start", color: colors.black }]}>{dateFNS(new Date())}</Text>

                                    {/* transaction */}
                                    <View style={[styles.tnxContainer, {}]}>
                                        <FlatList
                                            data={tnxdata}
                                            keyExtractor={(_, index) => index.toString()}
                                            renderItem={({ item, index }) => (
                                                <View style={[commonstyles.fdRow, commonstyles.acjsb, { marginBottom: 10 }]}>
                                                    {/* image & transaction category */}
                                                    <View style={[commonstyles.fdRow, { columnGap: 20, alignItems: "center" }]}>
                                                        {/* tnx type image with gradient */}
                                                        <View style={styles.shadowWrap}>
                                                            <LinearGradient
                                                                colors={colors.finmanhome.tnximgwrapbg}
                                                                style={[styles.tnxTypeImgWrap, commonstyles.acjc]}
                                                                useAngle={true}
                                                                angle={-45}
                                                                angleCenter={{ x: 0.8, y: 0.3 }}
                                                            >
                                                                <Image
                                                                    style={styles.tnxTypeImg}
                                                                    source={
                                                                        item.category.transaction_category_name === "Food" ?
                                                                            icons.food
                                                                            :
                                                                            item.category.transaction_category_name === "Salary" ?
                                                                                icons.money
                                                                                :
                                                                                item.category.transaction_category_name === "Shopping" ?
                                                                                    icons.shopping
                                                                                    :
                                                                                    item.category.transaction_category_name === "Entertainment" ?
                                                                                        icons.entertainment
                                                                                        : null
                                                                    }
                                                                />
                                                            </LinearGradient>
                                                        </View>

                                                        <Text style={styles.tnxType}>{item.category.transaction_category_name}</Text>
                                                    </View>

                                                    {/* amount & date */}
                                                    <View style={{ alignItems: "flex-end" }}>
                                                        <Text
                                                            style={[
                                                                styles.tnxAmount,
                                                                { color: item.tnx_type === "Expense" ? colors.finmanhome.tnxexpns : colors.finmanhome.tnxincm }
                                                            ]}
                                                        >
                                                            {item.tnx_type === "Expense" ? "-" : "+"}${item.tnx_amount}
                                                        </Text>
                                                    </View>
                                                </View>
                                            )}
                                        />
                                    </View>
                                </View>
                            )}
                        />
                    </View>
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
    tnxCatMenu: {
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    tnxCatMenuTxt: {
        fontSize: 15,
        fontFamily: fonts.medium,
    },
    seeMore: {
        borderRadius: 53,
        paddingVertical: 8,
        backgroundColor: colors.transaction.seemorebg,
        marginBottom: 15,
        marginHorizontal: 20,
    },
    seeMoreTxt: {
        fontSize: 17,
        fontFamily: fonts.medium,
        color: colors.white,
    },
    tnxContainer: {
        backgroundColor: colors.transaction.nestedtnxviewbg,
        borderRadius: 10,
        shadowColor: colors.transaction.nestedtnxviewshadow,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 5,
        paddingHorizontal: 18,
        paddingTop: 10,
    },
    shadowWrap: {
        shadowColor: colors.finmanhome.tnximgwrapshadow,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7,
        elevation: 12,
        borderRadius: 13,
        backgroundColor: colors.finmanhome.tnximgwrapshadow,
    },
    tnxTypeImgWrap: {
        width: 30,
        height: 30,
        borderRadius: 13,
    },
    tnxTypeImg: {
        width: 15,
        height: 15,
        tintColor: colors.white,
    },
    tnxType: {
        fontSize: 14,
        fontFamily: fonts.medium,
        color: colors.black,
    },
    tnxAmount: {
        fontSize: 13,
        fontFamily: fonts.medium,
    },
});