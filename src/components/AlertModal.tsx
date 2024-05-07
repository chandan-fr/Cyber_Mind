import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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

    return (
        <Modal
            visible={is_modal_visible}
            animationType='fade'
            transparent={true}
        >
            <View style={[styles.modalWrap, {backgroundColor: modal_type === "success" ?colors.white : "#f0f"}]}>
                <Text style={styles.modalHeading}>Cyber Mind</Text>
                <Text style={styles.modalTxt}>{modal_msg}</Text>
                <TouchableOpacity
                    style={[styles.modalButton, commonstyles.acjc]}
                    onPress={() => dispatch(hideModal())}
                >
                    <Text style={styles.btnTxt}>OK</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default AlertModal;

const styles = StyleSheet.create({
    modalWrap: {
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 30,
        marginTop: _Height / 2,
        padding: 15,
        ...Platform.select({
            ios: {
                shadowColor: "",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        })
    },
    modalHeading: {
        color: colors.black,
        fontSize: 20,
        textAlign: "center",
        fontFamily: fonts.semibold
    },
    modalTxt: {
        color: colors.black,
        fontSize: 14,
        textAlign: "center",
        fontFamily: fonts.regular
    },
    modalButton: {
        borderRadius: 5,
        backgroundColor: "#ff0",
        marginTop: 20,
        paddingVertical: 5,
        paddingHorizontal: 40,
    },
    btnTxt: {
        color: colors.black,
        fontSize: 16,
        textAlign: "center",
        fontFamily: fonts.medium
    },
});