import { Image, Keyboard, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { commonstyles } from '../assets/css/CommonStyles';
import colors from '../config/colors';
import { icons } from '../config/icons';
import { fonts } from '../config/fonts';
import { images } from '../config/images';
import GradientButton from '../utility/GradientButton';
import CheckBox from '@react-native-community/checkbox';
import { Form_Error, Login_Data } from '../config/CustomTypes';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../services/slices/UserSlice';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { _Client_ID } from '../config/staticVariables';
import { googleSignin } from '../config/SocialLogin';
import { showModal } from '../services/slices/UtilitySlice';



const Login = ({ navigation }: { navigation: any }): JSX.Element => {
    const { saved_user } = useSelector((state: any) => state.userSlice);
    const [showPswd, setShowPswd] = useState<boolean>(false);
    const [toggleChkbox, setToggleChkbox] = useState<boolean>(saved_user?.remember_me);
    const [formData, setFormData] = useState<Login_Data>({ credential: saved_user?.credential, password: saved_user?.password, auth_type: "regular" });
    const [formError, setFormError] = useState<Form_Error>({});
    const dispatch: any = useDispatch();

    const validateForm = () => {
        const error: Form_Error = {};
        const { credential, password } = formData;

        if (!credential) {
            error.credential = "Email/Phone/Username is required!";
        }

        if (!password) {
            error.password = "Password is required!";
        } else if (password.length < 8) {
            error.password = "Password should be minimum 8 characters long!";
            dispatch(showModal({ msg: "Password should be minimum 8 characters long!", type: "error" }));
        } else if (password.length > 16) {
            error.password = "Password should not contain more than 16 characters!";
            dispatch(showModal({ msg: "Password should not contain more than 16 characters!", type: "error" }));
        }

        return error;
    };

    const handleLogin = async (): Promise<void> => {
        const validationErrors: any = validateForm();
        setFormError(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const loginData: Login_Data = { credential: formData.credential, password: formData.password, auth_type: "regular", remember_me: toggleChkbox };
            await dispatch(userLogin({ loginData, navigation, toggleChkbox }));
            setFormData({ credential: "", password: "", auth_type: "regular" });
        }
    };

    useEffect(() => {
        GoogleSignin.configure({ webClientId: _Client_ID });
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={[commonstyles.parent, { backgroundColor: colors.login.bgcolor }]}>
                <View style={{ marginTop: 15 }}>
                    <TouchableOpacity
                        style={[commonstyles.fdRow, styles.navBtn]}
                        onPress={() => navigation.navigate("welcomescreen")}
                    >
                        <Image style={styles.arrow} source={icons.arrow} />
                        <Text style={styles.navTxt}>Log in</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: "center", marginTop: 15 }}>
                    <Image style={{ width: 130, height: 160 }} source={images.logo} />
                </View>

                {/* inputs */}
                <View style={{ marginTop: 60, marginHorizontal: 30, rowGap: 20 }}>
                    {/* username */}
                    <View style={[commonstyles.inputGrp, { borderColor: formError.credential ? colors.login.error : "", borderWidth: formError.credential ? 1 : 0 }]}>
                        <TextInput
                            style={commonstyles.inputBox}
                            placeholder='Email/Username/Phone'
                            placeholderTextColor={colors.login.tint}
                            value={formData.credential}
                            autoCapitalize='none'
                            onChangeText={value => setFormData({ ...formData, credential: value })}
                            onFocus={() => setFormError({ ...formError, credential: "" })}
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
                            onFocus={() => setFormError({ ...formError, password: "" })}
                        />
                        <TouchableOpacity
                            style={commonstyles.eye}
                            onPress={() => setShowPswd(!showPswd)}
                        >
                            <Image style={{ width: 22, height: 22, tintColor: colors.login.tint }} source={showPswd ? icons.view : icons.hide} />
                        </TouchableOpacity>
                    </View>

                    <GradientButton title='Log in' height={40} onPress={handleLogin} size={16} radius={25} />

                    {/* remember me and forget password */}
                    <View style={[commonstyles.fdRow, { justifyContent: "space-between", alignItems: "center" }]}>
                        <View style={[commonstyles.fdRow, styles.checkboxWrapper]}>
                            <CheckBox
                                disabled={false}
                                style={{ width: 15, height: 15 }}
                                value={toggleChkbox}
                                onValueChange={newValue => setToggleChkbox(newValue)}
                                boxType='square'
                                onFillColor={colors.login.fillcolor}
                                onTintColor={colors.login.fillcolor}
                                tintColor={colors.login.rmbrme}
                                onCheckColor={colors.white}
                                onAnimationType='fill'
                                offAnimationType='fill'
                            />
                            <Text style={styles.rmbrMe}>Remember Me</Text>
                        </View>

                        <TouchableOpacity
                            style={{}}
                            onPress={() => navigation.navigate("forgetpassword")}
                        >
                            <Text style={styles.frgtPswd}>Forget Password?</Text>
                        </TouchableOpacity>
                    </View>
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
                <View style={[commonstyles.acjc, { marginTop: 40 }]}>
                    <Text style={styles.acc}>Need an account? <Text style={styles.signup} onPress={() => navigation.navigate("signup")}>Sign Up</Text>
                    </Text>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
};

export default Login;

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
    checkboxWrapper: {
        alignItems: "center",
        ...Platform.select({
            ios: {
                columnGap: 8,
            },
            android: {
                columnGap: 16,
            }
        })
    },
    rmbrMe: {
        fontSize: 12,
        fontFamily: fonts.medium,
        color: colors.login.frgtpswd,
        ...Platform.select({
            ios: {},
            android: {
                marginTop: 2
            }
        })
    },
    acc: {
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.login.footer,
    },
    signup: {
        fontFamily: fonts.medium,
        fontSize: 12,
        textDecorationLine: "underline",
        color: colors.login.footer,
    },
});