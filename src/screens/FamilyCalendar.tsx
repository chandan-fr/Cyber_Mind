import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import FamilyCalendarNavigation from '../routes/FamilyCalendarNavigation';
import { commonstyles } from '../assets/css/CommonStyles';

const FamilyCalendar = (): JSX.Element => {
  return (
    <SafeAreaView style={[commonstyles.parent, {}]}>
      <FamilyCalendarNavigation />
    </SafeAreaView>
  )
};

export default FamilyCalendar;

const styles = StyleSheet.create({});