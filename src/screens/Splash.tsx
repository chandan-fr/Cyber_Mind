import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import BgGradient from '../utility/BgGradient';
import { commonstyles } from '../assets/css/CommonStyles';
import { images } from '../config/images';
import colors from '../config/colors';
import { useDispatch } from 'react-redux';
import { getSliderData } from '../services/slices/UtilitySlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginByAsyncStorage, saveUserCred } from '../services/slices/UserSlice';
import { RememberMe_Data } from '../config/CustomTypes';

const Splash = ({ navigation }: { navigation: any }) => {
    const dispatch: any = useDispatch();

    const retrieveLoginData = async (): Promise<void> => {
        const loginCred: any = await AsyncStorage.getItem("@logincred");
        const data: RememberMe_Data = JSON.parse(loginCred);
        dispatch(saveUserCred(data));
    };

    const getUserData = async (): Promise<void> => {
        const user: any = await AsyncStorage.getItem("@user");
        const token: any = await AsyncStorage.getItem("@token");
        const showOnboard: any = await AsyncStorage.getItem("@showOnboard");

        const userData = { user: JSON.parse(user), token };

        setTimeout(() => {
            if (user !== null) {
                navigation.replace("drawernav");
                dispatch(loginByAsyncStorage(userData));
            } else if (user === null && showOnboard !== "1") {
                navigation.replace("onboardscreen");
            } else {
                navigation.replace("welcomescreen");
            }
        }, 1300);
    }

    const handleSplash = async (): Promise<void> => {
        // dispatch(getSliderData({}));
        await retrieveLoginData();
        await getUserData();
    };

    useEffect(() => {
        handleSplash();
    }, []);

    return (
        <View style={commonstyles.parent}>
            <BgGradient colors={colors.splash.gdcolor} />

            <View style={styles.main}>
                <View style={styles.body}>
                    <View style={[styles.circle3, styles.circlePosition, { zIndex: 1 }]} />
                    <View style={[styles.circle2, styles.circlePosition, { zIndex: 2 }]} />
                    <View style={[styles.circle1, styles.circlePosition, { zIndex: 3 }]} />
                </View>

                <Image style={commonstyles.logoMid} source={images.logo} />
            </View>
        </View>
    )
};

export default Splash;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    body: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    circle1: {
        // mixBlendMode: 'screen'
        width: 500,
        height: 500,
        borderRadius: 500,
        opacity: 0.12,
        backgroundColor: colors.splash.circle1,
    },
    circle2: {
        width: 600,
        height: 600,
        borderRadius: 500,
        opacity: 0.12,
        backgroundColor: colors.splash.circle2,
    },
    circle3: {
        width: 700,
        height: 700,
        borderRadius: 500,
        opacity: 0.12,
        backgroundColor: colors.splash.circle3,
    },
    circlePosition: {
        position: "absolute",
        ...Platform.select({
            ios: {
                shadowColor: colors.white,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
            },
            android: {
                shadowColor: colors.white,
                elevation: 4,
            },
        }),
    },
});