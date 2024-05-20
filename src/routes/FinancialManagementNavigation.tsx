import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FinManHome from '../components/FinancialManagement/FinManHome';
import SendMoney from '../components/FinancialManagement/SendMoney';
import Transactions from '../components/FinancialManagement/Transactions';
import AllTransaction from '../components/FinancialManagement/AllTransaction';

const FinMgmntStack = createNativeStackNavigator();

const FinancialManagementNavigation = (): JSX.Element => {
    return (
        <FinMgmntStack.Navigator initialRouteName='finhome' screenOptions={{ headerShown: false }}>
            <FinMgmntStack.Screen name='finhome' component={FinManHome} />
            <FinMgmntStack.Screen name='sendmoney' component={SendMoney} />
            <FinMgmntStack.Screen name='tnx' component={Transactions} />
            <FinMgmntStack.Screen name='alltnx' component={AllTransaction} />
        </FinMgmntStack.Navigator>
    )
};

export default FinancialManagementNavigation;