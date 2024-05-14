import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import FamilyCalendarNavigation from '../routes/FamilyCalendarNavigation';
import { commonstyles } from '../assets/css/CommonStyles';
import colors from '../config/colors';

const FamilyCalendar = (): JSX.Element => {
  return (
    <View style={[commonstyles.parent, {backgroundColor: colors.addevent.bgcolor}]}>
      <StatusBar barStyle="default"  />
      <FamilyCalendarNavigation />
    </View>
  )
};

export default FamilyCalendar;

const styles = StyleSheet.create({});