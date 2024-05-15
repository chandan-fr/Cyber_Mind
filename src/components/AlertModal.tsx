import { Modal, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../config/colors';
import { _Height } from '../config/staticVariables';
import { fonts } from '../config/fonts';
import { commonstyles } from '../assets/css/CommonStyles';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../services/slices/UtilitySlice';


const AlertModal = (): JSX.Element => {
    const { is_modal_visible, modal_msg, modal_type } = useSelector((state: any) => state.utilitySlice);
    const dispatch: any = useDispatch();

    const statusBarHeight = StatusBar.currentHeight ?? 0;

    return (
        <Modal
            visible={is_modal_visible}
            animationType='fade'
            transparent={true}
        >
            <TouchableOpacity
                style={{ backgroundColor: colors.modal.modalbg, flex: 1 }}
                disabled={true}
            >
                <View
                    style={[
                        styles.modalWrap,
                        {
                            backgroundColor: modal_type === "success" ? colors.modal.bgcolorsuccess : colors.modal.bgcolorerror,
                            shadowColor: modal_type === "success" ? colors.modal.shadowsuccess : colors.modal.shadowerror,
                        }
                    ]}
                >
                    <Text style={[styles.modalHeading, { color: modal_type === "success" ? colors.modal.txtheadsuccess : colors.modal.txtheaderror }]}>Cyber Mind</Text>

                    <Text
                        style={[
                            styles.modalTxt,
                            {
                                marginTop: Platform.OS === "android" ? 10 : 15,
                                color: modal_type === "success" ? colors.modal.parasuccess : colors.modal.paraerror
                            }
                        ]}
                    >
                        {modal_msg}
                    </Text>

                    <TouchableOpacity
                        style={[styles.modalButton, commonstyles.acjc]}
                        onPress={() => dispatch(hideModal())}
                    >
                        <Text style={styles.btnTxt}>Yeah, thanks!</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    )
};

export default AlertModal;

const styles = StyleSheet.create({
    modalWrap: {
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 30,
        padding: 15,
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.3,
                shadowRadius: 3.84,
                marginTop: _Height / 2.2,
            },
            android: {
                elevation: 5,
                marginTop: _Height / 2.4,
            },
        }),
    },
    modalHeading: {
        fontSize: 15,
        textAlign: "center",
        fontFamily: fonts.semibold,
    },
    modalTxt: {
        fontSize: 11,
        textAlign: "center",
        fontFamily: fonts.regular
    },
    modalButton: {
        borderRadius: 6.07,
        backgroundColor: colors.modal.btncolor,
        marginTop: 20,
        paddingVertical: 10,
        width: "80%",
    },
    btnTxt: {
        color: colors.modal.btntxtcolor,
        fontSize: 10,
        textAlign: "center",
        fontFamily: fonts.medium,
    },
});