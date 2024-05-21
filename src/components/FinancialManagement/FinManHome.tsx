import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DotsMenu from '../DotsMenu';
import { commonstyles } from '../../assets/css/CommonStyles';
import colors from '../../config/colors';
import { _Height, _Width } from '../../config/staticVariables';
import LinearGradient from 'react-native-linear-gradient';
import { icons } from '../../config/icons';
import { fonts } from '../../config/fonts';
import { images } from '../../config/images';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { getAllTransaction } from '../../services/slices/UserSlice';
import { Transactions_Data } from '../../config/CustomTypes';


const FinManHome = ({ navigation }: { navigation: any }) => {
    const { all_transactions, token } = useSelector((state: any) => state.userSlice);
    const [isMenu, setIsMenu] = useState<boolean>(false);
    const _Header = { headers: { Authorization: "Bearer " + token } };
    const dispatch: Dispatch<any> = useDispatch();

    const onClose = () => {
        setIsMenu(false);
    };

    const getRecentTransactions = <T extends Array<Transactions_Data>>(tnxData: T): T => {
        const limitedData: Array<Transactions_Data> = tnxData.slice().reverse().slice(0, 10);
        return limitedData as T;
    };

    useEffect(() => {
        dispatch(getAllTransaction({ _Header }));
    }, [dispatch]);

    return (
        <View style={[commonstyles.parent, { backgroundColor: colors.finmanhome.bgcolor }]}>
            {/* top header section */}
            <LinearGradient
                useAngle={true}
                angle={90}
                angleCenter={{ x: 0.5, y: 0 }}
                colors={colors.finmanhome.gdcolor}
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
                        <Text numberOfLines={2} style={styles.pageHeading}>Financial Management Tools</Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.menu, commonstyles.acjc]}
                        onPress={() => setIsMenu(true)}
                    >
                        <Image source={icons.dots} style={styles.menuImg} />
                    </TouchableOpacity>

                    {isMenu && <View style={styles.dotmenuWrap}><DotsMenu onClose={onClose} /></View>}
                </View>
            </LinearGradient>

            {/* balance monitor */}
            <View style={{ margin: 20, borderRadius: 20 }}>
                <LinearGradient
                    useAngle={true}
                    angle={-45}
                    angleCenter={{ x: 0.8, y: 0 }}
                    colors={colors.finmanhome.balancemonitor}
                    style={styles.balanceMonitor}
                >
                    <View style={{ margin: 15 }}>
                        <Text style={styles.balanceHead}>Total Balance</Text>
                        <Text style={styles.totalBalance}>$87,302.32</Text>

                        <View style={[commonstyles.fdRow, commonstyles.acjsb, { marginBottom: 15 }]}>
                            {/* expense */}
                            <View style={[commonstyles.fdRow, { columnGap: 15 }]}>
                                <View style={[styles.arrowWrap, commonstyles.acjc, { backgroundColor: colors.finmanhome.expensebg }]}>
                                    <Image style={styles.expenseArrow} source={icons.uparrow} />
                                </View>

                                <View>
                                    <Text style={styles.incmExpns}>Expences</Text>
                                    <Text style={styles.amount}>$1234.56</Text>
                                </View>
                            </View>

                            {/* income */}
                            <View style={[commonstyles.fdRow, { columnGap: 15 }]}>
                                <View style={[styles.arrowWrap, commonstyles.acjc, { backgroundColor: colors.finmanhome.incomebg }]}>
                                    <Image style={styles.incomeArrow} source={icons.uparrow} />
                                </View>

                                <View>
                                    <Text style={styles.incmExpns}>Income</Text>
                                    <Text style={styles.amount}>$7890.12</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <Image style={styles.imgBg} resizeMode='stretch' source={images.fmtimgbg} />
                </LinearGradient>

                {/* add expense button */}
                <View style={[commonstyles.acjc, { marginTop: -32 }]}>
                    <TouchableOpacity
                        style={[styles.addBtn, commonstyles.acjc]}
                        onPress={() => navigation.navigate("sendmoney")}
                    >
                        <Image style={styles.addImg} source={icons.fatplus} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* recent transaction */}
            <View style={[commonstyles.parent, { marginHorizontal: 20, marginBottom: Platform.OS === "ios" ? 30 : 5 }]}>
                {/* recent head */}
                <View style={[commonstyles.fdRow, commonstyles.acjsb]}>
                    <Text style={styles.tnxHead}>Recent Transaction</Text>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("tnx")}
                    >
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                </View>

                {/* recent transactions */}
                <View style={{ marginTop: 6, flex: 1, paddingTop: 10 }}>
                    {all_transactions.length > 0 ?
                        <FlatList
                            data={getRecentTransactions(all_transactions)}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={[styles.tnx, commonstyles.fdRow, commonstyles.acjsb]}>
                                    <View style={[commonstyles.fdRow, { columnGap: 20, alignItems: "center" }]}>
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

                                    <View style={{ alignItems: "flex-end" }}>
                                        <Text
                                            style={[
                                                styles.tnxAmount,
                                                { color: item.tnx_type === "Expenses" ? colors.finmanhome.tnxexpns : colors.finmanhome.tnxincm }
                                            ]}
                                        >
                                            {item.tnx_type === "Expenses" ? "-" : "+"}${item.tnx_amount}
                                        </Text>
                                        <Text style={styles.tnxTime}>Today</Text>
                                    </View>
                                </View>
                            )}
                        />
                        :
                        <View style={[commonstyles.parent, commonstyles.acjc]}>
                            <Text>No Transaction So Far!!</Text>
                        </View>
                    }
                </View>
            </View>
        </View>
    )
};

