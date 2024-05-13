import { View } from 'react-native';
import ProfileNav from '../routes/ProfileNavigation';
import { commonstyles } from '../assets/css/CommonStyles';
import colors from '../config/colors';


const Profile = ():JSX.Element => {
  return (
    <View style={[commonstyles.parent, {backgroundColor: colors.userprofile.bgcolor,}]}>
        <ProfileNav/>
    </View>
  )
};

export default Profile;