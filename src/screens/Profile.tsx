import { SafeAreaView } from 'react-native';
import ProfileNav from '../routes/ProfileNavigation';
import { commonstyles } from '../assets/css/CommonStyles';
import colors from '../config/colors';


const Profile = ():JSX.Element => {
  return (
    <SafeAreaView style={[commonstyles.parent, {backgroundColor: colors.userprofile.bgcolor,}]}>
        <ProfileNav/>
    </SafeAreaView>
  )
};

export default Profile;