import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { _Image_Url, _Width } from '../../config/staticVariables';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';
import LinearGradient from 'react-native-linear-gradient';

const CategoryCard = ({ item, navigation }: { item: any, navigation: any }) => {
    const getImagUrl = (url: string): string => {
        const image_url: string = url.replaceAll("\\", "/");
        const imgUrl = `${_Image_Url}${image_url}`;
        return imgUrl;
    };

    return (
        <TouchableOpacity
            style={styles.cardWrap}
        // onPress={()=>{}}
        >
            <LinearGradient
                useAngle={true}
                angle={-45}
                angleCenter={{ x: 0.4, y: 0.9 }}
                colors={item?.color_code}
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    zIndex: -1,
                    borderRadius: 13,
                }}
            >
                <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start", paddingLeft: 8, paddingTop: 8 }}>
                    <Text style={styles.cardHead}>{item?.category_name}</Text>
                    <Image
                        source={{ uri: getImagUrl(item?.cat_image_url) }}
                        style={styles.cardImg}
                        resizeMode='stretch'
                    />
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
};

export default CategoryCard;

const styles = StyleSheet.create({
    cardWrap: {
        ...Platform.select({
            ios: {
                minHeight: 100,
            },
            android: {
                minHeight: 100,
            }
        }),
        width: (_Width - 75) / 2,
        borderRadius: 13,
    },
    cardHead: {
        fontFamily: fonts.semibold,
        color: colors.white,
        alignSelf: 'flex-start',
        ...Platform.select({
            ios: {
                fontSize: 12,
                width: 84,
            },
            android: {
                fontSize: 11,
                width: 68,
            }
        }),
        zIndex: 1,
    },
    cardImg: {
        position: "absolute",
        right: 0,
        bottom: 0,
        borderBottomRightRadius: 13,
        ...Platform.select({
            ios: {
                width: 90,
                height: 70,
            },
            android: {
                width: 70,
                height: 70,
            }
        }),
    },
});