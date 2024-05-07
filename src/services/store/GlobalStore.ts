import { configureStore } from "@reduxjs/toolkit";
import UtilitySlice from "../slices/UtilitySlice";
import UserSlice from "../slices/UserSlice";

const store: any = configureStore({
    reducer: {
        utilitySlice: UtilitySlice,
        userSlice: UserSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;