import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { commonstyles } from '../../assets/css/CommonStyles';
import { useSelector } from 'react-redux';
import colors from '../../config/colors';
import LinearGradient from 'react-native-linear-gradient';
import { _Height, _Width } from '../../config/staticVariables';
import { icons } from '../../config/icons';
import { fonts } from '../../config/fonts';


const P2PChat = ({ navigation }: { navigation: any }) => {
  const { user } = useSelector((state: any) => state.userSlice);
  const [message, setMessage] = useState<string>("");

  return (
    <View style={[commonstyles.parent, { backgroundColor: colors.white }]}>
      {/* top content */}
      <LinearGradient
        style={styles.headerTop}
        colors={colors.p2pchat.gdcolor}
        useAngle={true}
        angle={90}
        angleCenter={{ x: 0.25, y: 0 }}
      >
        {/* navigation */}
        <View style={[styles.navWrap, commonstyles.fdRow]}>
          <TouchableOpacity
            style={[styles.nav, commonstyles.acjc]}
            onPress={() => navigation.goBack()}
          >
            <Image source={icons.arrow} style={styles.navImg} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menu, commonstyles.acjc]}
          >
            <Image source={icons.dots} style={styles.menuImg} />
          </TouchableOpacity>
        </View>

        {/* user image */}
        <View style={[commonstyles.acjc, { marginTop: -15 }]}>
          <View
            style={[styles.user, commonstyles.acjc]}
          >
            <Image source={icons.woman} style={styles.user_dummy} />

            {/* online dot */}
            <View style={styles.greenDot} />
          </View>
        </View>

        {/* user name */}
        <View style={[commonstyles.acjc, { marginTop: 15 }]}>
          <Text style={styles.userName}>Jenny Wilson</Text>
        </View>

        {/* user status */}
        <View style={[commonstyles.acjc, { marginVertical: Platform.OS === "android" ? 0 : 5 }]}>
          <Text style={styles.userStatus}>Online</Text>
        </View>

        {/* user actions */}
        <View style={[styles.actnWrap, commonstyles.fdRow, commonstyles.acjsb]}>
          <TouchableOpacity
            style={[styles.actnBtn, commonstyles.acjc]}
          >
            <Image style={styles.actnImg} source={icons.call} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actnBtn, commonstyles.acjc]}
          >
            <Image style={styles.actnImg} source={icons.videocamera} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actnBtn, commonstyles.acjc]}
          >
            <Image style={styles.actnImg} source={icons.folder} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Chat section */}
      <KeyboardAvoidingView
        style={commonstyles.parent}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <View style={[commonstyles.parent]}>
          {/* chats */}
          <View style={{ flex: 1, borderWidth: 0, marginHorizontal: 10, marginVertical: 5, }}>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
              <View style={{ flex: 1, paddingBottom: 10 }}>
                {/* sent chat */}
                <View style={[styles.senderChat, styles.message]}>
                  <Text style={styles.chatMsg} selectable={true}>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                  </Text>

                  {/* time & read status */}
                  <View style={[styles.timeChatWrap, commonstyles.fdRow]}>
                    <Text style={styles.chatTime}>16.05</Text>
                    <Image style={styles.readStat} source={icons.read} />
                  </View>
                </View>

                {/* received chat */}
                <View style={[styles.receiverChat, styles.message]}>
                  <Text style={styles.chatMsg} selectable={true}>
                    It is a long established fact that a reader will be distracted.
                  </Text>

                  {/* time & read status */}
                  <View style={[styles.timeChatWrap, commonstyles.fdRow, { marginTop: Platform.OS === "ios" ? -10 : -15 }]}>
                    <Text style={styles.chatTime}>16.05</Text>
                  </View>
                </View>

                <View style={[styles.receiverChat, styles.message]}>
                  <Text style={styles.chatMsg} selectable={true}>
                    It is a long established fact that a reader will be distracted iy uyt yt.
                  </Text>

                  {/* time & read status */}
                  <View style={[styles.timeChatWrap, commonstyles.fdRow]}>
                    <Text style={styles.chatTime}>16.05</Text>
                  </View>
                </View>

                {/* sent chat */}
                <View style={[styles.senderChat, styles.message]}>
                  <Text style={styles.chatMsg} selectable={true}>
                    It hdfew hfuewi.
                  </Text>

                  {/* time & read status */}
                  <View style={[styles.timeChatWrap, commonstyles.fdRow]}>
                    <Text style={styles.chatTime}>16.05</Text>
                    <Image style={styles.readStat} source={icons.read} />
                  </View>
                </View>

                {/* received chat */}
                <View style={[styles.receiverChat, styles.message]}>
                  <Text style={styles.chatMsg} selectable={true}>
                    It is a long established fact that.
                  </Text>

                  {/* time & read status */}
                  <View style={[styles.timeChatWrap, commonstyles.fdRow]}>
                    <Text style={styles.chatTime}>16.05</Text>
                  </View>
                </View>

                {/* sent chat */}
                <View style={[styles.senderChat, styles.message]}>
                  <Text style={styles.chatMsg} selectable={true}>
                    It fiohwef ierguhre  woufhuwoiwui  wohf ourhfwe  loshniebfw wufwh .
                  </Text>

                  {/* time & read status */}
                  <View style={[styles.timeChatWrap, commonstyles.fdRow]}>
                    <Text style={styles.chatTime}>16.05</Text>
                    <Image style={styles.readStat} source={icons.read} />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>

          {/* chat input emoji & link */}
          <View style={[styles.inputContainer, commonstyles.fdRow, commonstyles.acjsb]}>
            <View style={[styles.inputWrap, commonstyles.fdRow, commonstyles.parent, commonstyles.acjsb]}>
              <TouchableOpacity
                style={[styles.emojiLinkBtn, commonstyles.acjc]}
              >
                <Image style={styles.emojiLink} source={icons.smile} />
              </TouchableOpacity>

              <TextInput
                placeholder={"Type your message..."}
                placeholderTextColor={colors.p2pchat.plchldrcolor}
                value={message}
                onChangeText={value => setMessage(value)}
                style={styles.inputBox}
                autoCapitalize='none'
                multiline={true}
                scrollEnabled={true}
              />

              <TouchableOpacity
                style={[styles.emojiLinkBtn, commonstyles.acjc]}
              >
                <Image style={styles.emojiLink} source={icons.link} />
              </TouchableOpacity>
            </View>

            {/* send & voice section */}
            <View style={{ position: "absolute", right: 0, bottom: 5 }}>
              {message.length > 0 ?
                <TouchableOpacity
                  style={[styles.sendVoiceBtn, commonstyles.acjc]}
                >
                  <Image style={styles.sendVoice} source={icons.send} />
                </TouchableOpacity>
                :
                <TouchableOpacity
                  style={[styles.sendVoiceBtn, commonstyles.acjc]}
                >
                  <Image style={styles.sendVoice} source={icons.mic} />
                </TouchableOpacity>
              }
            </View>

            {/* placeholder */}
            <View style={{ width: 40, height: 40 }} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
};

