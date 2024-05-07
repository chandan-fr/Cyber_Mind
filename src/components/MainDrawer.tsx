import { SafeAreaView, View } from 'react-native'
import React from 'react'
import BottomNavigation from '../routes/BottomNavigation';

const MainDrawer = (): JSX.Element => {
    return (
        <View style={{ flex: 1 }}>
            <BottomNavigation />
        </View>
    )
};

export default MainDrawer;