import { FlatList, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { commonstyles } from '../../assets/css/CommonStyles';
import { fonts } from '../../config/fonts';
import colors from '../../config/colors';
import { _Height, _Width } from '../../config/staticVariables';
import LinearGradient from 'react-native-linear-gradient';
import { icons } from '../../config/icons';
import { useSelector } from 'react-redux';
import { getImagUrl } from '../../utility/UtilityFunctions';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const AddTask = ({ navigation }: { navigation: any }): JSX.Element => {
  const { all_member } = useSelector((state: any) => state.userSlice);
  const [openDateModal, setOpenDateModal] = useState<boolean>(false);
  const [priorityCat, setPriorityCat] = useState<string>("Never");

  const onChange = (event: DateTimePickerEvent, date: Date | undefined) => {
    // setTnxData({ ...tnxData, date_time: convertToTimeStamp(date) });
    setOpenDateModal(false);
    // setTnxError({ ...tnxError, date_time: 0 });
  };

  return (
    <View style={[commonstyles.parent, { backgroundColor: colors.addtask.bgcolor }]}>
      {/* top header section */}
      <LinearGradient
        useAngle={true}
        angle={90}
        angleCenter={{ x: 0.5, y: 0 }}
        colors={colors.addtask.gdcolor}
        style={styles.lgStyle}
      >
        {/* navigation */}
        <View style={[styles.navWrap, commonstyles.fdRow]}>
          <TouchableOpacity
            style={[styles.nav, commonstyles.acjc]}
            onPress={() => navigation.goBack()}
          >
            <Image source={icons.arrow} style={styles.navImg} />
          </TouchableOpacity>

          <View style={commonstyles.parent}>
            <Text numberOfLines={2} style={styles.pageHeading}>New Task</Text>
          </View>

          <TouchableOpacity
            style={[styles.menu, commonstyles.acjc]}
          >
            <Image source={icons.dots} style={styles.menuImg} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* body */}
      <View style={[commonstyles.parent, { rowGap: 20, marginHorizontal: 25, marginTop: 30 }]}>
        {/* title */}
        <View style={[styles.inputWrap,]}>
          <Text style={styles.label}>Enter a Title</Text>

          <View style={[styles.inputGrp]}>
            <TextInput
              style={styles.inputBox}
            />
          </View>
        </View>

        {/* time */}
        <View style={[styles.inputWrap,]}>
          <Text style={styles.label}>Select a Time</Text>

          <View style={[styles.inputGrp, commonstyles.fdRow, commonstyles.acjsb, { columnGap: 6 }]}>
            <TextInput
              style={[styles.inputBox, commonstyles.parent]}
              editable={false}
            />

            {!openDateModal && <TouchableOpacity
              style={[commonstyles.acjc, { marginHorizontal: 8 }]}
              onPress={() => setOpenDateModal(true)}
            >
              <Image style={styles.calendar} source={icons.calendar} />
            </TouchableOpacity>}

            {openDateModal && <DateTimePicker
              value={new Date()}
              mode={'date'}
              is24Hour={false}
              onChange={onChange}
              style={{ position: "absolute", right: 3 }}
            />}
          </View>
        </View>

        {/* location */}
        <View style={[styles.inputWrap,]}>
          <Text style={styles.label}>Enter a Location (Optional)</Text>

          <View style={[styles.inputGrp]}>
            <TextInput
              style={styles.inputBox}
            />
          </View>
        </View>

        {/* members */}
        <View style={[]}>
          <Text style={styles.label}>Add Task Partner</Text>

          <View style={[styles.memberWrap, commonstyles.fdRow]}>
            {all_member.length ?
              <FlatList
                data={all_member.slice(0, 4)}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={styles.member}
                  >
                    <Image
                      source={item?.user?.profile_img ? { uri: getImagUrl(item?.user?.profile_img) } : icons.user_dumy}
                      style={styles.memberImg} />
                  </TouchableOpacity>
                )}
              />
              :
              <TouchableOpacity style={[commonstyles.acjc, styles.seeAllWrap]}>
                <Image source={icons.plus} style={[styles.menu]} />
              </TouchableOpacity>
            }

            {all_member.length > 4 &&
              <TouchableOpacity style={[commonstyles.acjc, styles.seeAllWrap]}>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            }
          </View>
        </View>

        {/* priority */}
        <View style={styles.inputWrap}>
          <Text style={styles.label}>Set Priority</Text>

          {/* menu */}
          <View style={[commonstyles.fdRow, commonstyles.acjsb, styles.priorityMenuWrap]}>
            <TouchableOpacity
              style={[styles.priorityCatMenu, commonstyles.acjc, { backgroundColor: priorityCat === "Never" ? colors.addtask.prtcatmenubg : "transparent" }]}
              onPress={() => setPriorityCat("Never")}
            >
              <Text style={[styles.priorityCatMenuTxt, { color: priorityCat === "Never" ? colors.white : colors.black }]}>Never</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.priorityCatMenu, commonstyles.acjc, { backgroundColor: priorityCat === "Daily" ? colors.addtask.prtcatmenubg : "transparent" }]}
              onPress={() => setPriorityCat("Daily")}
            >
              <Text style={[styles.priorityCatMenuTxt, { color: priorityCat === "Daily" ? colors.white : colors.black }]}>Daily</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.priorityCatMenu, commonstyles.acjc, { backgroundColor: priorityCat === "Weekly" ? colors.addtask.prtcatmenubg : "transparent" }]}
              onPress={() => setPriorityCat("Weekly")}
            >
              <Text style={[styles.priorityCatMenuTxt, { color: priorityCat === "Weekly" ? colors.white : colors.black }]}>Weekly</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.priorityCatMenu, commonstyles.acjc, { backgroundColor: priorityCat === "Monthly" ? colors.addtask.prtcatmenubg : "transparent" }]}
              onPress={() => setPriorityCat("Monthly")}
            >
              <Text style={[styles.priorityCatMenuTxt, { color: priorityCat === "Monthly" ? colors.white : colors.black }]}>Monthly</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* save */}
        <View style={[commonstyles.fdRow, commonstyles.acjsb, { marginTop: 40 }]}>
          <TouchableOpacity
            style={[styles.closeBtn, commonstyles.acjc]}
          >
            <Image style={styles.close} source={icons.close} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.saveBtn, commonstyles.acjc]}
          // onPress={handleEvent}
          >
            <Text style={styles.save}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};

