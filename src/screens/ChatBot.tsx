import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { commonstyles } from '../assets/css/CommonStyles';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../config/colors';
import { icons } from '../config/icons';
import { _Height, _Width } from '../config/staticVariables';
import { fonts } from '../config/fonts';

const ChatBot = ({ navigation }: { navigation: any }): JSX.Element => {
    return (
        <View style={[commonstyles.parent, { backgroundColor: colors.chatbot.bgcolor }]}>
            {/* top header section */}
            <LinearGradient
                useAngle={true}
                angle={90}
                angleCenter={{ x: 0.5, y: 0 }}
                colors={colors.chatbot.gdcolor}
                style={styles.lgStyle}
            >
                {/* navigation */}
                <View style={[styles.navWrap, commonstyles.fdRow]}>
                    <TouchableOpacity
                        style={[styles.nav, commonstyles.acjc]}
                        onPress={() => navigation.goBack()}
                    >
                        <Image source={icons.arrow} style={styles.navImg} />
                    </TouchableOpacity>

                    <View style={commonstyles.parent}>
                        <Text numberOfLines={2} style={styles.pageHeading}>Ai Chatbot</Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.menu, commonstyles.acjc]}
                    >
                        <Image source={icons.dots} style={styles.menuImg} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            {/* Chat section */}
            <KeyboardAvoidingView
                style={commonstyles.parent}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? -15 : 0}
            >
                <View style={[commonstyles.parent]}>
                    {/* chats */}
                    <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 5 }}>
                        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                            <View style={{ flex: 1, paddingBottom: 10 }}>
                                {/* received chat */}
                                <View style={[commonstyles.fdRow, { alignItems: "flex-end" }]}>
                                    <Image style={styles.rcvUserAvatar} source={icons.man} />

                                    <View style={[styles.receiverChat, styles.message]}>
                                        <Text style={styles.chatMsg} selectable={true}>
                                            Hi, I am your Ai Chat virtual assistant, how can i help you? Feel free to ask me anything.
                                        </Text>
                                    </View>
                                </View>

                                {/* sent chat */}
                                <View style={[styles.senderChat, styles.message]}>
                                    <Text style={styles.chatMsg} selectable={true}>
                                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                                    </Text>
                                </View>

                                <View style={[styles.senderChat, styles.message]}>
                                    <Text style={styles.chatMsg} selectable={true}>
                                        It is a long established fact that a readert.
                                    </Text>
                                </View>

                                {/* received chat */}
                                <View style={[commonstyles.fdRow, { alignItems: "flex-end" }]}>
                                    <Image style={styles.rcvUserAvatar} source={icons.man} />

                                    <View style={[styles.receiverChat, styles.message]}>
                                        <Text style={styles.chatMsg} selectable={true}>
                                            onec volutpat leo sem, ut hendrerit magna eleifend non. In hac habitasse platea dictumst. Ut tincidunt eget ipsum sed vestibulum. Proin dignissim luctus gravida.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>

                    {/* chat input emoji, link & voice/ send */}
                    <View style={[styles.inputContainer]}>
                        {/* chat input emoji & link */}
                        <View>
                            <TextInput
                                placeholder={"Ask me anything..."}
                                placeholderTextColor={colors.black}
                                // value={message}
                                // onChangeText={value => setMessage(value)}
                                style={styles.inputBox}
                                autoCapitalize='none'
                                multiline={true}
                                scrollEnabled={true}
                            />
                        </View>

                        {/* send & voice section */}
                        <View style={[commonstyles.fdRow, commonstyles.acjsb]}>
                            <View style={[commonstyles.fdRow, { alignItems: 'center', columnGap: 10 }]}>
                                <TouchableOpacity
                                    style={[styles.addBtn, commonstyles.acjc]}
                                >
                                    <Image style={styles.plus} source={icons.plus} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.emojiLinkBtn, commonstyles.acjc]}
                                >
                                    <Image style={styles.emojiLink} source={icons.smile} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.emojiLinkBtn, commonstyles.acjc]}
                                >
                                    <Image style={styles.emojiLink} source={icons.link} />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={[styles.sendBtn, commonstyles.acjc]}
                            // onPress={handleSend}
                            >
                                <Text style={styles.sendBtnTxt}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
};

export default ChatBot;

const styles = StyleSheet.create({
    lgStyle: {
        width: "100%",
        height: _Height * 0.14,
    },
    navWrap: {
        marginHorizontal: 20,
        ...Platform.select({
            ios: { marginTop: 60, },
            android: { marginTop: 50, }
        }),
        alignItems: "center",
        justifyContent: "space-between",
        columnGap: 20,
    },
    nav: {
        borderWidth: 1,
        borderColor: colors.white,
        width: 35,
        height: 35,
        borderRadius: 30,
    },
    navImg: {
        width: 25,
        height: 25,
        tintColor: colors.white,
    },
    menu: {
        width: 30,
        height: 30,
    },
    menuImg: {
        width: 20,
        height: 20,
        tintColor: colors.white,
    },
    pageHeading: {
        ...Platform.select({
            ios: { fontSize: 22, },
            android: { fontSize: 20, }
        }),
        color: colors.white,
        fontFamily: fonts.semibold,
        textAlign: "center",
    },
    inputContainer: {
        marginHorizontal: 10,
        marginBottom: 25,
        backgroundColor: colors.chatbot.inputcontbg,
        borderRadius: 18,
        rowGap: 6,
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    inputBox: {
        ...Platform.select({
            ios: {
                minHeight: 45,
                textAlignVertical: "bottom",
                paddingTop: 12
            },
            android: {}
        }),
    },
    addBtn: {
        padding: 6,
        backgroundColor: colors.white,
        borderRadius: 7.26,
        shadowColor: colors.chatbot.addshadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.55,
        shadowRadius: 3.84,
        elevation: 5,
    },
    plus: {
        width: 15,
        height: 15,
        tintColor: colors.chatbot.plus,
    },
    emojiLinkBtn: {
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    emojiLink: {
        width: 22,
        height: 22,
        tintColor: colors.chatbot.actnOptn,
    },
    sendBtn: {
        backgroundColor: colors.chatbot.sendbtnbg,
        borderRadius: 9.67,
        paddingVertical: 7,
        paddingHorizontal: 20,
    },
    sendBtnTxt: {
        fontSize: 14,
        fontFamily: fonts.regular,
        color: colors.white,
    },
    senderChat: {
        alignSelf: "flex-end",
        backgroundColor: colors.chatbot.sendbg,
        marginRight: 10,
        borderBottomLeftRadius: 10,
    },
    receiverChat: {
        alignSelf: "flex-start",
        backgroundColor: colors.chatbot.receivebg,
        marginLeft: 10,
        borderBottomRightRadius: 10,
    },
    rcvUserAvatar: {
        width: 35,
        height: 35,
        borderRadius: 35,
    },
    message: {
        maxWidth: _Width - 120,
        padding: 10,
        marginTop: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    chatMsg: {
        fontSize: Platform.OS === "ios" ? 15 : 14,
        fontFamily: fonts.regular,
        color: colors.black,
    },
});