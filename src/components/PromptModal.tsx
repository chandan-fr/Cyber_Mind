import { Image, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Prompt_Modal_Props } from '../config/CustomTypes'
import colors from '../config/colors';
import { fonts } from '../config/fonts';
import { _Height } from '../config/staticVariables';
import { commonstyles } from '../assets/css/CommonStyles';
import { icons } from '../config/icons';

const PromptModal = ({ visible, msg, onPressOK, onPressCancel }: Prompt_Modal_Props) => {
    return (
        <Modal
            visible={visible}
            animationType='fade'
            transparent={true}
        >
            <TouchableOpacity
                style={{ backgroundColor: colors.modal.modalbg, flex: 1 }}
                disabled={true}
            >
                <View style={styles.modalWrap}>
                    <View style={[commonstyles.fdRow, { alignItems: "flex-start", justifyContent: "space-between" }]}>
                        {/* heading */}
                        <Text style={styles.modalHeading}>Cyber Mind</Text>

                        {/* close button */}
                        <TouchableOpacity
                            style={[styles.closeWrap, commonstyles.acjc]}
                            onPress={() => onPressCancel()}
                        >
                            <Image style={styles.close} source={icons.close} />
                        </TouchableOpacity>
                    </View>

                    {/* paragraph */}
                    <Text style={[styles.modalTxt]}>{msg}</Text>

                    {/* yes/no button */}
                    <View style={[commonstyles.fdRow, commonstyles.acjsb, { marginHorizontal: 5, marginTop: 10 }]}>
                        <TouchableOpacity
                            style={[styles.modalButtonCancel, commonstyles.acjc]}
                            onPress={() => onPressCancel()}
                        >
                            <Text style={styles.btnTxtCancel}>No, cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modalButton, commonstyles.acjc]}
                            onPress={() => onPressOK()}
                        >
                            <Text style={styles.btnTxt}>Yes, Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
};

export default PromptModal;

const styles = StyleSheet.create({
    modalWrap: {
        borderRadius: 6.25,
        marginHorizontal: 30,
        padding: 15,
        shadowColor: colors.modal.shadowsuccess,
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.3,
                shadowRadius: 3.84,
                marginTop: _Height / 2.3,
            },
            android: {
                elevation: 5,
                marginTop: _Height / 2.6,
            },
        }),
        minHeight: 110,
        borderWidth: 0.78,
        borderColor: colors.modal.boder,
        backgroundColor: colors.modal.bgcolorsuccess,
    },
    modalHeading: {
        color: colors.modal.txtheadsuccess,
        fontSize: 15.6,
        fontFamily: fonts.semibold,
        marginLeft: 10,
    },
    modalTxt: {
        color: colors.modal.parasuccess,
        fontSize: 11,
        fontFamily: fonts.regular,
        marginTop: 10,
        marginLeft: 10,
    },
    modalButton: {
        borderRadius: 6.25,
        backgroundColor: colors.modal.btncolor,
        marginTop: 20,
        paddingVertical: 8,
        minWidth: "45%",
    },
    btnTxt: {
        color: colors.modal.btntxtcolor,
        fontSize: 11,
        textAlign: "center",
        fontFamily: fonts.medium,
    },
    modalButtonCancel: {
        borderRadius: 6.25,
        backgroundColor: colors.white,
        marginTop: 20,
        paddingVertical: 8,
        minWidth: "45%",
        borderWidth: 0.78,
        borderColor: colors.modal.bodercancel,
    },
    btnTxtCancel: {
        color: colors.modal.btntxtcolorcancel,
        fontSize: 11,
        textAlign: "center",
        fontFamily: fonts.medium,
    },
    close: {
        width: 8,
        height: 8,
        tintColor: colors.modal.close,
    },
    closeWrap: {
        backgroundColor: colors.white,
        width: 25,
        height: 25,
        borderRadius: 20,
        marginTop: -5,
    },
});