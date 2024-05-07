import { Image, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { commonstyles } from '../assets/css/CommonStyles';
import colors from '../config/colors';
import { icons } from '../config/icons';
import { images } from '../config/images';
import GradientButton from '../utility/GradientButton';
import { fonts } from '../config/fonts';
import { Form_Error, Signup_Data } from '../config/CustomTypes';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../services/slices/UserSlice';
import { googleSignin } from '../config/SocialLogin';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { _Client_ID, emailRegex, nameRegex, passRegex } from '../config/staticVariables';
import Loader from '../utility/Loader';
import { showModal } from '../services/slices/UtilitySlice';


const SignUp = ({ navigation }: { navigation: any }): JSX.Element => {
    const { user_loading, error } = useSelector((state: any) => state.userSlice);
    const [showPswd, setShowPswd] = useState<boolean>(false);
    const [formData, setFormData] = useState<Signup_Data>({ full_name: "", email: "", password: "", type: "user" });
    const [formError, setFormError] = useState<Form_Error>({});

    const dispatch: any = useDispatch();

    const handleSignup = async (): Promise<void> => {
        const validationErrors: any = validateForm();
        setFormError(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            dispatch(userRegister({ formData, navigation }));
            setFormData({ full_name: "", email: "", password: "", type: "user" });
        }
    };

    const validateForm = () => {
        const error: Form_Error = {};
        const { full_name, email, password } = formData;

        if (!full_name) {
            error.full_name = "Full Name is required!";
            dispatch(showModal({ msg: "Full Name is required!", type: "error" }));
        } else if (!nameRegex.test(full_name)) {
            error.full_name = "Alphabets and blank space only!";
            dispatch(showModal({ msg: "Alphabets and blank space only!", type: "error" }));
        }

        if (!password) {
            error.password = "Password is required!";
        } else if (password.length < 8) {
            error.password = "Password should be minimum 8 characters long!";
            dispatch(showModal({ msg: "Password should be minimum 8 characters long!", type: "error" }));
        } else if (password.length > 16) {
            error.password = "Password should not contain more than 16 characters!";
            dispatch(showModal({ msg: "Password should not contain more than 16 characters!", type: "error" }));
        } else if (!passRegex.test(password)) {
            error.password = "Password must contain at least one uppercase letter, one lowercase letter, one number & one special character!";
            dispatch(showModal({ msg: "Password must contain at least one uppercase letter, one lowercase letter, one number & one special character!", type: "error" }));
        }

        if (!email) {
            error.email = "Email is required!";
        } else if (!emailRegex.test(email)) {
            error.email = "Inalid Email format!";
            dispatch(showModal({ msg: "Inalid Email format!", type: "error" }));
        }

        return error;
    };

    useEffect(() => {
        GoogleSignin.configure({ webClientId: _Client_ID });
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={[commonstyles.parent, { backgroundColor: colors.login.bgcolor }]}>
                <View style={{}}>
                    <TouchableOpacity
                        style={[commonstyles.fdRow, styles.navBtn]}
                        onPress={() => navigation.navigate("welcomescreen")}
                    >
                        <Image style={styles.arrow} source={icons.arrow} />
                        <Text style={styles.navTxt}>Sign up</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: "center", marginTop: 30 }}>
                    <Image style={{ width: 130, height: 160 }} source={images.logo} />
                </View>

                {/* inputs */}
                <View style={{ marginTop: 60, marginHorizontal: 30, rowGap: 20 }}>
                    {/* full name */}
                    <View style={[commonstyles.inputGrp, { borderColor: formError.full_name ? colors.login.error : "", borderWidth: formError.full_name ? 1 : 0 }]}>
                        <TextInput
                            style={commonstyles.inputBox}
                            placeholder='Full Name'
                            placeholderTextColor={colors.login.tint}
                            value={formData.full_name}
                            onChangeText={value => setFormData({ ...formData, full_name: value })}
                            autoCapitalize='none'
                            onFocus={() => setFormError({ ...formError, full_name: "" })}
                        />
                    </View>

                    {/* password */}
                    <View style={[commonstyles.inputGrp, commonstyles.fdRow, { alignItems: "center", backgroundColor: colors.white, borderColor: formError.password ? colors.login.error : "", borderWidth: formError.password ? 1 : 0 }]}>
                        <TextInput
                            style={[commonstyles.inputBox, { flex: 1 }]}
                            placeholder='Password'
                            placeholderTextColor={colors.login.tint}
                            secureTextEntry={!showPswd}
                            value={formData.password}
                            onChangeText={value => setFormData({ ...formData, password: value })}
                            autoCapitalize='none'
                            onFocus={() => setFormError({ ...formError, password: "" })}
                        />
                        <TouchableOpacity
                            style={commonstyles.eye}
                            onPress={() => setShowPswd(!showPswd)}
                        >
                            <Image style={{ width: 22, height: 22, tintColor: colors.login.tint }} source={showPswd ? icons.view : icons.hide} />
                        </TouchableOpacity>
                    </View>

                    {/* email */}
                    <View style={[commonstyles.inputGrp, { borderColor: formError.email ? colors.login.error : "", borderWidth: formError.email ? 1 : 0 }]}>
                        <TextInput
                            style={commonstyles.inputBox}
                            placeholder='Email'
                            placeholderTextColor={colors.login.tint}
                            keyboardType='email-address'
                            value={formData.email}
                            onChangeText={value => setFormData({ ...formData, email: value })}
                            autoCapitalize='none'
                            onFocus={() => setFormError({ ...formError, email: "" })}
                        />
                    </View>

                    <GradientButton title='Sign Up' height={40} onPress={handleSignup} size={16} radius={25} />
                </View>

                {/* divider */}
                <View style={[commonstyles.fdRow, styles.divider, { justifyContent: "space-between" }]}>
                    <View style={commonstyles.hr} />
                    <Text style={commonstyles.or}>or</Text>
                    <View style={commonstyles.hr} />
                </View>

                {/* social media */}
                <View style={[commonstyles.fdRow, styles.divider, { columnGap: 25, justifyContent: "center" }]}>
                    {/* facebook */}
                    <TouchableOpacity
                        style={[commonstyles.sclBtn, commonstyles.acjc]}
                    >
                        <Image style={commonstyles.sclImg} source={icons.facebook} />
                    </TouchableOpacity>

                    {/* google */}
                    <TouchableOpacity
                        style={[commonstyles.sclBtn, commonstyles.acjc]}
                        onPress={() => googleSignin(dispatch, navigation)}
                    >
                        <Image style={commonstyles.sclImg} source={icons.google} />
                    </TouchableOpacity>
                </View>

                {/* footer */}
                <View style={[commonstyles.acjc, { marginTop: 40, marginHorizontal: 45 }]}>
                    <Text style={styles.acc}>By Continuing, you agree to our <Text style={styles.signup} onPress={() => navigation.navigate("")}>Terms of service & Privacy Policy</Text>
                    </Text>
                </View>

                <Loader visible={user_loading} />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
};

export default SignUp;

const styles = StyleSheet.create({
    navBtn: {
        alignSelf: "flex-start",
        alignItems: "center",
        paddingHorizontal: 5,
        paddingVertical: 3,
        columnGap: 3,
        marginLeft: 6,
    },
    arrow: {
        width: 20,
        height: 30,
    },
    navTxt: {
        color: colors.black,
        fontSize: 20,
        fontFamily: fonts.medium,
    },
    frgtPswd: {
        fontSize: 12,
        fontFamily: fonts.medium,
        color: colors.login.frgtpswd,
        textDecorationLine: "underline",
    },
    divider: {
        marginHorizontal: 50,
        marginTop: 40,
        columnGap: 20,
        alignItems: "center",
    },
    rmbrMe: {
        fontSize: 12,
        fontFamily: fonts.medium,
        color: colors.login.frgtpswd,
    },
    acc: {
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.login.footer,
        textAlign: "center",
    },
    signup: {
        fontFamily: fonts.medium,
        fontSize: 12,
        textDecorationLine: "underline",
        color: colors.login.footer,
    },
});