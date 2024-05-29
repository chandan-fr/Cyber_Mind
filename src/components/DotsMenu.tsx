import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DotsMenu_Props } from '../config/CustomTypes';
import { fonts } from '../config/fonts';
import colors from '../config/colors';
import { _Width } from '../config/staticVariables';

const DotsMenu = ({ onEdit, onDelete, onClose }: DotsMenu_Props): JSX.Element => {
    const editFunc = () => {
        onEdit && onEdit();
        onClose && onClose();
    };

    const deleteFunc = ()=>{
        onDelete && onDelete();
        onClose && onClose();
    };

    return (
        <View style={styles.menu}>
            <TouchableOpacity
                style={[styles.btn]}
            onPress={editFunc}
            >
                <Text style={styles.btnTxt}>Edit</Text>
            </TouchableOpacity>

            <View style={styles.hr} />

            <TouchableOpacity
                style={[styles.btn]}
                onPress={deleteFunc}
            >
                <Text style={styles.btnTxt}>Delete</Text>
            </TouchableOpacity>
        </View>
    )
};

export default DotsMenu;

const styles = StyleSheet.create({
    menu: {
        backgroundColor: "#F1F1F1",
        shadowColor: colors.dotsmenu.shadow,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        width: _Width / 4,
        borderRadius: 11,
        paddingHorizontal: 3,
        paddingVertical: 3,
    },
    btn: {
        paddingHorizontal: 6,
        paddingVertical: 4
    },
    btnTxt: {
        fontSize: 12,
        fontFamily: fonts.medium,
        color: colors.black,
    },
    hr: {
        borderWidth: 1,
        borderColor: colors.dotsmenu.hr,
        marginVertical: 2,
    },
});