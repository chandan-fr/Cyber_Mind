import { FlatList, Image, Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { commonstyles } from '../../assets/css/CommonStyles';
import { fonts } from '../../config/fonts';
import colors from '../../config/colors';
import { _Height, _Width } from '../../config/staticVariables';
import LinearGradient from 'react-native-linear-gradient';
import { icons } from '../../config/icons';
import { useDispatch, useSelector } from 'react-redux';
import { convertToTimeStamp, getDateTimeFromTimestamp, getFormatedDateTime, getImagUrl } from '../../utility/UtilityFunctions';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Task_Error, Task_Form } from '../../config/CustomTypes';
import { Dispatch } from 'redux';
import { showModal } from '../../services/slices/UtilitySlice';
import { addUserTask } from '../../services/slices/UserSlice';

const AddTask = ({ navigation }: { navigation: any }): JSX.Element => {
  const { all_member, token } = useSelector((state: any) => state.userSlice);
  const [openDateModal, setOpenDateModal] = useState<boolean>(false);
  const [mode, setMode] = useState<any>('date');
  const [time, setTime] = useState<{ inputdate: string | undefined, inputtime: string | undefined }>({ inputdate: "", inputtime: "" });
  const [taskData, setTaskData] = useState<Task_Form>({ task_title: "", task_time: 0, location: "", task_partner: [], priority: "Never" });
  const [taskError, setTaskError] = useState<Task_Error>({});
  const _Header = { headers: { Authorization: "Bearer " + token } };

  const dispatch: Dispatch<any> = useDispatch();

  const onChange = (event: DateTimePickerEvent, date: Date | undefined) => {
    if (mode === 'date') {
      setTime({ ...time, inputdate: date?.toISOString().split("T")[0] })
      setOpenDateModal(false);
      setMode('time');
    }
    else {
      setTime({ ...time, inputtime: date?.toISOString().split("T")[1] })
      setOpenDateModal(false);
      setMode('date');
    }
    setTaskError({ ...taskError, task_time: 0 });
  };

  const validateTaskData = (): Task_Error => {
    const error: Task_Error = {};
    const { task_title, task_time, task_partner } = taskData;

    if (!task_title) {
      error.task_title = "Task Name is Required!";
      dispatch(showModal({ msg: "Task Name is Required!", type: "error" }));
    }
    else if (!(time.inputdate && time.inputtime)) {
      error.task_time = 1;
      dispatch(showModal({ msg: "Please Select a Date & Time for Task!", type: "error" }));
    }
    else if (!task_partner?.length) {
      error.task_partner = ["1"];
      dispatch(showModal({ msg: "Please add atleast one task partner!", type: "error" }));
    }

    return error;
  };

  const handleTask = () => {
    const validationErrors: any = validateTaskData();
    setTaskError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      taskData.task_time = convertToTimeStamp(new Date(`${time.inputdate}T${time.inputtime}`));
      dispatch(addUserTask({ taskData, _Header, navigation }));
      // setEventData({ event_name: "", event_start_timestamp: 0, event_end_timestamp: 0, alert: "", repeat: "", location: "", url: "", note: "", is_allDay: false });
    }
  };

  const assignMenber = (id: string) => {
    let data: Array<string> | undefined = taskData.task_partner;
    if (!data?.includes(id)) {
      data?.push(id);
      setTaskData({ ...taskData, task_partner: data });
    } else {
      const newArray = data?.filter((element: string) => element !== id);
      setTaskData({ ...taskData, task_partner: newArray });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

            <View style={[styles.inputGrp, { borderColor: taskError.task_title ? colors.addtask.error : colors.white }]}>
              <TextInput
                style={styles.inputBox}
                value={taskData.task_title}
                onChangeText={value => setTaskData({ ...taskData, task_title: value })}
                onFocus={() => setTaskError({ ...taskError, task_title: "" })}
              />
            </View>
          </View>

          {/* time */}
          <View style={[styles.inputWrap,]}>
            <Text style={styles.label}>Select a Time</Text>

            <View style={[styles.inputGrp, commonstyles.fdRow, commonstyles.acjsb, { columnGap: 6, borderColor: taskError.task_time ? colors.addtask.error : colors.white }]}>
              <TextInput
                style={[styles.inputBox, commonstyles.parent]}
                editable={false}
                value={
                  time?.inputdate && time?.inputtime ?
                    getFormatedDateTime(`${time.inputdate}T${time.inputtime}`, "date") + ", " + getFormatedDateTime(`${time.inputdate}T${time.inputtime}`, "time")
                    :
                    undefined
                }
              />

              {!openDateModal && <TouchableOpacity
                style={[commonstyles.acjc, { marginHorizontal: 8 }]}
                onPress={() => setOpenDateModal(true)}
              >
                <Image style={styles.calendar} source={mode === "date" ? icons.calendar : icons.timer} />
              </TouchableOpacity>}

              {openDateModal && <DateTimePicker
                value={new Date()}
                mode={mode}
                is24Hour={false}
                onChange={onChange}
                style={{ position: "absolute", right: 3 }}
              />}
            </View>
          </View>

          {/* location */}
          <View style={[styles.inputWrap,]}>
            <Text style={styles.label}>Enter a Location (Optional)</Text>

            <View style={[styles.inputGrp, { borderColor: taskError.location ? colors.addtask.error : colors.white }]}>
              <TextInput
                style={styles.inputBox}
                value={taskData.location}
                onChangeText={value => setTaskData({ ...taskData, location: value })}
              />
            </View>
          </View>

          {/* members */}
          <View style={[]}>
            <Text style={[styles.label, { color: taskError.task_partner?.length ? colors.addtask.error : colors.addtask.label }]}>Add Task Partner</Text>

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
                      onPress={() => assignMenber(item?.user?._id)}
                    >
                      <Image
                        source={item?.user?.profile_img ? { uri: getImagUrl(item?.user?.profile_img) } : icons.user_dumy}
                        style={styles.memberImg}
                      />

                      {taskData.task_partner?.includes(item?.user?._id) && <Image style={styles.selected} source={icons.checkcircle} />}
                    </TouchableOpacity>
                  )}
                />
                :
                <TouchableOpacity style={[commonstyles.acjc, styles.seeAllWrap]}>
                  <Image source={icons.plus} style={[styles.plusImg]} />
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
                style={[styles.priorityCatMenu, commonstyles.acjc, { backgroundColor: taskData.priority === "Never" ? colors.addtask.prtcatmenubg : "transparent" }]}
                onPress={() => setTaskData({ ...taskData, priority: "Never" })}
              >
                <Text style={[styles.priorityCatMenuTxt, { color: taskData.priority === "Never" ? colors.white : colors.black }]}>Never</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.priorityCatMenu, commonstyles.acjc, { backgroundColor: taskData.priority === "Daily" ? colors.addtask.prtcatmenubg : "transparent" }]}
                onPress={() => setTaskData({ ...taskData, priority: "Daily" })}
              >
                <Text style={[styles.priorityCatMenuTxt, { color: taskData.priority === "Daily" ? colors.white : colors.black }]}>Daily</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.priorityCatMenu, commonstyles.acjc, { backgroundColor: taskData.priority === "Weekly" ? colors.addtask.prtcatmenubg : "transparent" }]}
                onPress={() => setTaskData({ ...taskData, priority: "Weekly" })}
              >
                <Text style={[styles.priorityCatMenuTxt, { color: taskData.priority === "Weekly" ? colors.white : colors.black }]}>Weekly</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.priorityCatMenu, commonstyles.acjc, { backgroundColor: taskData.priority === "Monthly" ? colors.addtask.prtcatmenubg : "transparent" }]}
                onPress={() => setTaskData({ ...taskData, priority: "Monthly" })}
              >
                <Text style={[styles.priorityCatMenuTxt, { color: taskData.priority === "Monthly" ? colors.white : colors.black }]}>Monthly</Text>
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
              onPress={() => handleTask()}
            >
              <Text style={styles.save}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  plusImg: {
    width: 25,
    height: 25,
    tintColor: colors.white,
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
    }),
    paddingLeft: 15,
    color: colors.black,
    fontSize: 15,
    fontFamily: fonts.regular,
  },
  inputGrp: {
    backgroundColor: colors.white,
    borderRadius: 13,
    borderWidth: 1,
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
  selected: {
    width: 15,
    height: 15,
    position: "absolute",
    right: 0,
  },
});