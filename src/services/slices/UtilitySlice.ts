import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GETSLIDERDATA } from "../api/Api";
import { Wlcm_Data } from "../../config/CustomTypes";

export const getSliderData = createAsyncThunk("/get/welcome/sliders", async ({ payload }: any, { rejectWithValue }) => {
    try {
        const resp = await GETSLIDERDATA();
        const data: Array<Wlcm_Data> = resp?.data?.data;
        if (resp?.data?.data.success === true) {
            return data;
        }
    } catch (exc: any) {
        return rejectWithValue(exc.response.data);
    }
});

const UtilitySlice = createSlice({
    name: "utilitySlice",
    initialState: {
        slider_data: [],
        utility_loading: false,
        error: null,
        modal_msg: null,
        modal_type : null,
        is_modal_visible: false,
    },
    reducers: {
        showModal(state, { payload }) {
            state.is_modal_visible = true;
            state.modal_msg = payload.msg;
            state.modal_type = payload.type;
        },
        hideModal(state) {
            state.is_modal_visible = false;
            state.modal_msg = null;
            state.modal_type = null;
        },
    },
    extraReducers: builder => {
        /* welcome slider data */
        builder.addCase(getSliderData.pending, (state, { payload }) => {
            state.utility_loading = true;
        })
        builder.addCase(getSliderData.fulfilled, (state, { payload }) => {
            state.utility_loading = false;
            const data: any = payload;
            state.slider_data = data;
        })
        builder.addCase(getSliderData.rejected, (state, { payload }) => {
            state.utility_loading = false;
            const err: any | null = payload;
            state.error = err;
        })
    }
});

export const { showModal, hideModal } = UtilitySlice.actions;
export default UtilitySlice.reducer;