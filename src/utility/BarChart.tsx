import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../config/colors';
import { _Width } from '../config/staticVariables';
import { fonts } from '../config/fonts';
import { BarChart_Props } from '../config/CustomTypes';

const BarChart = ({ data, height }: BarChart_Props) => {
    // Extract values and labels from the expense object
    const values = Object.values(data);
    const labels = Object.keys(data);

    // Find the maximum expense value
    const maxExpense = Math.max(...values);

    // Normalize data to fit within the view's height
    const normalizedData = values.map(value => (value / maxExpense) * (height));

    // Number of dotted lines
    const numDottedLines = 5;

    // Function to determine bar color based on value
    const getBarColor = (value: number) => {
        const percentage = (value / maxExpense) * 100;

        if (percentage < 50) {
            return colors.transaction.lowbar;
        } else if (percentage <= 80) {
            return colors.transaction.midbar;
        } else {
            return colors.transaction.highbar;
        }
    };

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {/* bar chart */}
            <View>
                {/* bar */}
                <View style={[styles.chartContainer, { height: height }]}>
                    {Array.from({ length: numDottedLines }).map((_, index) => (
                        <View key={index} style={[styles.dottedLine, { bottom: `${(index / numDottedLines) * 100}%` }]} />
                    ))}
                    {normalizedData.map((height, index) => (
                        <View key={index} style={[styles.barContainer, { width: Platform.OS === "ios" ? 48.14 : 43.42 }]}>
                            <View style={[styles.bar, { height, backgroundColor: getBarColor(values[index]) }]} />
                            {/* <Text style={styles.barLabel}>{values[index]}</Text> */}
                        </View>
                    ))}
                </View>

                {/* label */}
                <View style={styles.labelsContainer}>
                    {labels.map((label, index) => (
                        <Text key={index} style={[styles.label, { width: Platform.OS === "ios" ? 48.14 : 43.42 }]}>
                            {label}
                        </Text>
                    ))}
                </View>
            </View>
        </ScrollView>
    )
};

export default BarChart;

const styles = StyleSheet.create({
    chartContainer: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 8,
        borderTopWidth: 1,
        borderColor: colors.transaction.xaxisdotline,
        ...Platform.select({
            ios: {},
            android: { borderStyle: "dashed", }
        })
    },
    barContainer: {
        alignItems: 'center',
        flex: 1,
    },
    bar: {
        width: 25,
        borderRadius: 2,
    },
    labelsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 12,
        textAlign: 'center',
        flex: 1,
        fontFamily: fonts.medium,
        color: colors.transaction.label,
    },
    dottedLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        borderTopWidth: 1,
        borderColor: colors.transaction.xaxisdotline,
        ...Platform.select({
            ios: {},
            android: { borderStyle: "dashed", }
        })
    },
    barLabel: {
        marginTop: 4,
        fontSize: 12,
        textAlign: 'center',
    },
});