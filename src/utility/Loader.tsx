import { StatusBar, StyleSheet, View } from 'react-native'
import React from 'react'
import { Loader_Props } from '../config/CustomTypes';
import { _Height, _Width } from '../config/staticVariables';
import colors from '../config/colors';
import LottieView from 'lottie-react-native';

const Loader = ({ visible, source, width, height }: Loader_Props): JSX.Element | null => {
    if (!visible) return null;

    const defaultAnimation = source ? source : require("../assets/loaders/loader.json");
    const statusBarHeight = StatusBar.currentHeight ?? 0;

    return (
        <View style={[styles.loader, { height: _Height + statusBarHeight }]}>
            <LottieView
                style={{ width: width ? width : _Width, height: height ? height : _Height }}
                source={defaultAnimation}
                autoPlay
                loop
            />
        </View>
    )
};

export default Loader;

const styles = StyleSheet.create({
    loader: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: _Width,
        zIndex: 1,
        backgroundColor: colors.loader.bgcolor,
        elevation: 5,
    },
});