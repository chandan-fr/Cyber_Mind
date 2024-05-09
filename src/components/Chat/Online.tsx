import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { commonstyles } from '../../assets/css/CommonStyles';
import ChatThread from './ChatThread';
import { useNavigation } from '@react-navigation/native';

const Online = (): JSX.Element => {
  const navigation = useNavigation();

  return (
    <View style={[commonstyles.parent, { marginHorizontal: 20, marginTop: 20 }]}>
      <FlatList
        data={[{}, {}, {}, {}, {}]}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index: number) => index.toString()}
        renderItem={({ item }) => (
          <ChatThread item={item} navigation={navigation} />
        )}
      />

      <ScrollView>
        {/* <TouchableOpacity
          style={[styles.chatContainer, commonstyles.fdRow, commonstyles.acjsb]}
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
            <View style={[styles.noOfMsgWrap, commonstyles.acjc]}>
            <Text style={styles.noOfMsg}>2</Text>
          </View>

            <Text style={styles.chatTime} >09:02</Text>
          </View>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  )
};

export default Online;

const styles = StyleSheet.create({

});