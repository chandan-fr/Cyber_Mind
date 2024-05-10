import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonstyles } from '../../assets/css/CommonStyles';
import { fonts } from '../../config/fonts';
import colors from '../../config/colors';
import { _CellWidth } from '../../config/staticVariables';

const CalendarHeader = (): JSX.Element => {
    return (
        <View>
            <FlatList
                data={["S", "M", "T", "W", "T", "F", "S"]}
                numColumns={7}
                keyExtractor={(_, i: number) => i.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.header, commonstyles.parent, commonstyles.acjc]}>
                        <Text style={[styles.weekday, { color: item === "S" ? colors.fchome.weekend : colors.fchome.weekday }]}>{item}</Text>
                    </View>
                )}
            />
        </View>
    )
};

export default CalendarHeader;

const styles = StyleSheet.create({
    header: {
        width: _CellWidth,
        marginBottom: 15,
    },
    weekday: {
        textAlign: "center",
        fontSize: 18,
        fontFamily: fonts.bold,
    },
});