export default FinManHome;

const styles = StyleSheet.create({
    lgStyle: {
        width: "100%",
        ...Platform.select({
            ios: {
                height: _Height * 0.16,
            },
            android: {
                height: _Height * 0.18,
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
    balanceMonitor: {
        minHeight: 200,
        borderRadius: 20,
        overflow: "hidden",
    },
    balanceHead: {
        fontSize: 15,
        fontFamily: fonts.regular,
        color: colors.white,
        marginTop: 10,
    },
    totalBalance: {
        fontSize: 40,
        fontFamily: fonts.medium,
        color: colors.white,
        marginTop: 10,
        marginBottom: 40,
    },
    imgBg: {
        width: "100%",
        height: "100%",
        position: "absolute",
        borderRadius: 20,
        opacity: 0.5,
    },
    incomeArrow: {
        width: 16,
        height: 16,
        transform: [{ rotate: "-90deg" }],
        tintColor: colors.finmanhome.incomeicon,
    },
    expenseArrow: {
        width: 16,
        height: 16,
        transform: [{ rotate: "90deg" }],
        tintColor: colors.finmanhome.expenseicon,
    },
    arrowWrap: {
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    incmExpns: {
        fontSize: 10,
        fontFamily: fonts.regular,
        color: colors.white,
    },
    amount: {
        fontSize: 15,
        fontFamily: fonts.regular,
        color: colors.white,
    },
    addBtn: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: colors.white,
        shadowColor: colors.finmanhome.addbtnshadow,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    addImg: {
        width: 25,
        height: 25,
        tintColor: colors.finmanhome.addbtnimg
    },
    tnxHead: {
        fontSize: 20,
        color: colors.black,
        fontFamily: fonts.medium,
    },
    seeAll: {
        fontSize: 15,
        color: colors.finmanhome.seeall,
        fontFamily: fonts.medium,
    },
    tnx: {
        backgroundColor: colors.finmanhome.tnxbg,
        borderRadius: 10,
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10
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
        width: 50,
        height: 50,
        borderRadius: 13,
    },
    tnxTypeImg: {
        width: 20,
        height: 20,
        tintColor: colors.white,
    },
    tnxType: {
        fontSize: 15,
        fontFamily: fonts.medium,
        color: colors.black,
    },
    tnxAmount: {
        fontSize: 13,
        fontFamily: fonts.medium,
    },
    tnxTime: {
        fontSize: 10,
        fontFamily: fonts.medium,
        color: colors.finmanhome.tnxtime,
    },
});