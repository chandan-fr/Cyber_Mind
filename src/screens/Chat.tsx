import { SafeAreaView } from 'react-native'
import React from 'react'
import ChatNav from '../routes/ChatNavigation';
import { commonstyles } from '../assets/css/CommonStyles';

const Chat = () => {
  return (
    <SafeAreaView style={commonstyles.parent}>
      <ChatNav />
    </SafeAreaView>
  )
}

export default Chat;