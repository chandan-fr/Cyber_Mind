import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../config/colors';
import { _Height, _Width } from '../config/staticVariables';
import { fonts } from '../config/fonts';
import { BarChart_Props } from '../config/CustomTypes';
import Svg, { Line } from 'react-native-svg';

const BarChart = ({ data }: BarChart_Props) => {
    // Extract values and labels from the expense object
    const values = Object.values(data);
    const labels = Object.keys(data);

    // Find the maximum expense value
    const maxExpense = Math.max(...values);

    // Normalize data to fit within the view's height
    const normalizedData = values.map(value => (value / maxExpense) * (_Height / 3.8));

    // Number of dotted lines
    const numDottedLines = 5;
    const lineGap = (_Height / 3.8) / numDottedLines;

    // Function to determine bar color based on value
    const getBarColor = (value: number) => {
        if (value <= ((lineGap * 1) / maxExpense) * 10000) {
            return colors.transaction.lowbar; // less than 60
        } else if (value <= ((lineGap * 2) / maxExpense) * 10000) {
            return colors.transaction.midbar; // less than 100
        } else {
            return colors.transaction.highbar; // 100 or more
        }
    };

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {/* bar chart */}
            <View>
                {/* bar */}
                <View style={styles.chartContainer}>
                    {Array.from({ length: numDottedLines }).map((_, index) => (
                        <>
                            {/* {Platform.OS === "ios" ?
                                <Svg key={index} height={2}>
                                    <Line
                                        x1="0"
                                        y1={2 / 2}
                                        // x2={"100%"}
                                        y2={2 / 2}
                                        stroke={colors.transaction.xaxisdotline}
                                        strokeWidth={2}
                                        strokeDasharray={[4, 2]} // This creates the dotted effect
                                    />
                                </Svg>
                                :
                                <View key={index} style={[styles.dottedLine, { bottom: `${(index / numDottedLines) * 100}%` }]} />
                            } */}
                            <View key={index} style={[styles.dottedLine, { bottom: `${(index / numDottedLines) * 100}%` }]} />
                        </>
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
        height: _Height / 3.8,
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
        width: 45.78,
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
        width: 45.78,
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