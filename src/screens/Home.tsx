import { Alert, FlatList, Image, ImageBackground, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
import colors from '../config/colors';
import { icons } from '../config/icons';
import { images } from '../config/images';
import { _Height, _Width } from '../config/staticVariables';
import { commonstyles } from '../assets/css/CommonStyles';
import { getFullDate } from '../utility/UtilityFunctions';
import { fonts } from '../config/fonts';
import { getAllCategory, getAllMember } from '../services/slices/UserSlice';
import CategoryCard from '../components/Home/CategoryCard';


const Home = ({ navigation }: { navigation: any }): JSX.Element => {
    const { user, token, all_member, all_category } = useSelector((state: any) => state.userSlice);
    const dispatch: any = useDispatch();
    const _Header = { headers: { Authorization: "Bearer " + token } };
    var count = 0;

    useEffect(() => {
        if (token && count === 0) {
            dispatch(getAllMember({ _Header, navigation }));
            dispatch(getAllCategory({ _Header, navigation }));
            count += 1;
        };
    }, [token]);

    return (
        <SafeAreaView style={[commonstyles.parent, { backgroundColor: colors.home.bgcolor }]}>
            <View style={{ flex: 1, }}>
                {/* top header section */}
                <LinearGradient
                    useAngle={true}
                    angle={90}
                    angleCenter={{ x: 0.3, y: 0 }}
                    colors={colors.homeheader.gdcolor}
                    style={styles.lgStyle}
                >
                    <ImageBackground source={images.bgimg} style={styles.imgBg} />

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
                                style={styles.bellWrap}
                            >
                                <Image source={icons.bell} style={styles.bell} />

                                <View style={styles.notiDot} />
                            </TouchableOpacity>
                        </View>

                        {/* bottom text */}
                        <View style={styles.btmMenuWrap}>
                            <Text style={styles.btmDate}>
                                {getFullDate()}
                            </Text>

                            <Text style={styles.btmWlcmUser}>Welcome User</Text>
                            <Text style={styles.btmWish}>Have a nice day !</Text>
                        </View>
                    </View>
                </LinearGradient>

                {/* banner section */}
                <View style={styles.banner}>
                    <Image source={images.agd} style={{ width: _Width - 60, height: 120 }} resizeMode='stretch' />

                    <View style={[commonstyles.fdRow, { position: "absolute" }]}>
                        {/* left section */}
                        <View style={styles.bannerLeftWrap}>
                            <Text style={styles.bannerHead}>Refer a Friend & Earn</Text>

                            <Text style={styles.bannerPara}>
                                Share Your Joy With Friends & Get Rewarded!
                            </Text>

                            <TouchableOpacity
                                style={[styles.bannerBtn, commonstyles.acjc]}
                            >
                                <Text style={styles.bannerBtnTxt}>Reffer</Text>
                            </TouchableOpacity>
                        </View>

                        {/* right section */}
                        <View style={[{ position: "relative", flex: 1 }, commonstyles.acjc]}>
                            <View style={[commonstyles.acjc, styles.eclipseWrap]}>
                                <View style={styles.eclipse1} />
                                <View style={styles.eclipse2} />
                                <Image source={images.jhikimiki} style={styles.jhikimiki} resizeMode='stretch' />
                            </View>

                            <Image source={icons.trophy} style={styles.trophy} resizeMode='stretch' />
                        </View>
                    </View>
                </View>

                {/* members */}
                <View style={styles.memberContainer}>
                    <Text style={styles.memberHeading}>All Members</Text>

                    <View style={[styles.memberWrap, commonstyles.fdRow]}>
                        <FlatList
                            data={all_member.slice(0, 4)}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(_, idx) => idx.toString()}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    style={styles.member}
                                >
                                    <Image source={item?.user?.profile_img ? { uri: item?.user?.profile_img } : icons.user_dumy} style={styles.memberImg} />
                                </TouchableOpacity>
                            )}
                        />

                        {all_member.length > 4 &&
                            <TouchableOpacity style={[commonstyles.acjc, styles.seeAllWrap]}>
                                <Text style={styles.seeAll}>See all</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>

                {/* categories */}
                <View style={styles.categoryContainer}>
                    <Text style={styles.categoryHeading}>
                        Categories
                    </Text>

                    <View style={styles.cardWrap}>
                        <FlatList
                            data={all_category}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            columnWrapperStyle={[commonstyles.fdRow, { alignItems: "center", justifyContent: "space-between", marginBottom: 15 }]}
                            keyExtractor={(_, index: number) => index.toString()}
                            renderItem={({ item, index }) => (
                                <CategoryCard item={item} navigation={navigation} />
                            )}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
};

