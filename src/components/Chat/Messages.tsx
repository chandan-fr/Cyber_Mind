import { FlatList, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { commonstyles } from '../../assets/css/CommonStyles';
import { icons } from '../../config/icons';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';
import { _Width } from '../../config/staticVariables';
import ChatThread from './ChatThread';
import { useNavigation } from '@react-navigation/native';

const Messages = (): JSX.Element => {
  const navigation: any = useNavigation();

  return (
    <View style={[commonstyles.parent, { marginHorizontal: 20, marginTop: 20 }]}>
      {/* <FlatList
        data={[{}, {}, {}, {}, {}, {}, {}, {}]}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index: number) => index.toString()}
        renderItem={({ item }) => (
          <ChatThread item={item} />
        )}
      /> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* read thread */}
        <TouchableOpacity
          style={[styles.chatContainer, commonstyles.fdRow, commonstyles.acjsb]}
          onPress={() => navigation.navigate("p2pchat")}
        >
          <View style={styles.left}>
            <Image source={require("../../assets/temp/woman.png")} style={styles.userIcon} />
            <View style={styles.greenDot} />
          </View>

          <View style={styles.mid}>
            <Text style={styles.chatName} numberOfLines={1}>Jenny Wilson</Text>

            <View style={[commonstyles.fdRow, { width: 185 }]}>
              <Image source={icons.read} style={styles.chatInfoIcon} />
              <Text style={styles.chatMsg} numberOfLines={1}>Good Morning</Text>
            </View>
          </View>

          <View style={[styles.right, commonstyles.acjc]}>
            {/* <View style={[styles.noOfMsgWrap, commonstyles.acjc]}>
            <Text style={styles.noOfMsg}>2</Text>
          </View> */}

            <Text style={styles.chatTime} >09:02</Text>
          </View>
        </TouchableOpacity>

        {/* sent thread */}
        <TouchableOpacity
          style={[styles.chatContainer, commonstyles.fdRow, commonstyles.acjsb]}
        >
          <View style={styles.left}>
            <Image source={require("../../assets/temp/girl.png")} style={styles.userIcon} />
            <View style={styles.greenDot} />
          </View>

          <View style={styles.mid}>
            <Text style={styles.chatName} numberOfLines={1}>Wade Warren</Text>

            <View style={[commonstyles.fdRow, { width: 185 }]}>
              <Image source={icons.tick} style={styles.chatInfoIcon} />
              <Text style={styles.chatMsg} numberOfLines={1}>Let’s see..</Text>
            </View>
          </View>

          <View style={[styles.right, commonstyles.acjc]}>
            {/* <View style={[styles.noOfMsgWrap, commonstyles.acjc]}>
            <Text style={styles.noOfMsg}>2</Text>
          </View> */}

            <Text style={styles.chatTime} >09:02</Text>
          </View>
        </TouchableOpacity>

        {/* received thread */}
        <TouchableOpacity
          style={[styles.chatContainer, commonstyles.fdRow, commonstyles.acjsb]}
        >
          <View style={styles.left}>
            <Image source={require("../../assets/temp/woman1.png")} style={styles.userIcon} />
            <View style={styles.greenDot} />
          </View>

          <View style={styles.mid}>
            <Text style={styles.chatName} numberOfLines={1}>Leslie Alexander</Text>

            <View style={[commonstyles.fdRow, { width: 185 }]}>
              {/* <Image source={icons.tick} style={styles.chatInfoIcon} /> */}
              <Text style={styles.chatMsgRcvd} numberOfLines={1}>how are you?</Text>
            </View>
          </View>

          <View style={[styles.right, commonstyles.acjc]}>
            <View style={[styles.noOfMsgWrap, commonstyles.acjc]}>
              <Text style={styles.noOfMsg}>2</Text>
            </View>

            <Text style={styles.chatTime} >09:02</Text>
          </View>
        </TouchableOpacity>

        {/* gif sent thread */}
        <TouchableOpacity
          style={[styles.chatContainer, commonstyles.fdRow, commonstyles.acjsb]}
        >
          <View style={styles.left}>
            <Image source={require("../../assets/temp/man1.png")} style={styles.userIcon} />
            <View style={styles.greenDot} />
          </View>

          <View style={styles.mid}>
            <Text style={styles.chatName} numberOfLines={1}>Albert Flores</Text>

            <View style={[commonstyles.fdRow, { width: 185, columnGap: 4 }]}>
              <Image source={icons.tick} style={styles.chatInfoIcon} />
              <Image source={icons.gif} style={styles.chatGifIcon} />
              <Text style={styles.chatGif} numberOfLines={1}>Gif</Text>
            </View>
          </View>

          <View style={[styles.right, commonstyles.acjc]}>
            {/* <View style={[styles.noOfMsgWrap, commonstyles.acjc]}>
            <Text style={styles.noOfMsg}>2</Text>
          </View> */}

            <Text style={styles.chatTime} >09:02</Text>
          </View>
        </TouchableOpacity>

        {/* voice received thread */}
        <TouchableOpacity
          style={[styles.chatContainer, commonstyles.fdRow, commonstyles.acjsb]}
        >
          <View style={styles.left}>
            <Image source={require("../../assets/temp/man.png")} style={styles.userIcon} />
            <View style={styles.greenDot} />
          </View>

          <View style={styles.mid}>
            <Text style={styles.chatName} numberOfLines={1}>Ralph Edwards</Text>

            <View style={[commonstyles.fdRow, { width: 185, columnGap: 4, alignItems: "center" }]}>
              {/* <Image source={icons.tick} style={styles.chatInfoIcon} /> */}
              {/* <Image source={icons.gif} style={styles.chatGifIcon} /> */}
              <Image source={icons.mic} style={styles.chatMicIcon} />
              <Text style={styles.chatVoice} numberOfLines={1}>Voice Message</Text>
            </View>
          </View>

          <View style={[styles.right, commonstyles.acjc]}>
            {/* <View style={[styles.noOfMsgWrap, commonstyles.acjc]}>
            <Text style={styles.noOfMsg}>2</Text>
          </View> */}

            <Text style={styles.chatTime} >09:02</Text>
          </View>
        </TouchableOpacity>

        {/* video reacived thread */}
        <TouchableOpacity
          style={[styles.chatContainer, commonstyles.fdRow, commonstyles.acjsb]}
        >
          <View style={styles.left}>
            <Image source={require("../../assets/temp/boy.png")} style={styles.userIcon} />
            <View style={styles.greenDot} />
          </View>

          <View style={styles.mid}>
            <Text style={styles.chatName} numberOfLines={1}>Brooklyn Simmons</Text>

            <View style={[commonstyles.fdRow, { width: 185, columnGap: 4, alignItems: "center" }]}>
              {/* <Image source={icons.tick} style={styles.chatInfoIcon} /> */}
              {/* <Image source={icons.gif} style={styles.chatGifIcon} /> */}
              {/* <Image source={icons.mic} style={styles.chatMicIcon} /> */}
              <Image source={icons.videocamera} style={styles.chatVideoIcon} />
              <Text style={styles.chatVoice} numberOfLines={1}>Voice Message</Text>
            </View>
          </View>

          <View style={[styles.right, commonstyles.acjc]}>
            <View style={[styles.noOfMsgWrap, commonstyles.acjc]}>
              <Text style={styles.noOfMsg}>3</Text>
            </View>

            <Text style={styles.chatTime} >09:02</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.chatContainer, commonstyles.fdRow, commonstyles.acjsb]}
        >
          <View style={styles.left}>
            <Image source={require("../../assets/temp/girl.png")} style={styles.userIcon} />
            {/* <View style={styles.greenDot} /> */}
          </View>

          <View style={styles.mid}>
            <Text style={styles.chatName} numberOfLines={1}>Bessie Cooper</Text>

            <View style={[commonstyles.fdRow, { width: 185 }]}>
              {/* <Image source={icons.tick} style={styles.chatInfoIcon} /> */}
              <Text style={styles.chatMsgRcvd} numberOfLines={1}>Lorem ipsum dolor sit amet</Text>
            </View>
          </View>

          <View style={[styles.right, commonstyles.acjc]}>
            <View style={[styles.noOfMsgWrap, commonstyles.acjc]}>
              <Text style={styles.noOfMsg}>2</Text>
            </View>

            <Text style={styles.chatTime} >09:02</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.chatContainer, commonstyles.fdRow, commonstyles.acjsb]}
        >
          <View style={styles.left}>
            <Image source={require("../../assets/temp/man1.png")} style={styles.userIcon} />
            {/* <View style={styles.greenDot} /> */}
          </View>

          <View style={styles.mid}>
            <Text style={styles.chatName} numberOfLines={1}>Jacob Jones</Text>

            <View style={[commonstyles.fdRow, { width: 185 }]}>
              {/* <Image source={icons.tick} style={styles.chatInfoIcon} /> */}
              <Text style={styles.chatMsgRcvd} numberOfLines={1}>Lorem ipsum dolor sit amet</Text>
            </View>
          </View>

          <View style={[styles.right, commonstyles.acjc]}>
            <View style={[styles.noOfMsgWrap, commonstyles.acjc]}>
              <Text style={styles.noOfMsg}>1</Text>
            </View>

            <Text style={styles.chatTime} >09:02</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
};

