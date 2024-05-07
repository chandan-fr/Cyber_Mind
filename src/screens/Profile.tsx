import { SafeAreaView } from 'react-native';
import ProfileNav from '../routes/ProfileNavigation';
import { commonstyles } from '../assets/css/CommonStyles';


const Profile = ():JSX.Element => {
  return (
    <SafeAreaView style={commonstyles.parent}>
        <ProfileNav/>
    </SafeAreaView>
  )
};

export default Profile;