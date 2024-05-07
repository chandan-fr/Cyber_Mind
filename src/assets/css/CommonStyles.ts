import { Platform, StyleSheet } from "react-native";
import colors from "../../config/colors";
import { fonts } from "../../config/fonts";

export const commonstyles = StyleSheet.create({
    parent: {
        flex: 1,
    },

    // logo style
    logo: {
        width: 220,
        height: 277,
    },
    logoMid: {
        width: 189,
        height: 220,
        position: "absolute",
    },
    logoSmall: {
        width: 50,
        height: 65,
    },

    // alignments
    acje: {
        alignItems: "center",
        justifyContent: "flex-end",
    },
    acjsb: {
        alignItems: "center",
        justifyContent: "space-between",
    },
    acjc: {
        alignItems: "center",
        justifyContent: "center",
    },
    fdRow: {
        flexDirection: "row",
    },

    // input box style
    inputGrp: {
        borderRadius: 4,
    },
    inputBox: {
        height: 45,
        backgroundColor: colors.white,
        borderRadius: 4,
        paddingLeft: 15,
        color: colors.login.tint,
    },
    eye: {
        marginRight: 15,
        padding: 4,
    },

    // horizontal line
    hr: {
        height: 0.5,
        backgroundColor: colors.login.hr,
        flex: 1,
    },
    or: {
        fontSize: 18,
        color: colors.login.hr,
        fontFamily: fonts.semibold,
    },

    // social icon styles
    sclImg: {
        width: 20,
        height: 20
    },
    sclBtn: {
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 10,
    },

    // bottom navigation
    tabBarStyle: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        ...Platform.select({
            ios:{
                height: 72,
                shadowColor: colors.bottomnav.shadowcolor,
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowRadius: 5,
                shadowOpacity: 11,
                paddingTop: 15,
            },
            android:{
                shadowColor: colors.bottomnav.shadowcolor,
                elevation: 3,
                height: 58,
            }
        }),
        paddingHorizontal: 15,
        backgroundColor: colors.white,
    },
    tabIconStyle:{
        ...Platform.select({
            ios:{
            },
            android:{
                paddingBottom: 10,
            },
        }),
    },
});