export default Messages;

const styles = StyleSheet.create({
  chatContainer: {
    columnGap: 20,
    marginBottom: 20,
  },
  left: {
    position: "relative",
  },
  greenDot: {
    width: 15,
    height: 15,
    backgroundColor: colors.chathome.onlinedot,
    position: "absolute",
    borderRadius: 15,
    bottom: 2,
    right: 2,
  },
  userIcon: {
    width: 60,
    height: 60,
  },
  chatInfoIcon: {
    width: 20,
    height: 20,
    tintColor: colors.chathome.chatmsg,
  },
  mid: {
    flex: 2,
    rowGap: 6,
  },
  chatName: {
    fontSize: 17,
    fontFamily: fonts.semibold,
    color: colors.black,
    width: _Width - 185,
  },
  chatMsg: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.chathome.chatmsg,
  },
  chatMsgRcvd: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.chathome.chatmsg,
  },
  right: {
    rowGap: 5
  },
  noOfMsgWrap: {
    backgroundColor: colors.chathome.notifinum,
    width: 18,
    height: 18,
    borderRadius: 18,
  },
  noOfMsg: {
    fontSize: 11.4,
    fontFamily: fonts.medium,
    color: colors.white,
  },
  chatTime: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.black,
  },
  chatGif: {
    fontSize: 14,
    fontFamily: fonts.semibold,
    color: colors.chathome.chatmsg,
    textTransform: "uppercase",
  },
  chatVideo: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.chathome.chatmsg,
  },
  chatVoice: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.chathome.chatmsg,
  },
  chatGifIcon: {
    width: 20,
    height: 20,
    tintColor: colors.black,
  },
  chatMicIcon: {
    width: 13,
    height: 13,
    tintColor: colors.chathome.chatmsg,
    ...Platform.select({
      ios: {},
      android: {
        marginBottom: 4,
      }
    })
  },
  chatVideoIcon: {
    width: 16,
    height: 16,
    tintColor: colors.chathome.chatmsg,
    ...Platform.select({
      ios: {},
      android: {
        marginBottom: 4,
      }
    })
  },
});