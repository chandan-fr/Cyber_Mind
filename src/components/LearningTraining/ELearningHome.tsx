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
            <View style={[commonstyles.parent, { marginTop: 0, borderWidth: 1, paddingHorizontal: 20, marginBottom: Platform.OS === "ios" ? 25 : 5 }]}>
                {/* heading */}
                <View style={[commonstyles.fdRow, { alignItems: "center", columnGap: 20 }]}>
                    <Text style={styles.heading}>Choose Your Course</Text>
                    <Image style={styles.arrow} source={icons.arrow} />
                </View>

                {/* subjects */}
                <View style={[commonstyles.parent, { borderWidth: 1 }]}>
                    <FlatList
                        data={courseData}
                        showsVerticalScrollIndicator={false}
                        // style={{flexWrap: "wrap"}}
                        numColumns={2}
                        keyExtractor={(_, index) => index.toString()}
                        columnWrapperStyle={[commonstyles.fdRow, commonstyles.acjsb, {}]}
                        renderItem={({ item }) => (
                            <CourseCard item={item} />
                        )}
                    />
                </View>
            </View>
        </View>
    )
};

export default ELearningHome;

const CourseCard = ({ item }: { item: any }): JSX.Element => (
    <TouchableOpacity
        style={styles.course}
    >
        <Text>{item?.name}</Text>
        <Image style={styles.courseImg} resizeMode='stretch' source={item.img} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    lgStyle: {
        width: "100%",
        ...Platform.select({
            ios: {
                height: _Height * 0.25,
            },
            android: {
                height: _Height * 0.28,
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
        minHeight: 100,
        width: (_Width - 60) / 2,
        padding: 15,
        backgroundColor: colors.white,
        borderRadius: 18.5,
    },
    courseImg: {
        width: "100%",
        height: "100%",
    },
});