import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { getDateTimeFromTimestamp, getFormatedDateTime, getImagUrl } from '../../utility/UtilityFunctions';
import { TaskCard_Props } from '../../config/CustomTypes';
import { fonts } from '../../config/fonts';
import colors from '../../config/colors';
import { _Width } from '../../config/staticVariables';
import { commonstyles } from '../../assets/css/CommonStyles';
import { icons } from '../../config/icons';


const TaskCard = ({ item, navigation }: TaskCard_Props): JSX.Element => {
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const curTime = getFormatedDateTime(new Date(), "time");

    return (
        <View
            style={styles.cardWrap}
        // onPress={() => navigation.navigate(item.screen_name)}
        >
            <LinearGradient
                useAngle={true}
                angle={-45}
                angleCenter={{ x: 0.8, y: 0.5 }}
                colors={["#D389FF", "#6D70C9"].reverse()}
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    zIndex: -1,
                    borderRadius: 13,
                }}
            >
                <View style={{ flex: 1, paddingLeft: 8, paddingTop: 8 }}>
                    {/* dot menu */}
                    <TouchableOpacity
                        style={[styles.menu, commonstyles.acjc]}
                    >
                        <Image source={icons.dots} style={styles.menuImg} />
                    </TouchableOpacity>

                    {/* members */}
                    <View style={[commonstyles.fdRow, { alignItems: "center", alignSelf: "flex-start", marginTop: -20 }]}>
                        {["man", "woman", "man"].map((value: string, i) => (
                            <View key={i}>
                                <Image style={[styles.memberImg, { marginLeft: i > 0 ? -12 : 0 }]} source={icons[value]} />
                            </View>
                        ))}
                    </View>

                    {/* task */}
                    <Text numberOfLines={2} style={styles.taskTxt}>Clean the Floor</Text>

                    {/* date & status */}
                    <View style={[commonstyles.fdRow, commonstyles.acjsb, { marginLeft: 7, marginRight: 10 }]}>
                        <Text style={styles.dateTime}>
                            {
                                getDateTimeFromTimestamp(1716815104, "time") < curTime ?
                                    "Running late"
                                    :
                                    `${getDateTimeFromTimestamp(1716815104, "shortdate")} by ${getDateTimeFromTimestamp(1716815104, "time")}`
                            }
                        </Text>

                        <TouchableOpacity
                            style={{}}
                            onPress={() => setIsCompleted(!isCompleted)}
                        >
                            {isCompleted ?
                                <Image style={styles.complete} source={icons.taskdone} />
                                :
                                <View style={styles.circle} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
};

export default TaskCard;

const styles = StyleSheet.create({
    cardWrap: {
        minHeight: 175,
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
    menu: {
        width: 30,
        height: 30,
        alignSelf: "flex-end",
    },
    menuImg: {
        width: 20,
        height: 20,
        tintColor: colors.white,
    },
    memberImg: {
        width: 30,
        height: 30,
        borderRadius: 30,
    },
    taskTxt: {
        fontSize: 16,
        fontFamily: fonts.semibold,
        color: colors.white,
        width: 100,
        marginVertical: 15,
        alignSelf: "flex-start",
        marginLeft: 5,
    },
    circle: {
        width: 25,
        height: 25,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: colors.white,
    },
    dateTime: {
        width: "60%",
        fontSize: 13,
        fontFamily: fonts.regular,
        color: colors.white,
    },
    complete: {
        width: 25,
        height: 25,
        borderRadius: 25,
    },
});