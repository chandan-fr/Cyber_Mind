import { View } from 'react-native'
import React from 'react'
import ChatNav from '../routes/ChatNavigation';
import { commonstyles } from '../assets/css/CommonStyles';

const Chat = () => {
  return (
    <View style={commonstyles.parent}>
      <ChatNav />
    </View>
  )
}

export default Chat;