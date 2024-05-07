import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { userSocialLogin } from "../services/slices/UserSlice";
import { showModal } from "../services/slices/UtilitySlice";

export const googleSignin = async (dispatch: any, navigation: any): Promise<void> => {
    try {
        await GoogleSignin.hasPlayServices();
        const res: any = await GoogleSignin.signIn();
        const { idToken, user } = res;

        if (user) {
            const loginData = {
                email: user.email,
                uid: user.id,
                displayName: user.name,
                photoURL: user.photo,
                phoneNumber: user.phone ? user.phone : "",
                providerId: "google.com",
            };

            dispatch(userSocialLogin({ loginData, navigation }));
        }
    } catch (exc: any) {
        if (exc.code === statusCodes.SIGN_IN_CANCELLED || exc.code === statusCodes.IN_PROGRESS || exc.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            dispatch(showModal({ msg: exc.message, type: "error" }));
        } else {
            dispatch(showModal({ msg: exc.message, type: "error" }));
        }
    }
};