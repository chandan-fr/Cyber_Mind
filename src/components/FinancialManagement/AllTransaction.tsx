import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { commonstyles } from '../../assets/css/CommonStyles';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';
import { _Base_Url, _Height } from '../../config/staticVariables';
import { icons } from '../../config/icons';
import LinearGradient from 'react-native-linear-gradient';
import { tnxdata } from '../../assets/temp/tempData';
import { dateFNS, generateRandomFileName, hasStoragePermission } from '../../utility/UtilityFunctions';
import RNFetchBlob from 'rn-fetch-blob';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { showModal } from '../../services/slices/UtilitySlice';


const AllTransaction = ({ navigation }: { navigation: any }): JSX.Element => {
    const dispatch: Dispatch<any> = useDispatch();

    const downloadFile = async (): Promise<void> => {
        try {
            const { config, fs } = RNFetchBlob;
            const fileDir = fs.dirs.DownloadDir;
            const status: boolean = await hasStoragePermission(dispatch);
            if (status) {
                config({
                    fileCache: true,
                    addAndroidDownloads: {
                        useDownloadManager: true,
                        notification: true,
                        path: fileDir + "/CyberMind_" + generateRandomFileName(".pdf"),
                        description: "Transaction Details",
                        mediaScannable: true,
                    }
                }).fetch("GET", _Base_Url + "/get/transaction/pdf", {})
                    .then(res => dispatch(showModal({ msg: "File Downloaded.", type: "success" })))
                    .catch(err => console.log("download error =>", err));
            } else {
                dispatch(showModal({ msg: "Permission Deined!!!", type: "error" }));
            }
        } catch (exc: any) {
            console.log("exc==>", exc);

            dispatch(showModal({ msg: exc?.message, type: "error" }))
        }
    };

    return (
        <View style={commonstyles.parent}>
            {/* top header section */}
            <LinearGradient
                useAngle={true}
                angle={90}
                angleCenter={{ x: 0.5, y: 0 }}
                colors={colors.alltnx.gdcolor}
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
                        <Text numberOfLines={2} style={styles.pageHeading}>All Transaction</Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.menu, commonstyles.acjc]}
                    >
                        <Image source={icons.dots} style={styles.menuImg} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            {/* body */}
            <View style={[commonstyles.parent, { marginBottom: Platform.OS === "android" ? 5 : 20, marginHorizontal: 10, backgroundColor: colors.alltnx.bgcolor }]}>
                <View style={[commonstyles.parent, { marginTop: 25 }]}>
                    <FlatList
                        data={[1, 1, 1, 1, 1, 1]}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(_, index) => index.toString()}
                        // ListFooterComponent={
                        //     <TouchableOpacity
                        //         style={[commonstyles.acjc, styles.seeMore]}
                        //         onPress={() => navigation.navigate("alltnx")}
                        //     >
                        //         <Text style={styles.seeMoreTxt}>See More</Text>
                        //     </TouchableOpacity>
                        // }
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

            {/* Download Button */}
            <TouchableOpacity
                style={[styles.downloadBtn, commonstyles.acjc]}
                onPress={() => downloadFile()}
            >
                <Image style={styles.download} source={icons.save} />
            </TouchableOpacity>
        </View>
    )
};

export default AllTransaction;

const styles = StyleSheet.create({
    lgStyle: {
        width: "100%",
        ...Platform.select({
            ios: {
                height: _Height * 0.14,
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
    downloadBtn: {
        backgroundColor: colors.alltnx.downloadbg,
        width: 50,
        height: 50,
        borderRadius: 40,
        position: "absolute",
        bottom: 80,
        right: 25,
        shadowColor: colors.alltnx.downloadbg,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.87,
        shadowRadius: 5.65,
        elevation: 6,
    },
    download: {
        width: 28,
        height: 28,
        tintColor: colors.white,
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
    today: {
        fontSize: 14,
        fontFamily: fonts.regular,
        color: colors.alltnx.today,
        alignSelf: "flex-end"
    },
});