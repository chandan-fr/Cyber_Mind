import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { commonstyles } from '../../assets/css/CommonStyles';
import { _CellWidth } from '../../config/staticVariables';
import CalendarHeader from './CalendarHeader';
import { fonts } from '../../config/fonts';
import colors from '../../config/colors';
import { Calendar_Props } from '../../config/CustomTypes';


const Calendar = ({ data, currentDay, monthIndex, onDayPress, navigation }: Calendar_Props): JSX.Element => {
    const currentMonthIndex: number = new Date().getMonth();
    
    useEffect(() => {
        // console.log("caledar render");

    }, []);

    return (
        <View style={styles.calendar}>
            <FlatList
                data={data}
                numColumns={7}
                ListHeaderComponent={<CalendarHeader />}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={[styles.day, commonstyles.acjc, {}]}
                        onPress={() => onDayPress(item.date)}
                        disabled={item?.date === null ? true : false}
                    >
                        <Text style={item?.isHoliday ? styles.dayTxtHldy : styles.dayTxt}>{item?.date}</Text>
                        {!item.empty && currentDay === item?.date && currentMonthIndex === monthIndex ? <View style={styles.underline} /> : null}
                    </TouchableOpacity>
                )}
            />
        </View>
    )
};

export default Calendar;

const styles = StyleSheet.create({
    calendar: {},
    day: {
        width: _CellWidth,
        height: 35,
        marginBottom: 5,
    },
    dayTxt: {
        textAlign: "center",
        fontSize: 18,
        fontFamily: fonts.regular,
        color: colors.fchome.day,
    },
    dayTxtHldy: {
        textAlign: "center",
        fontSize: 18,
        fontFamily: fonts.regular,
        color: colors.fchome.holiday,
    },
    underline: {
        width: "35%",
        height: 4,
        backgroundColor: colors.fchome.currentday,
        borderRadius: 11,
        ...Platform.select({
            ios: {},
            android: {
                marginTop: -5,
            }
        }),
    },
});