export default P2PChat;

const styles = StyleSheet.create({
  headerTop: {
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    ...Platform.select({
      ios: {
        height: _Height * 0.39,
      },
      android: {
        height: _Height * 0.42,
      }
    })
  },
  navWrap: {
    marginHorizontal: 20,
    ...Platform.select({
      ios: { marginTop: 60, },
      android: { marginTop: 50, }
    }),
    alignItems: "center",
    justifyContent: "space-between",
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
    borderRadius: 30,
  },
  menuImg: {
    width: 20,
    height: 20,
    tintColor: colors.white,
  },
  user_dummy: {
    width: 90,
    height: 90,
  },
  user: {
    borderWidth: 2,
    width: 94,
    height: 94,
    borderRadius: 100,
    borderColor: colors.white,
    position: "relative",
  },
  userName: {
    fontSize: 25,
    fontFamily: fonts.semibold,
    color: colors.white,
  },
  greenDot: {
    width: 18,
    height: 18,
    backgroundColor: colors.chathome.onlinedot,
    position: "absolute",
    borderRadius: 15,
    bottom: 3,
    right: 3,
    borderWidth: 1,
    borderColor: colors.white,
  },
  userStatus: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  actnWrap: {
    marginHorizontal: 60,
    marginTop: 10
  },
  actnBtn: {
    backgroundColor: colors.white,
    width: 45,
    height: 45,
    borderRadius: 45,
  },
  actnImg: {
    width: 20,
    height: 20,
    tintColor: colors.p2pchat.actncolor,
  },
  inputContainer: {
    marginHorizontal: 25,
    columnGap: 20,
    marginBottom: 15,
  },
  inputWrap: {
    columnGap: 5,
    backgroundColor: colors.p2pchat.inputwrapbg,
    borderRadius: 12,
    paddingHorizontal: 15,
    maxHeight: Platform.OS === "ios" ? 120 : 100,
  },
  emojiLinkBtn: {
    paddingHorizontal: 5,
    alignSelf: "flex-end",
    paddingVertical: 5,
    marginBottom: 6
  },
  emojiLink: {
    width: 22,
    height: 22,
    tintColor: colors.black,
  },
  inputBox: {
    flex: 1,
    ...Platform.select({
      ios: {
        minHeight: 45,
        textAlignVertical: "bottom",
        paddingTop: 12
      },
      android: {}
    }),
  },
  sendVoiceBtn: {
    backgroundColor: colors.p2pchat.sendvoicebg,
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  sendVoice: {
    width: 20,
    height: 20,
    tintColor: colors.white,
  },
  senderChat: {
    alignSelf: "flex-end",
    backgroundColor: colors.p2pchat.senderchatbg,
    marginRight: 10,
    borderBottomLeftRadius: 10,
  },
  receiverChat: {
    alignSelf: "flex-start",
    backgroundColor: colors.p2pchat.receiverchatbg,
    marginLeft: 10,
    borderBottomRightRadius: 10,
  },
  message: {
    maxWidth: _Width - 80,
    padding: 10,
    marginTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: "#000",
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
  chatTime: {
    fontSize: 10,
    fontFamily: fonts.medium,
    color: colors.p2pchat.chattimecolor,
  },
  readStat: {
    width: 16,
    height: 16,
    tintColor: colors.black,
  },
  timeChatWrap: {
    alignSelf: "flex-end",
  },
});