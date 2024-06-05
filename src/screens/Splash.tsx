import { Platform, StyleSheet, View } from 'react-native'
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
import * as Animatable from 'react-native-animatable';

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
            <BgGradient colors={colors.splash.gdcolor} isAngle angle={180} xAxis={0} yAxis={0.6} />

            <View style={styles.main}>
                <View style={styles.body}>
                    <Animatable.View style={[styles.circle3, styles.circlePosition, { zIndex: 1, shadowColor: colors.splash.circle2shadow }]} animation={"zoomIn"} duration={1500} delay={300} />
                    <Animatable.View style={[styles.circle2, styles.circlePosition, { zIndex: 2, shadowColor: colors.splash.circle2shadow }]} animation={"zoomIn"} duration={1500} delay={200} />
                    <Animatable.View style={[styles.circle1, { zIndex: 3, position: "absolute", }]} animation={"zoomIn"} duration={1400} delay={120} />
                </View>

                <Animatable.Image style={[commonstyles.logoMid, { zIndex: 4 }]} source={images.logo} animation={"zoomIn"} duration={1500} />
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
        width: 500,
        height: 500,
        borderRadius: 500,
        opacity: 0.12,
        backgroundColor: colors.splash.circle1,
    },
    circle2: {
        borderRadius: 500,
        opacity: 0.12,
        backgroundColor: colors.splash.circle2,
        ...Platform.select({
            ios: {
                width: 650,
                height: 650,
            },
            android: {
                width: 620,
                height: 620,
            }
        })
    },
    circle3: {
        borderRadius: 500,
        opacity: 0.12,
        backgroundColor: colors.splash.circle2,
        ...Platform.select({
            ios: {
                width: 800,
                height: 800,
            },
            android: {
                width: 750,
                height: 750,
            }
        })
    },
    circlePosition: {
        position: "absolute",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 2,
    },
});