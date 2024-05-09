import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Prompt_Modal_Props } from '../config/CustomTypes'
import colors from '../config/colors';
import { fonts } from '../config/fonts';
import { _Height } from '../config/staticVariables';
import { commonstyles } from '../assets/css/CommonStyles';

const PromptModal = ({ visible, msg, onPressOK, onPressCancel }: Prompt_Modal_Props) => {
    return (
        <Modal
            visible={visible}
            animationType='fade'
            transparent={true}
        >
            <TouchableOpacity
                style={{ backgroundColor: colors.promptmodal.bgcolor, flex: 1 }}
                disabled={true}
            >
                <View style={[styles.modalWrap, { backgroundColor: colors.white }]}>
                    <Text style={styles.modalHeading}>Cyber Mind</Text>
                    <Text style={styles.modalTxt}>{msg}</Text>

                    <View style={[commonstyles.fdRow, commonstyles.acjsb, { marginHorizontal: 5, marginTop: 10 }]}>
                        <TouchableOpacity
                            style={[styles.modalButton, commonstyles.acjc]}
                            onPress={()=> onPressCancel()}
                        >
                            <Text style={styles.btnTxt}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modalButton, commonstyles.acjc]}
                            onPress={()=> onPressOK()}
                        >
                            <Text style={styles.btnTxt}>OK</Text>
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
        borderRadius: 8,
        // alignItems: "center",
        marginHorizontal: 30,
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
                marginTop: _Height / 2.3,
            },
            android: {
                elevation: 4,
                marginTop: _Height / 2.6,
            },
        }),
        minHeight: 150,
    },
    modalHeading: {
        color: colors.black,
        fontSize: 20,
        fontFamily: fonts.semibold,
        marginLeft: 10,
    },
    modalTxt: {
        color: colors.black,
        fontSize: 14,
        fontFamily: fonts.regular,
        marginTop: 10,
        marginLeft: 10,
    },
    modalButton: {
        borderRadius: 5,
        backgroundColor: "#ff0",
        marginTop: 20,
        paddingVertical: 5,
        minWidth: 100,
    },
    btnTxt: {
        color: colors.black,
        fontSize: 14,
        textAlign: "center",
        fontFamily: fonts.medium,
        textTransform: "uppercase",
    },
});