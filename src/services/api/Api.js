import axios from "axios";
import { _Base_Url } from "../../config/staticVariables";
import store from "../store/GlobalStore";
import { logOut } from "../slices/UserSlice";
import { showModal } from "../slices/UtilitySlice";
import { CommonActions } from "@react-navigation/native";

const Api = axios.create({ baseURL: _Base_Url });

let navigationRef;

export const setNavigationRef = (ref) => {
    navigationRef = ref;
};

// network interceptor
Api.interceptors.response.use(
    response => new Promise((resolve, reject) => {
        resolve(response);
    }),
    error => {
        if (!error.response) {
            return new Promise((resolve, reject) => { reject(error) });
        }
        if (error.response.data.error === "jwt expired" && !error.response.data.success) {
            sessionExpired(error.response.data.message, navigationRef);
        } else {
            return new Promise((resolve, reject) => { reject(error) });
        }
    }
);

// session handler
const sessionExpired = (msg, navigation) => {
    const { dispatch } = store;
    dispatch(logOut());
    navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{ name: "welcomescreen" }]
        })
    );

    dispatch(showModal({ msg: msg, type: "error" }));
};

// API Instances
export const GETSLIDERDATA = () => Api.get("/get/welcome/sliders");
export const LOGIN = (loginData) => Api.post("/auth/user/login", loginData);
export const SOCIAL_LOGIN = (loginData) => Api.post("/auth/user/social", loginData);
export const REGISTER = (userData) => Api.post("/auth/user/register", userData);
export const ALLMEMBER = (_Header) => Api.get("/get/all/member", _Header);
export const ALLCATEGORY = (_Header) => Api.get("/get/all/category", _Header);
export const UPDATEUSER = (_Header, userData) => Api.post("/user/profile/update", userData, _Header);
export const ADDEVENT = (eventData, _Header) => Api.post("/add/event", eventData, _Header);
export const ALLEVENT = (_Header) => Api.get("/get/all/events", _Header);
export const ALLTRANSACTION = (_Header) => Api.get("/get/all/transactions", _Header);
export const ALLTRANSACTIONCATEGORY = (_Header) => Api.get("/get/all/tnx/category", _Header);
export const ADDTRANSACTION = (tnxData, _Header) => Api.post("/add/new/transaction", tnxData, _Header);
export const ALLTASK = (_Header) => Api.get("/get/all/task", _Header);
export const ADDTASK = (taskData, _Header) => Api.post("/add/task", taskData, _Header);