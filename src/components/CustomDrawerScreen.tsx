import { StyleSheet, Text, View, SafeAreaView, Platform, ImageBackground, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React from 'react'
import { DrawerNavigationState, ParamListBase, useNavigation } from '@react-navigation/native';
import { DrawerDescriptorMap, DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { commonstyles } from '../assets/css/CommonStyles';
import { BlurView } from '@react-native-community/blur';
import { _Height } from '../config/staticVariables';
import colors from '../config/colors';
import LinearGradient from 'react-native-linear-gradient';
import { images } from '../config/images';
import { icons } from '../config/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fonts } from '../config/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RememberMe_Data } from '../config/CustomTypes';
import { logOut, saveUserCred } from '../services/slices/UserSlice';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getImagUrl } from '../utility/UtilityFunctions';

type CDS_Props = {
    state?: DrawerNavigationState<ParamListBase>;
    navigation: DrawerNavigationHelpers;
    descriptors?: DrawerDescriptorMap;
};

const CustomDrawerScreen = ({ navigation }: CDS_Props): JSX.Element => {
    const { user } = useSelector((state: any) => state.userSlice);
    const dispatch: any = useDispatch();
    const navigations: any = useNavigation();

    const naigateToScreen = (screenName: string, params?: string) => {
        navigations.navigate("bottomnav", { screen: screenName, params: { screen: params } });
    };

    const retrieveLoginData = async (): Promise<void> => {
        const loginCred: any = await AsyncStorage.getItem("@logincred");
        const data: RememberMe_Data = JSON.parse(loginCred);
        dispatch(saveUserCred(data));
    };

    const googleSignOut = async (): Promise<void> => {
        try {
            await GoogleSignin.signOut();
            Alert.alert("Sign Out Successfull!");
        } catch (exc) {
            Alert.alert("Sign Out Failed!");
        }
    };

    const userLogOut = async () => {
        if (user.auth_type !== "regular") await googleSignOut();

        await retrieveLoginData();
        dispatch(logOut(navigation));
    };

    return (
        <View style={commonstyles.parent}>
            <View style={styles.body}>
                {/* top section */}
                <View style={styles.sideTopView}>
                    <LinearGradient
                        useAngle={true}
                        angle={-45}
                        angleCenter={Platform.OS === "android" ? { x: 0.3, y: 0 } : { x: 0.1, y: 0 }}
                        colors={colors.drawertop.gdcolor}
                        style={styles.lgStyle}
                    >
                        <ImageBackground source={images.bgimg} style={styles.imgBg} />

                        <View style={styles.sideTopWrap}>
                            {/* profile photo & close */}
                            <View style={[commonstyles.fdRow, styles.topWrap]}>
                                <TouchableOpacity
                                    style={[styles.userWrap, commonstyles.acjc]}
                                >
                                    <Image source={user?.profile_img ? { uri: getImagUrl(user?.profile_img) } : icons.user_dumy} style={styles.user_dummy} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[{ padding: 5 }, commonstyles.acjc]}
                                    onPress={() => navigation.closeDrawer()}
                                >
                                    <Image source={icons.close} style={styles.close} />
                                </TouchableOpacity>
                            </View>

                            {/* name & edit */}
                            <View style={[commonstyles.fdRow, styles.btmWrap]}>
                                <View style={{ marginLeft: 20, alignItems: "flex-start", rowGap: Platform.OS === "android" ? -8 : 0 }}>
                                    <Text numberOfLines={1} style={styles.sideDrawerHead}>{user?.full_name}</Text>
                                    <Text style={styles.sideDrawerSubHead}>{user?.email}</Text>
                                </View>

                                <TouchableOpacity
                                    style={[styles.userEdit, commonstyles.acjc]}
                                    onPress={() => naigateToScreen("profile", "editprofile")}
                                >
                                    <Text style={styles.userEditTxt}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                </View>

                {/* nav section */}
                <View style={styles.sideMidView}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ marginHorizontal: 30 }}>
                            {/* dashboard */}
                            <TouchableOpacity
                                style={styles.navWrap}
                                onPress={() => naigateToScreen("home")}
                            >
                                <Text style={styles.navTxt}>Dashboard</Text>
                            </TouchableOpacity>

                            <View style={styles.hr} />

                            {/* notification */}
                            <TouchableOpacity
                                style={styles.navWrap}
                            >
                                <Text style={styles.navTxt}>Notifications</Text>
                            </TouchableOpacity>

                            <View style={styles.hr} />

                            {/* profile */}
                            <TouchableOpacity
                                style={styles.navWrap}
                                onPress={() => naigateToScreen("profile")}
                            >
                                <Text style={styles.navTxt}>Profile</Text>
                            </TouchableOpacity>

                            <View style={styles.hr} />

                            {/* contact us */}
                            <TouchableOpacity
                                style={styles.navWrap}
                            >
                                <Text style={styles.navTxt}>Contact Us</Text>
                            </TouchableOpacity>

                            <View style={styles.hr} />

                            {/* log out */}
                            <TouchableOpacity
                                style={styles.navWrap}
                                onPress={() => userLogOut()}
                            >
                                <Text style={styles.navTxt}>Log Out</Text>
                            </TouchableOpacity>

                            <View style={styles.hr} />
                        </View>
                    </ScrollView>
                </View>

                {/* social section */}
                <View style={[styles.sideBtmView, commonstyles.fdRow, commonstyles.acjc]}>
                    {/* facebook */}
                    <TouchableOpacity
                        style={[styles.socialIconWrap, commonstyles.acjc]}
                    >
                        <Image source={icons.facebook} style={styles.socialIcon} />
                    </TouchableOpacity>

                    {/* twitter or x */}
                    <TouchableOpacity
                        style={[styles.socialIconWrap, commonstyles.acjc]}
                    >
                        <Image source={icons.twitter} style={styles.socialIcon} />
                    </TouchableOpacity>

                    {/* instagram */}
                    <TouchableOpacity
                        style={[styles.socialIconWrap, commonstyles.acjc]}
                    >
                        <Image source={icons.instagram} style={styles.socialIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            {Platform.OS === "ios" ?
                <BlurView
                    style={styles.blurView}
                    blurType="light"
                    blurAmount={4}
                    reducedTransparencyFallbackColor="rgba(0, 158, 245, 0.3)"
                />
                :
                null
            }
        </View>
    )
};

