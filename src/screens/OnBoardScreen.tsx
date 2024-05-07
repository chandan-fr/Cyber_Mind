import { Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { commonstyles } from '../assets/css/CommonStyles';
import BgGradient from '../utility/BgGradient';
import colors from '../config/colors';
import { _Height, _Width, wlcmData } from '../config/staticVariables';
import { images } from '../config/images';
import { fonts } from '../config/fonts';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get("window");


const OnBoardScreen = ({ navigation }: { navigation: any }) => {
    const { slider_data } = useSelector((state: any) => state.utilitySlice);
    const [curIdx, setCurIdx] = useState<number>(0);
    const sliderRef = useRef<FlatList>(null);

    const handleSkip = ()=>{
        AsyncStorage.setItem("@showOnboard", "1");
        navigation.replace("welcomescreen");
    };

    return (
        <SafeAreaView style={[commonstyles.parent]}>
            <BgGradient colors={colors.onboard.gdcolor} height={_Height} isAngle={true} angle={180} xAxis={0} yAxis={0.6} />

            <View style={[styles.body]}>
                <View style={{ marginHorizontal: 12 }}>
                    <Image style={commonstyles.logoSmall} source={images.logo} />
                </View>

                <View style={{ marginTop: 20 }}>
                    <FlatList
                        data={wlcmData}
                        ref={sliderRef}
                        scrollEventThrottle={1}
                        horizontal
                        pagingEnabled
                        onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
                            const x = e.nativeEvent.contentOffset.x;
                            setCurIdx(Math.round(x / width));
                        }}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(_, idx: number) => idx.toString()}
                        renderItem={({ item, index }) => (
                            <View style={styles.card}>
                                <View>
                                    <Image resizeMode='stretch' style={styles.scrnImg} source={item.scr_img} />
                                </View>

                                <View style={styles.txtWrap}>
                                    <Text style={styles.heading}>{item.heading}</Text>
                                    <Text style={styles.para}>{item.para}</Text>
                                </View>
                            </View>
                        )}
                    />
                </View>

                <View style={[commonstyles.fdRow, styles.footer]}>
                    <View style={[commonstyles.fdRow, { columnGap: 22 }]}>
                        {wlcmData?.map((_, idx) => (
                            <View key={idx} style={idx !== curIdx ? styles.dot : styles.dotActv} />
                        ))}
                    </View>

                    <TouchableOpacity onPress={handleSkip}>
                        <Text style={styles.skip}>
                            Skip
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
};

export default OnBoardScreen;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        marginVertical: 10,
        rowGap: 15,
    },
    footer: {
        borderWidth: 0,
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 35,
        marginTop: 50,
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 10,
        backgroundColor: colors.onboard.inactvdot,
    },
    dotActv: {
        width: 12,
        height: 12,
        borderRadius: 10,
        backgroundColor: colors.onboard.heading,
    },
    skip: {
        fontSize: 14,
        fontFamily: fonts.medium,
        color: colors.onboard.skip,
    },
    scrnImg: {
        width: _Width,
        maxHeight: 399,
        minHeight: 352,
        height: 352,
    },
    card: {
        alignItems: "flex-start",
        rowGap: 10,
    },
    txtWrap: {
        alignItems: "flex-start",
        rowGap: 10,
        marginHorizontal: 30,
    },
    heading: {
        fontSize: 24,
        fontFamily: fonts.semibold,
        color: colors.onboard.heading,
        width: 200,
    },
    para: {
        fontSize: 18,
        fontFamily: fonts.regular,
        color: colors.black,
        width: 300,
    },
});