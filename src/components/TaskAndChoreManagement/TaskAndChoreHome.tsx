import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { commonstyles } from '../../assets/css/CommonStyles';
import colors from '../../config/colors';
import { _Height } from '../../config/staticVariables';
import { images } from '../../config/images';
import { icons } from '../../config/icons';
import LinearGradient from 'react-native-linear-gradient';
import { fonts } from '../../config/fonts';
import EmptyData from '../../utility/EmptyData';
import TaskCard from './TaskCard';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { getAllTask } from '../../services/slices/UserSlice';
import { Task_Data, User_Data } from '../../config/CustomTypes';
import { convertToTimeStamp } from '../../utility/UtilityFunctions';


const TaskAndChoreHome = ({ navigation }: { navigation: any }): JSX.Element => {
    const { all_task, token } = useSelector((state: any) => state.userSlice);
    const [taskCat, setTaskCat] = useState<string>("Today");
    const _Header = { headers: { Authorization: "Bearer " + token } };

    const dispatch: Dispatch<any> = useDispatch();

    const getFilterData = () => {
        if (taskCat === "Today") {
            let data: Array<Task_Data<User_Data>> = all_task.filter((item: Task_Data<User_Data>) => {
                const date = new Date(item.task_time * 1000);
                const isSameDay = (d1: Date, d2: Date): boolean => d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
                if (isSameDay(date, new Date()) && !item.is_complete) {
                    return item;
                }
            });
            return data;
        } else if (taskCat === "Upcoming") {
            let data: Array<Task_Data<User_Data>> = all_task.filter((item: Task_Data<User_Data>) => item.task_time > convertToTimeStamp(new Date()) && !item.is_complete);
            return data;
        } else if (taskCat === "Done") {
            let data: Array<Task_Data<User_Data>> = all_task.filter((item: Task_Data<User_Data>) => item.is_complete);
            return data;
        }
    };

    useEffect(() => {
        dispatch(getAllTask({ _Header }));
    }, []);

    return (
        <View style={[commonstyles.parent]}>
            {/* top header section */}
            <LinearGradient
                useAngle={true}
                angle={90}
                angleCenter={{ x: 0.5, y: 0 }}
                colors={colors.tcmhome.gdcolor}
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
                        <Text numberOfLines={2} style={styles.pageHeading}>Task and Chore Management</Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.menu, commonstyles.acjc]}
                    >
                        <Image source={icons.dots} style={styles.menuImg} />
                    </TouchableOpacity>
                </View>

                <Image style={styles.imgBg} resizeMode='stretch' source={images.tcmnavbg} />
            </LinearGradient>

            {/* body */}
            <View style={[commonstyles.parent, { marginTop: 30 }]}>
                {/* header menu */}
                <View style={[commonstyles.fdRow, commonstyles.acjsb, { marginHorizontal: 30 }]}>
                    <TouchableOpacity
                        style={[styles.taskCatMenu, commonstyles.acjc, { backgroundColor: taskCat === "Today" ? colors.tcmhome.taskcatmenubg : "transparent" }]}
                        onPress={() => setTaskCat("Today")}
                    >
                        <Text style={[styles.taskCatMenuTxt, { color: taskCat === "Today" ? colors.white : colors.black }]}>Today</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.taskCatMenu, commonstyles.acjc, { backgroundColor: taskCat === "Upcoming" ? colors.tcmhome.taskcatmenubg : "transparent" }]}
                        onPress={() => setTaskCat("Upcoming")}
                    >
                        <Text style={[styles.taskCatMenuTxt, { color: taskCat === "Upcoming" ? colors.white : colors.black }]}>Upcoming</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.taskCatMenu, commonstyles.acjc, { backgroundColor: taskCat === "Done" ? colors.tcmhome.taskcatmenubg : "transparent" }]}
                        onPress={() => setTaskCat("Done")}
                    >
                        <Text style={[styles.taskCatMenuTxt, { color: taskCat === "Done" ? colors.white : colors.black }]}>Done</Text>
                    </TouchableOpacity>
                </View>

                {/* tasks */}
                <View style={[commonstyles.parent, { marginTop: 30, marginHorizontal: 20 }]}>
                    {/* task head */}
                    <View style={[commonstyles.fdRow, commonstyles.acjsb, { marginHorizontal: 15 }]}>
                        <Text style={styles.taskHeading}>Tasks</Text>

                        <TouchableOpacity
                            style={[styles.addTaskBtn, commonstyles.acjc]}
                            onPress={() => navigation.navigate("addtask")}
                        >
                            <Image source={icons.plus} style={styles.plus} />
                        </TouchableOpacity>
                    </View>

                    {/* all tasks */}
                    {getFilterData()?.length ?
                        <View style={[commonstyles.parent, { marginHorizontal: 5, marginTop: 15, marginBottom: Platform.OS === "ios" ? 25 : 5 }]}>
                            <FlatList
                                data={getFilterData()}
                                style={{ paddingTop: 15 }}
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                                columnWrapperStyle={[commonstyles.fdRow, { alignItems: "center", justifyContent: "space-between", marginBottom: 15 }]}
                                keyExtractor={(_, index: number) => index.toString()}
                                renderItem={({ item, index }) => (
                                    <TaskCard item={item} navigation={navigation} _Header={_Header} dispatch={dispatch} />
                                )}
                            />
                        </View>
                        :
                        <EmptyData msg={"No Task Found!"} lifted />
                    }
                </View>
            </View>
        </View>
    )
};

export default TaskAndChoreHome;

const styles = StyleSheet.create({
    lgStyle: {
        width: "100%",
        ...Platform.select({
            ios: {
                height: _Height * 0.19,
            },
            android: {
                height: _Height * 0.21,
            }
        }),
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    navWrap: {
        marginHorizontal: 20,
        ...Platform.select({
            ios: { marginTop: 70, },
            android: { marginTop: 60, }
        }),
        alignItems: "center",
        justifyContent: "space-between",
        columnGap: 20,
        zIndex: 1,
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
    imgBg: {
        width: "100%",
        height: "100%",
        position: "absolute",
        borderRadius: 20,
    },
    taskCatMenu: {
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    taskCatMenuTxt: {
        fontSize: 15,
        fontFamily: fonts.medium,
    },
    addTaskBtn: {
        backgroundColor: colors.fchome.addeventbg,
        width: 40,
        height: 40,
        borderRadius: 30,
    },
    plus: {
        width: 15,
        height: 15,
        tintColor: colors.white,
    },
    taskHeading: {
        fontSize: 22,
        color: colors.black,
        fontFamily: fonts.semibold,
    },
});