import { StyleSheet, Text, View, SafeAreaView, Platform, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { commonstyles } from '../../assets/css/CommonStyles';
import LinearGradient from 'react-native-linear-gradient';
import { _Height, numericRegex } from '../../config/staticVariables';
import colors from '../../config/colors';
import { icons } from '../../config/icons';
import { fonts } from '../../config/fonts';
import { Form_Error, User_Form_Data } from '../../config/CustomTypes';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../../services/slices/UtilitySlice';
import Loader from '../../utility/Loader';


const EditProfile = ({ navigation }: { navigation: any }) => {
    const { user, user_loading, token } = useSelector((state: any) => state.userSlice);
    const [formData, setFormData] = useState<User_Form_Data>({ email: user?.email, phone: user?.phone, city_state: user?.city_state, full_name: user?.full_name });
    const [formError, setFormError] = useState<Form_Error>({});
    const _Header = { headers: { Authorization: "Bearer " + token } };
    const dispatch = useDispatch();

    const validateForm = () => {
        const error: Form_Error = {};
        const { phone, city_state, full_name } = formData;

        if (!full_name) {
            error.credential = "Full Name is required!";
        }

        if (phone.length < 10) {
            error.phone = "Phone Number should be minimum 10 characters long!";
            dispatch(showModal({ msg: "Phone Number should be minimum 10 characters long!", type: "error" }));
        } else if (numericRegex.test(phone)) {
            error.phone = "Only Numerics are allowed!";
            dispatch(showModal({ msg: "Only Numerics are allowed!", type: "error" }));
        }

        return error;
    };

    const handleSaveData = async () => {
        const validationErrors: any = validateForm();
        setFormError(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            // await dispatch(userLogin({ loginData, navigation }));
        }
    };

    return (
        <TouchableWithoutFeedback style={commonstyles.parent} onPress={Keyboard.dismiss}>
            <View style={[commonstyles.parent, { backgroundColor: colors.userprofile.bgcolor }]}>
                {/* top content */}
                <LinearGradient
                    style={styles.headerTop}
                    colors={colors.userprofile.gdcolor}
                    useAngle={true}
                    angle={90}
                    angleCenter={{ x: 0.3, y: 0 }}
                >
                    {/* navigation */}
                    <View style={[styles.navWrap, commonstyles.fdRow]}>
                        <TouchableOpacity
                            style={[styles.navMenu, commonstyles.acjc]}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.navTxt}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.navMenu, commonstyles.acjc]}
                            onPress={handleSaveData}
                        >
                            <Text style={styles.navTxt}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

                {/* user image */}
                <View style={[commonstyles.acjc, styles.userWrap]}>
                    <View
                        style={[styles.user, commonstyles.acjc]}
                    >
                        <Image source={icons.user_dumy} style={styles.user_dummy} />

                        {/* edit button */}
                        <TouchableOpacity
                            style={[styles.galleryWrap, commonstyles.acjc]}
                        // onPress={() => navigation.navigate("editprofile")}
                        >
                            <Image source={icons.gallery} style={styles.gallery} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* inputs section */}
                <KeyboardAvoidingView
                    style={{ marginTop: 50, marginHorizontal: 25, flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ rowGap: 40 }}>
                            {/* name */}
                            <View>
                                <Text style={styles.lable}>your name</Text>
                                <TextInput
                                    value={formData.full_name}
                                    style={[styles.inputBox, { borderBottomColor: formError.full_name ? colors.editprofile.error : colors.editprofile.inputborder }]}
                                    placeholder={formData.full_name ? "" : "Add Full Name"}
                                    placeholderTextColor={colors.editprofile.lable}
                                    onFocus={() => setFormError({ ...formError, full_name: "" })}
                                    onChangeText={value => setFormData({ ...formData, full_name: value })}
                                />
                            </View>

                            {/* email */}
                            <View>
                                <Text style={styles.lable}>your email</Text>
                                <TextInput
                                    value={formData.email}
                                    keyboardType='email-address'
                                    style={styles.inputBox}
                                    placeholder={formData.email ? "" : "Add Email"}
                                    placeholderTextColor={colors.editprofile.lable}
                                    editable={false}
                                    onChangeText={value => setFormData({ ...formData, email: value })}
                                />
                            </View>

                            {/* phone */}
                            <View>
                                <Text style={styles.lable}>your phone</Text>
                                <TextInput
                                    value={formData.phone}
                                    keyboardType='number-pad'
                                    style={[styles.inputBox, { borderBottomColor: formError.phone ? colors.editprofile.error : colors.editprofile.inputborder }]}
                                    placeholder={formData.phone ? "" : "Add Phone Number"}
                                    placeholderTextColor={colors.editprofile.lable}
                                    maxLength={10}
                                    onFocus={() => setFormError({ ...formError, phone: "" })}
                                    onChangeText={value => setFormData({ ...formData, phone: value })}
                                />
                            </View>

                            {/* city/state */}
                            <View>
                                <Text style={styles.lable}>city/state</Text>
                                <TextInput
                                    value={formData.city_state}
                                    style={styles.inputBox}
                                    placeholder={formData.city_state ? "" : "Add City/State"}
                                    placeholderTextColor={colors.editprofile.lable}
                                    maxLength={100}
                                    onChangeText={value => setFormData({ ...formData, city_state: value })}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

                <Loader visible={user_loading} />
            </View>
        </TouchableWithoutFeedback>
    )
};

export default EditProfile;

const styles = StyleSheet.create({
    headerTop: {
        ...Platform.select({
            ios: {
                height: _Height * 0.2,
            },
            android: {
                height: _Height * 0.23,
            }
        })
    },
    navWrap: {
        marginHorizontal: 20,
        marginTop: 25,
        alignItems: "center",
        justifyContent: "space-between",
    },
    navMenu: {
        paddingVertical: 2,
        paddingHorizontal: 10,
    },
    navTxt: {
        fontSize: 18,
        fontFamily: fonts.medium,
        color: colors.white,
    },
    userWrap: {
        marginTop: -90,
    },
    user_dummy: {
        width: 160,
        height: 160,
    },
    user: {
        borderWidth: 5,
        width: 167,
        height: 167,
        borderRadius: 100,
        borderColor: colors.white,
        position: "relative",
    },
    galleryWrap: {
        width: 40,
        height: 40,
        position: "absolute",
        top: 0,
        right: 5,
        backgroundColor: colors.editprofile.galleryWrapbg,
        borderRadius: 30,
        borderWidth: 1.69,
        borderColor: colors.white,
    },
    gallery: {
        width: 15,
        height: 15,
        tintColor: colors.editprofile.gallerycolor,
    },
    lable: {
        textTransform: "uppercase",
        fontSize: 13,
        fontFamily: fonts.medium,
        color: colors.editprofile.lable,
    },
    inputBox: {
        borderBottomWidth: 1,
        marginTop: 5,
        height: 40,
        borderBottomColor: colors.editprofile.inputborder,
        color: colors.editprofile.lable,
    },
});