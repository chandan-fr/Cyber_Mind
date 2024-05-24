import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonstyles } from '../assets/css/CommonStyles';
import { images } from '../config/images';
import { fonts } from '../config/fonts';
import colors from '../config/colors';
import { EmptyData_Props } from '../config/CustomTypes';


const EmptyData = ({ msg, width, height, size, lifted }: EmptyData_Props): JSX.Element => {
    return (
        <View style={[commonstyles.parent, commonstyles.acjc, { marginVertical: 10 }]}>
            <Image style={{ width: width ? width : 241, height: height ? height : 180 }} resizeMode='stretch' source={images.errorscrn} />

            <Text style={[styles.txt, { fontSize: size ? size : 22, marginBottom: lifted ? 40 : 0, }]}>{msg}</Text>
        </View>
    )
};

export default EmptyData;

const styles = StyleSheet.create({
    txt: {
        fontFamily: fonts.semibold,
        color: colors.emptydata.txt,
        marginTop: 20,
    },
});