import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/routes/RootNavigation';
import Loader from './src/utility/Loader';
import { useSelector } from 'react-redux';
import AlertModal from './src/components/AlertModal';
import { StatusBar } from 'react-native';
import { setNavigationRef } from './src/services/api/Api';

function App(): JSX.Element {
  const { user_loading } = useSelector((state: any) => state.userSlice);
  const { utility_loading } = useSelector((state: any) => state.utilitySlice);

  return (
    <NavigationContainer ref={ref => setNavigationRef(ref)}>
      <StatusBar translucent={true} backgroundColor={"transparent"} barStyle={"default"} />
      <AlertModal />
      <Loader visible={user_loading || utility_loading} source={require("../CyberMind/src/assets/loaders/loader.json")} />
      <RootNavigation />
    </NavigationContainer>
  );
};

export default App;