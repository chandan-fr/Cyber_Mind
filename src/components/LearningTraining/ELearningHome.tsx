import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../config/colors';
import { commonstyles } from '../../assets/css/CommonStyles';
import LinearGradient from 'react-native-linear-gradient';
import { icons } from '../../config/icons';
import { _Height, _Width, courseData } from '../../config/staticVariables';
import { fonts } from '../../config/fonts';

const ELearningHome = ({ navigation }: { navigation: any }): JSX.Element => {
    return (
        <View style={[commonstyles.parent, { backgroundColor: colors.elearnhome.bgcolor }]}>
            {/* top header section */}
            <LinearGradient
                useAngle={true}
                angle={90}
                angleCenter={{ x: 0.5, y: 0 }}
                colors={colors.elearnhome.gdcolor}
                style={styles.lgStyle}
            >
                {/* navigation */}
                <View style={[styles.navWrap, commonstyles.fdRow, commonstyles.acjsb]}>
                    <TouchableOpacity
                        style={[styles.nav, commonstyles.acjc]}
                        onPress={() => navigation.goBack()}
                    >
                        <Image source={icons.arrow} style={styles.navImg} />
                    </TouchableOpacity>

                    <Text numberOfLines={2} style={styles.navHeading}>Hay, What would you like to learn today?</Text>
                </View>
            </LinearGradient>

            {/* body */}
            <View style={[commonstyles.parent, { marginTop: -170, paddingHorizontal: 20, marginBottom: Platform.OS === "ios" ? 25 : 5 }]}>
                {/* heading */}
                <View style={[commonstyles.fdRow, { alignItems: "center", columnGap: 20, backgroundColor: "transparent" }]}>
                    <Text style={styles.heading}>Choose Your Course</Text>
                    <Image style={styles.arrow} source={icons.arrow} />
                </View>

                {/* subjects */}
                <View style={[commonstyles.parent, { marginTop: 10 }]}>
                    <FlatList
                        data={courseData}
                        showsVerticalScrollIndicator={false}
                        style={{ paddingTop: 15 }}
                        numColumns={2}
                        keyExtractor={(_, index) => index.toString()}
                        columnWrapperStyle={[commonstyles.fdRow, commonstyles.acjsb, { marginBottom: 20 }]}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.course}
                            >
                                <Text style={styles.courseName}>{item?.name}</Text>
                                <Image style={[styles.courseImg, { height: item?.name === "Computer Application" ? 100 : 120 }]} resizeMode='stretch' source={item.img} />
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </View>
    )
};

export default ELearningHome;

const styles = StyleSheet.create({
    lgStyle: {
        width: "100%",
        ...Platform.select({
            ios: {
                height: _Height * 0.37,
            },
            android: {
                height: _Height * 0.40,
            }
        }),
    },
    navWrap: {
        marginHorizontal: 20,
        ...Platform.select({
            ios: { marginTop: 70, },
            android: { marginTop: 60, }
        }),
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
    navHeading: {
        fontSize: 15,
        color: colors.white,
        fontFamily: fonts.semibold,
        textAlign: "right",
        width: _Width / 1.8,
    },
    heading: {
        fontSize: 24,
        fontFamily: fonts.semibold,
        color: colors.white,
    },
    arrow: {
        width: 20,
        height: 20,
        tintColor: colors.white,
        transform: [{ rotate: "180deg" }],
    },
    course: {
        width: (_Width - 60) / 2,
        padding: 15,
        backgroundColor: colors.white,
        borderRadius: 18.5,
        rowGap: 15,
        borderWidth: 2,
        borderColor: colors.elearnhome.border,
        ...Platform.select({
            ios: { height: ((_Width - 60) / 2) * 1.15 },
            android: { height: ((_Width - 60) / 2) * 1.3 }
        }),
    },
    courseName: {
        fontSize: 15,
        fontFamily: fonts.medium,
        color: colors.black,
    },
    courseImg: {
        width: (_Width - 90) / 2,
        marginLeft: -10,
    },
});