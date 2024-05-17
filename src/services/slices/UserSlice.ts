import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ALLCATEGORY, ALLEVENT, ALLMEMBER, LOGIN, REGISTER, SOCIAL_LOGIN, UPDATEUSER } from "../api/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { showModal } from "./UtilitySlice";
import axios from "axios";
import { _Base_Url } from "../../config/staticVariables";

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

export const userDataUpdate = createAsyncThunk("/user/profile/update", async ({ _Header, formData }: any, { rejectWithValue, dispatch }) => {
    try {
        const resp: any = await UPDATEUSER(_Header, formData);

        if (resp.data.success) {
            AsyncStorage.setItem("@user", JSON.stringify(resp.data.data));
            AsyncStorage.setItem("@token", resp.data.token);
            dispatch(showModal({ msg: resp.data.message, type: "success" }));
            return { user: resp.data.data, token: resp.data.token };
        }
    } catch (exc: any) {
        dispatch(showModal({ msg: exc.response.data.message, type: "error" }));
        return rejectWithValue(exc.response.data);
    }
});

export const userImageUpdate = createAsyncThunk("/user/profile/image/update", async ({ profile_img, token }: any, { rejectWithValue, dispatch }) => {
    const config: any = {
        method: "POST",
        url: _Base_Url + "/user/profile/image/update",
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": 'multipart/form-data',
        },
        data: profile_img,
    };

    try {
        const resp: any = await axios(config);

        if (resp.data.success) {
            AsyncStorage.setItem("@user", JSON.stringify(resp.data.data));
            AsyncStorage.setItem("@token", resp.data.token);
            dispatch(showModal({ msg: resp.data.message, type: "success" }));
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
        dispatch(showModal({ msg: exc.response.data.message, type: "error" }));
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
        dispatch(showModal({ msg: exc.response.data.message, type: "error" }));
        return rejectWithValue(exc.response.data);
    }
});

export const getAllEvents = createAsyncThunk('/get/all/events', async ({ _Header }: any, { rejectWithValue, dispatch }) => {
    try {
        const resp: any = await ALLEVENT(_Header);

        if (resp.data.success) {
            console.log(resp.data.data);
            
            return resp.data.data;
        }
    } catch (exc: any) {
        dispatch(showModal({ msg: exc.response.data.message, type: "error" }));
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
        all_events: [],
    },
    reducers: {
        saveUserCred(state, { payload }) {
            state.saved_user = payload
        },
        logOut(state) {
            console.log("called");
            state.user = null;
            state.token = null;
            AsyncStorage.removeItem("@user");
            AsyncStorage.removeItem("token");
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

        /* user update */
        builder.addCase(userDataUpdate.pending, (state, { payload }) => {
            state.user_loading = true;
        })
        builder.addCase(userDataUpdate.fulfilled, (state, { payload }) => {
            state.user_loading = false;
            state.user = payload?.user;
            state.token = payload?.token;
        })
        builder.addCase(userDataUpdate.rejected, (state, { payload }) => {
            state.user_loading = false;
            const err: any | null = payload;
            state.error = err;
        })

        /* user image update */
        builder.addCase(userImageUpdate.pending, (state, { payload }) => {
            state.user_loading = true;
        })
        builder.addCase(userImageUpdate.fulfilled, (state, { payload }) => {
            state.user_loading = false;
            state.user = payload?.user;
            state.token = payload?.token;
        })
        builder.addCase(userImageUpdate.rejected, (state, { payload }) => {
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
        })

        /* all events */
        builder.addCase(getAllEvents.pending, (state, { payload }) => {
            state.user_loading = true;
        })
        builder.addCase(getAllEvents.fulfilled, (state, { payload }) => {
            state.user_loading = false;
            state.all_events = payload;
        })
        builder.addCase(getAllEvents.rejected, (state, { payload }) => {
            state.user_loading = false;
            const err: any | null = payload;
            state.error = err;
        })
    }
});

export const { saveUserCred, logOut, loginByAsyncStorage } = UserSlice.actions;
export default UserSlice.reducer;