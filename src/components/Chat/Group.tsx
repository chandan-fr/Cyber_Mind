import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { commonstyles } from '../../assets/css/CommonStyles';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';
import { _Width } from '../../config/staticVariables';
import { icons } from '../../config/icons';

const Group = ({ navigation }: { navigation: any }): JSX.Element => {
  return (
    <View style={[commonstyles.parent, { marginHorizontal: 20, marginTop: 20 }]}>
      <ScrollView>
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
      </ScrollView>
    </View>
  )
};

export default Group;

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
});