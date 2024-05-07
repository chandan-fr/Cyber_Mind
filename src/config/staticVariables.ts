import { Dimensions } from "react-native";
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
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
export const nameRegex = /^[a-zA-Z ]+$/;
export const numericRegex = /^[0-9]+$/;