export default CustomDrawerScreen;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "rgba(0, 158, 245, 0.3)",
    },
    blurView: {
        height: _Height,
        ...Platform.select({
            ios: {
                ...StyleSheet.absoluteFillObject,
                zIndex: -1,
            },
            android: {
                zIndex: -2,
                ...StyleSheet.absoluteFillObject,
                opacity: 0.9,
            }
        }),
    },
    sideTopView: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        ...Platform.select({
            ios: {
                shadowColor: colors.drawertop.shadowcolor,
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowRadius: 11,
                shadowOpacity: 0,
                height: _Height * 0.3,
            },
            android: {
                elevation: 3,
                shadowColor: colors.drawertop.shadowcolor,
                height: _Height * 0.28,
            }
        }),
    },
    sideTopWrap: {
        margin: 10,
        flex: 1,
        justifyContent: "space-between",
        rowGap: 10,
        ...Platform.select({
            ios: {
                paddingTop: 40,
            },
            android: {

            }
        })
    },
    lgStyle: {
        width: "100%",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        ...Platform.select({
            ios: {
                height: _Height * 0.3,
            },
            android: {
                height: _Height * 0.28,
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
                height: _Height * 0.28,
            }
        })
    },
    user_dummy: {
        width: 110,
        height: 110,
        borderRadius: 100,
    },
    close: {
        width: 16,
        height: 16,
        tintColor: colors.white,
    },
    topWrap: {
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginHorizontal: 15,
        marginTop: 20
    },
    userWrap: {
        borderWidth: 5,
        width: 117,
        height: 117,
        borderRadius: 100,
        borderColor: colors.white,
    },
    btmWrap: {
        marginBottom: 15,
        justifyContent: "space-between",
        alignItems: "center",
    },
    userEdit: {
        marginRight: 10,
        paddingHorizontal: 16,
        paddingVertical: 4,
        backgroundColor: colors.drawertop.btncolor,
        borderRadius: 16.25,
    },
    userEditTxt: {
        color: colors.white,
        fontSize: 8,
        fontFamily: fonts.medium,
    },
    sideDrawerHead: {
        color: colors.white,
        fontSize: 20.5,
        fontFamily: fonts.semibold,
        width: 175,
    },
    sideDrawerSubHead: {
        color: colors.white,
        fontSize: 12,
        fontFamily: fonts.regular,
    },
    sideMidView: {
        marginTop: 25,
    },
    navWrap: {
    },
    navTxt: {
        color: colors.white,
        fontFamily: fonts.medium,
        ...Platform.select({
            ios: {
                fontSize: 20,
            },
            android: {
                fontSize: 18,
            }
        })
    },
    hr: {
        borderWidth: 1,
        borderColor: colors.drawerMid.hrbordercolor,
        marginVertical: 25,
    },
    sideBtmView: {
        columnGap: 30,
        marginBottom: 20,
        marginTop: 10,
    },
    socialIcon: {
        width: 15,
        height: 15,
    },
    socialIconWrap: {
        backgroundColor: colors.white,
        borderWidth: 0.58,
        borderRadius: 3.48,
        width: 25,
        height: 25,
        borderColor: colors.drawerBottom.bordercolor,
    },
});