export default AddTask;

const styles = StyleSheet.create({
  lgStyle: {
    width: "100%",
    height: _Height * 0.15,
  },
  navWrap: {
    marginHorizontal: 20,
    ...Platform.select({
      ios: { marginTop: 70, },
      android: { marginTop: 50, }
    }),
    alignItems: "center",
    justifyContent: "space-between",
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
  menu: {
    width: 30,
    height: 30,
  },
  menuImg: {
    width: 20,
    height: 20,
    tintColor: colors.white,
  },
  pageHeading: {
    ...Platform.select({
      ios: { fontSize: 22, },
      android: { fontSize: 20, }
    }),
    color: colors.white,
    fontFamily: fonts.semibold,
    textAlign: "center",
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.addtask.label,
  },
  memberWrap: {
    marginTop: 15,
  },
  member: {
    marginRight: 15,
  },
  memberImg: {
    ...Platform.select({
      ios: {
        width: 57,
        height: 57,
        borderRadius: 57,
      },
      android: {
        width: 50,
        height: 50,
        borderRadius: 50,
      }
    })
  },
  seeAllWrap: {
    backgroundColor: colors.addtask.seeall,
    ...Platform.select({
      ios: {
        width: 50,
        height: 50,
        borderRadius: 50,
      },
      android: {
        width: 50,
        height: 50,
        borderRadius: 50,
      }
    })
  },
  seeAll: {
    fontFamily: fonts.medium,
    color: colors.white,

    textAlign: "center",
    ...Platform.select({
      ios: {
        fontSize: 13,
        width: 35,
      },
      android: {
        fontSize: 12.1,
        width: 40,
      }
    })
  },
  inputWrap: {
    rowGap: 15,
  },
  inputBox: {
    borderRadius: 13,
    ...Platform.select({
      ios: { height: 45 },
      android: {}
    })
  },
  inputGrp: {
    backgroundColor: colors.white,
    borderRadius: 13,
  },
  calendar: {
    width: 30,
    height: 30,
    tintColor: colors.addtask.calendar,
  },
  close: {
    width: 15,
    height: 15,
    tintColor: colors.white,
  },
  closeBtn: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: colors.addevent.close,
  },
  saveBtn: {
    backgroundColor: colors.addevent.savebg,
    paddingVertical: 8,
    borderRadius: 21.5,
    width: (_Width / 1.6),
  },
  save: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.white,
  },
  priorityCatMenu: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  priorityCatMenuTxt: {
    fontSize: 12,
    fontFamily: fonts.medium,
  },
  priorityMenuWrap: {
    height: 48,
    backgroundColor: colors.white,
    borderRadius: 13,
    paddingHorizontal: 10,
  },
});