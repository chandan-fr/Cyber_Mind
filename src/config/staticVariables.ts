import { Dimensions, Permission, PermissionsAndroid, Platform } from "react-native";
import { Wlcm_Data } from "./CustomTypes";

export const wlcmData: Array<Wlcm_Data> = [
    {
        heading: "Welcome To Cybermind 1",
        para: "Aenean lacus sapien, bibendum vitae imperdiet et, sodales id purus.",
        scr_img: require("../assets/images/wlcm1.png"),
    },
    {
        heading: "Welcome To Cybermind 2",
        para: "Aenean lacus sapien, bibendum vitae imperdiet et, sodales id purus.",
        scr_img: require("../assets/images/wlcm2.png"),
    },
    {
        heading: "Welcome To Cybermind 3",
        para: "Aenean lacus sapien, bibendum vitae imperdiet et, sodales id purus.",
        scr_img: require("../assets/images/wlcm3.png"),
    },
];

export const _Width: number = Dimensions.get("window").width;
export const _Height: number = Dimensions.get("window").height;
export const _Base_Url: string = "http://192.168.7.231:4040/api";
export const _Image_Url: string = "http://192.168.7.231:4040";
export const _Client_ID: string = "279513793062-spf0sukctlpjgs78usr900b22oje863j.apps.googleusercontent.com";
export const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
export const nameRegex: RegExp = /^[a-zA-Z ]+$/;
export const numericRegex: RegExp = /^[0-9]+$/;
export const Gallery_Permission: Permission = Number(Platform.Version) >= 33 ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

export const _CellWidth: number = (_Width - 44.46) / 7;
export const monthsArray: Array<{ [key: string]: string | number }> = [
    { monthIndex: 0, monthName: "Jan" },
    { monthIndex: 1, monthName: "Feb" },
    { monthIndex: 2, monthName: "Mar" },
    { monthIndex: 3, monthName: "Apr" },
    { monthIndex: 4, monthName: "May" },
    { monthIndex: 5, monthName: "Jun" },
    { monthIndex: 6, monthName: "Jul" },
    { monthIndex: 7, monthName: "Aug" },
    { monthIndex: 8, monthName: "Sep" },
    { monthIndex: 9, monthName: "Oct" },
    { monthIndex: 10, monthName: "Nov" },
    { monthIndex: 11, monthName: "Dec" }
];

export const alertOptions: { [key: string]: string } = {
    optn1: "At time of event",
    optn2: "10 mins before",
    optn3: "1 hour before",
    optn4: "1 day before",
};

export const eventColor: Array<string> = ["#B0C2FF", "#F6BDFF", "#FF9B96", "#B0C2FF", "#F6BDFF", "#FF9B96"]