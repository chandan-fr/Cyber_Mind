import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ALLCATEGORY, ALLMEMBER, LOGIN, REGISTER, SOCIAL_LOGIN } from "../api/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { showModal } from "./UtilitySlice";

export const userLogin = createAsyncThunk("/auth/user/login", async ({ loginData, navigation, toggleChkbox }: any, { rejectWithValue, dispatch }) => {
    try {
        const resp: any = await LOGIN(loginData);

        if (resp.data.success) {
            if (toggleChkbox) {
                AsyncStorage.setItem("@logincred", JSON.stringify({ credential: loginData.credential, password: loginData.password, remember_me: toggleChkbox }));
            } else {
                AsyncStorage.removeItem("@logincred");
            }
            AsyncStorage.setItem("@user", JSON.stringify(resp.data.data));
            AsyncStorage.setItem("@token", resp.data.token);
            navigation.replace("drawernav");
            return { user: resp.data.data, token: resp.data.token };
        }
    } catch (exc: any) {
        dispatch(showModal({ msg: exc.response.data.message, type: "error" }));
        return rejectWithValue(exc.response.data);
    }
});

export const userSocialLogin = createAsyncThunk("/auth/user/social", async ({ loginData, navigation }: any, { rejectWithValue }) => {
    try {
        const resp: any = await SOCIAL_LOGIN(loginData);

        if (resp.data.success) {
            AsyncStorage.setItem("@user", JSON.stringify(resp.data.data));
            AsyncStorage.setItem("@token", resp.data.token);
            navigation.replace("drawernav");
            return { user: resp.data.data, token: resp.data.token };
        }
    } catch (exc: any) {
        Alert.alert(exc.response.data.message);
        return rejectWithValue(exc.response.data);
    }
});

export const userRegister = createAsyncThunk("/auth/user/register", async ({ formData, navigation }: any, { rejectWithValue, dispatch }) => {
    try {
        const resp: any = await REGISTER(formData);

        if (resp.data.success) {
            AsyncStorage.setItem("@user", JSON.stringify(resp.data.data));
            AsyncStorage.setItem("@token", resp.data.token);
            navigation.replace("drawernav");
            return { user: resp.data.data, token: resp.data.token };
        }
    } catch (exc: any) {
        dispatch(showModal({ msg: exc.response.data.message, type: "error" }));
        return rejectWithValue(exc.response.data);
    }
});

export const getAllMember = createAsyncThunk("/get/all/member", async ({ _Header, navigation }: any, { rejectWithValue, dispatch }) => {
    try {
        const resp: any = await ALLMEMBER(_Header);

        if (resp.data.success) {
            return resp.data.data;
        }
    } catch (exc: any) {
        if (exc.response.data.error === "jwt expired") {
            AsyncStorage.removeItem("@user");
            AsyncStorage.removeItem("token");
            dispatch(showModal({ msg: exc.response.data.message, type: "error" }));
            navigation.replace("welcomescreen");
        } else {
            dispatch(showModal({ msg: exc.response.data.message, type: "error" }));
        }
        return rejectWithValue(exc.response.data);
    }
});

export const getAllCategory = createAsyncThunk("/get/all/category", async ({ _Header, navigation }: any, { rejectWithValue, dispatch }) => {
    try {
        const resp: any = await ALLCATEGORY(_Header);

        if (resp.data.success) {
            return resp.data.data;
        }
    } catch (exc: any) {
        if (exc.response.data.error === "jwt expired") {
            AsyncStorage.removeItem("@user");
            AsyncStorage.removeItem("token");
            dispatch(showModal({ msg: exc.response.data.message, type: "error" }));
            navigation.replace("welcomescreen");
        } else {
            dispatch(showModal({ msg: exc.response.data.message, type: "error" }));
        }
        return rejectWithValue(exc.response.data);
    }
});

const UserSlice = createSlice({
    name: "userSlice",
    initialState: {
        user_loading: false,
        error: null,
        user: null,
        token: null,
        saved_user: {},
        all_member: [],
        all_category: [],
    },
    reducers: {
        saveUserCred(state, { payload }) {
            state.saved_user = payload
        },
        logOut(state, { payload }) {
            state.user = null;
            state.token = null;
            AsyncStorage.removeItem("@user");
            AsyncStorage.removeItem("token");
            payload.replace("welcomescreen");
        },
        loginByAsyncStorage(state, { payload }) {
            state.user = payload.user;
            state.token = payload.token;
        },
    },
    extraReducers: builder => {
        /* user login */
        builder.addCase(userLogin.pending, (state, { payload }) => {
            state.user_loading = true;
        })
        builder.addCase(userLogin.fulfilled, (state, { payload }) => {
            state.user_loading = false;
            state.user = payload?.user;
            state.token = payload?.token;
        })
        builder.addCase(userLogin.rejected, (state, { payload }) => {
            state.user_loading = false;
            const err: any | null = payload;
            state.error = err;
        })

        /* user social login */
        builder.addCase(userSocialLogin.pending, (state, { payload }) => {
            state.user_loading = true;
        })
        builder.addCase(userSocialLogin.fulfilled, (state, { payload }) => {
            state.user_loading = false;
            state.user = payload?.user;
            state.token = payload?.token;
        })
        builder.addCase(userSocialLogin.rejected, (state, { payload }) => {
            state.user_loading = false;
            const err: any | null = payload;
            state.error = err;
        })

        /* user register */
        builder.addCase(userRegister.pending, (state, { payload }) => {
            state.user_loading = true;
        })
        builder.addCase(userRegister.fulfilled, (state, { payload }) => {
            state.user_loading = false;
            state.user = payload?.user;
            state.token = payload?.token;
        })
        builder.addCase(userRegister.rejected, (state, { payload }) => {
            state.user_loading = false;
            const err: any | null = payload;
            state.error = err;
        })

        /* all member */
        builder.addCase(getAllMember.pending, (state, { payload }) => {
            state.user_loading = true;
        })
        builder.addCase(getAllMember.fulfilled, (state, { payload }) => {
            state.user_loading = false;
            state.all_member = payload;
        })
        builder.addCase(getAllMember.rejected, (state, { payload }) => {
            state.user_loading = false;
            const err: any | null = payload;
            state.error = err;
            if (err?.error === "jwt expired") {
                state.user = null;
                state.token = null;
            }
        })

        /* all category */
        builder.addCase(getAllCategory.pending, (state, { payload }) => {
            state.user_loading = true;
        })
        builder.addCase(getAllCategory.fulfilled, (state, { payload }) => {
            state.user_loading = false;
            state.all_category = payload;
        })
        builder.addCase(getAllCategory.rejected, (state, { payload }) => {
            state.user_loading = false;
            const err: any | null = payload;
            state.error = err;
            if (err?.error === "jwt expired") {
                state.user = null;
                state.token = null;
            }
        })
    }
});

export const { saveUserCred, logOut, loginByAsyncStorage } = UserSlice.actions;
export default UserSlice.reducer;