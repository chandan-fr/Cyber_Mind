import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { commonstyles } from '../../assets/css/CommonStyles';
import colors from '../../config/colors';
import LinearGradient from 'react-native-linear-gradient';
import { _Height, _Width, slmGoal } from '../../config/staticVariables';
import { icons } from '../../config/icons';
import { fonts } from '../../config/fonts';

const SustainableLivingHome = ({ navigation }: { navigation: any }): JSX.Element => {
  return (
    <View style={[commonstyles.parent, { backgroundColor: colors.elearnhome.bgcolor }]}>
      {/* top header section */}
      <LinearGradient
        useAngle={true}
        angle={90}
        angleCenter={{ x: 0.5, y: 0 }}
        colors={colors.slmhome.gdcolor}
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

          <Text numberOfLines={2} style={styles.navHeading}>Let's do your part for the better future</Text>
        </View>
      </LinearGradient>

      {/* goal linear progress bar */}
      <View style={styles.progressBarWrap}>
        <View style={{ rowGap: 10 }}>
          <View style={[commonstyles.fdRow, { alignItems: "center" }]}>
            <Text style={styles.goalTxt}>Today's Goal</Text>
            <Image style={styles.arrow} source={icons.arrow} />
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: "45%" }]} />
          </View>
        </View>

        <View style={{ rowGap: 10 }}>
          <View style={[commonstyles.fdRow, { alignItems: "center" }]}>
            <Text style={styles.goalTxt}>Monthly Goal</Text>
            <Image style={styles.arrow} source={icons.arrow} />
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: "75%" }]} />
          </View>
        </View>
      </View>

      {/* body */}
      <View style={[commonstyles.parent, { marginTop: 50, paddingHorizontal: 30, marginBottom: Platform.OS === "ios" ? 25 : 5 }]}>
        <Text style={styles.heading}>Your Goals to Save the Planet</Text>

        {/* S L modules */}
        <View style={[commonstyles.parent, { marginTop: 10 }]}>
          <FlatList
            data={slmGoal}
            showsVerticalScrollIndicator={false}
            style={{ paddingTop: 15 }}
            numColumns={2}
            keyExtractor={(_, index) => index.toString()}
            columnWrapperStyle={[commonstyles.fdRow, commonstyles.acjsb, { marginBottom: 30 }]}
            renderItem={({ item, index }) => (
              <>
                <TouchableOpacity
                  style={[styles.module, commonstyles.acjc, { backgroundColor: item.bg }]}
                >
                  <Image style={styles.moduleImg} source={item.img} />
                  <Text style={styles.moduleName}>{item?.name}</Text>
                </TouchableOpacity>

                {slmGoal.length - 1 === index &&
                  <TouchableOpacity
                    style={[styles.module, commonstyles.acjc, { backgroundColor: colors.slmhome.addgoal }]}
                  >
                    <Text style={styles.moduleName}>+Add a Goal</Text>
                  </TouchableOpacity>
                }
              </>
            )}
          />
        </View>
      </View>
    </View>
  )
};

export default SustainableLivingHome;

const styles = StyleSheet.create({
  lgStyle: {
    width: "100%",
    ...Platform.select({
      ios: {
        height: _Height * 0.27,
      },
      android: {
        height: _Height * 0.29,
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
  progressBarWrap: {
    shadowColor: colors.slmhome.goalshadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.77,
    shadowRadius: 9.65,
    elevation: 9,
    paddingHorizontal: 15,
    paddingVertical: 25,
    backgroundColor: colors.white,
    marginTop: -80,
    marginHorizontal: 30,
    borderRadius: 22,
    rowGap: 20
  },
  arrow: {
    width: 18,
    height: 18,
    tintColor: colors.black,
    transform: [{ rotate: "180deg" }],
    ...Platform.select({
      android: { marginBottom: 3 }
    }),
  },
  goalTxt: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.black,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.slmhome.progressbarbg,
    borderRadius: 26,
  },
  progress: {
    height: 8,
    borderRadius: 26,
    backgroundColor: colors.slmhome.progress,
  },
  heading: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.black,
  },
  module: {
    width: (_Width - 100) / 2,
    borderRadius: 13.84,
    height: ((_Width - 60) / 2),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
    rowGap: 10,
  },
  moduleName: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.black,
  },
  moduleImg: {
    width: 56,
    height: 56,
  },
});