export default Home;

const styles = StyleSheet.create({
    lgStyle: {
        width: "100%",
        ...Platform.select({
            ios: {
                height: _Height * 0.3,
            },
            android: {
                height: _Height * 0.33,
            }
        }),
    },
    imgBg: {
        width: "100%",
        position: "absolute",
        opacity: 0.4,
        ...Platform.select({
            ios: {
                height: _Height * 0.3,
            },
            android: {
                height: _Height * 0.33,
            }
        })
    },
    topMenuWrap: {
        marginTop: 30,
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
    btmMenuWrap: {
        ...Platform.select({
            ios: {
                rowGap: 4,
            },
            android: {
                rowGap: -1,
            }
        }),
    },
    btmDate: {
        fontFamily: fonts.regular,
        fontSize: 12.6,
        color: colors.black,
    },
    btmWish: {
        fontFamily: fonts.regular,
        fontSize: 12.6,
        color: colors.white,
    },
    btmWlcmUser: {
        fontFamily: fonts.bold,
        fontSize: 21,
        color: colors.white,
    },
    banner: {
        marginHorizontal: 30,
        minHeight: 120,
        borderRadius: 14,
        marginTop: -60,
        backgroundColor: colors.white,
    },
    bannerLeftWrap: {
        marginLeft: 15,
        flex: 1.3,
        rowGap: 5,
        justifyContent: "center",
        ...Platform.select({
            ios: {
                paddingTop: 20,
            },
            android: {
                paddingTop: 15,
            }
        }),
    },
    bannerHead: {
        fontSize: 15,
        fontFamily: fonts.semibold,
        color: colors.white,
    },
    bannerPara: {
        fontSize: 9,
        fontFamily: fonts.medium,
        color: colors.white,
        width: 130,
    },
    bannerBtnTxt: {
        fontSize: 11.44,
        fontFamily: fonts.medium,
        color: colors.white,
    },
    bannerBtn: {
        backgroundColor: "rgba(255, 233, 250, 0.15)",
        borderRadius: 20,
        alignSelf: "flex-start",
        paddingHorizontal: 18,
        paddingVertical: 1,
        marginTop: 5,
    },
    eclipseWrap: {
        position: "relative",
        ...Platform.select({
            ios: {
                marginTop: 15,
                marginRight: 8,
            },
            android: {
                marginTop: 12
            }
        })
    },
    eclipse1: {
        width: 145,
        height: 145,
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        borderRadius: 145,
        position: "absolute",
    },
    eclipse2: {
        width: 85,
        height: 85,
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        borderRadius: 85,
        position: "absolute",
    },
    jhikimiki: {

        position: "absolute",
        ...Platform.select({
            ios: {
                top: -55,
                right: -70,
                width: 175,
                height: 110,
            },
            android: {
                top: -58,
                right: -60,
                width: 150,
                height: 110,
            }
        }),
    },
    trophy: {
        position: "absolute",
        width: 95,
        height: 95,
        ...Platform.select({
            ios: {
                bottom: -20,
                right: 26,
            },
            android: {
                bottom: -13,
            }
        }),
    },
    memberContainer: {
        marginHorizontal: 25,
        marginTop: 20,
    },
    memberHeading: {
        fontFamily: fonts.medium,
        fontSize: 14,
        color: colors.black,
    },
    memberWrap: {
        marginTop: 15,
    },
    member: {
        marginRight: 15,
    },
    memberImg: {
        ...Platform.select({
            ios: {
                width: 57,
                height: 57,
                borderRadius: 57,
            },
            android: {
                width: 50,
                height: 50,
                borderRadius: 50,
            }
        })
    },
    seeAllWrap: {
        backgroundColor: colors.homemember.seeall,
        ...Platform.select({
            ios: {
                width: 57,
                height: 57,
                borderRadius: 57,
            },
            android: {
                width: 50,
                height: 50,
                borderRadius: 50,
            }
        })
    },
    seeAll: {
        fontFamily: fonts.medium,
        color: colors.white,

        textAlign: "center",
        ...Platform.select({
            ios: {
                fontSize: 13,
                width: 35,
            },
            android: {
                fontSize: 12.1,
                width: 40,
            }
        })
    },
    categoryContainer: {
        marginHorizontal: 25,
        marginTop: 20,
        flex: 1,
    },
    categoryHeading: {
        fontFamily: fonts.semibold,
        fontSize: 18,
        color: colors.black,
    },
    cardWrap: {
        marginTop: 20,
        marginBottom: 30,
    },
});