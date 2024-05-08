import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Platform } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { BlurView } from '@react-native-community/blur';
import { commonstyles } from '../../assets/css/CommonStyles';
import colors from '../../config/colors';
import { icons } from '../../config/icons';
import { _Height } from '../../config/staticVariables';
import { fonts } from '../../config/fonts';
import { getImagUrl } from '../../utility/UtilityFunctions';

const UserProfile = ({ navigation }: { navigation: any }): JSX.Element => {
  const { user, user_loading } = useSelector((state: any) => state.userSlice);
  
  return (
    <View style={[commonstyles.parent, { backgroundColor: colors.userprofile.bgcolor }]}>
      {/* top content */}
      <LinearGradient
        style={styles.headerTop}
        colors={colors.userprofile.gdcolor}
        useAngle={true}
        angle={90}
        angleCenter={{ x: 0.25, y: 0 }}
      >
        {/* navigation */}
        <View style={[styles.navWrap, commonstyles.fdRow]}>
          <TouchableOpacity
            style={[styles.nav, commonstyles.acjc]}
          >
            <Image source={icons.arrow} style={styles.navImg} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menu, commonstyles.acjc]}
          >
            <Image source={icons.dots} style={styles.menuImg} />
          </TouchableOpacity>
        </View>

        {/* user image */}
        <View style={[commonstyles.acjc]}>
          <View
            style={[styles.user, commonstyles.acjc]}
          >
            <Image source={user?.profile_img ? { uri: getImagUrl(user?.profile_img) } : icons.user_dumy} style={styles.user_dummy} />

            {/* edit button */}
            <TouchableOpacity
              style={[styles.userEdit, commonstyles.acjc]}
              onPress={() => navigation.navigate("editprofile")}
            >
              <Image source={icons.pencil} style={styles.userEditImg} />
            </TouchableOpacity>
          </View>
        </View>

        {/* user name */}
        <View style={[commonstyles.acjc, { marginTop: 25 }]}>
          <Text style={styles.userName}>{user?.full_name}</Text>
        </View>
      </LinearGradient>

      {/* profile content */}
      <View style={styles.profileMenu}>
        {/* content section */}
        <View style={{ paddingVertical: 8 }}>
          <TouchableOpacity
            style={[commonstyles.fdRow, commonstyles.acjsb, { marginHorizontal: 20, marginVertical: 10, paddingVertical: 4 }]}
          >
            <View style={[commonstyles.fdRow, commonstyles.acjsb, { columnGap: 20 }]}>
              <View style={[styles.contentImgWrap, commonstyles.acjc]}>
                <Image source={icons.user} style={styles.contentImg} />
              </View>

              <Text style={styles.contentTxt}>Account</Text>
            </View>

            <View>
              <Image source={icons.arrow} style={styles.contentArrow} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[commonstyles.fdRow, commonstyles.acjsb, { marginHorizontal: 20, marginVertical: 10, paddingVertical: 4 }]}
          >
            <View style={[commonstyles.fdRow, commonstyles.acjsb, { columnGap: 20 }]}>
              <View style={[styles.contentImgWrap, commonstyles.acjc]}>
                <Image source={icons.user} style={styles.contentImg} />
              </View>

              <Text style={styles.contentTxt}>Account</Text>
            </View>

            <View>
              <Image source={icons.arrow} style={styles.contentArrow} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[commonstyles.fdRow, commonstyles.acjsb, { marginHorizontal: 20, marginVertical: 10, paddingVertical: 4 }]}
          >
            <View style={[commonstyles.fdRow, commonstyles.acjsb, { columnGap: 20 }]}>
              <View style={[styles.contentImgWrap, commonstyles.acjc]}>
                <Image source={icons.user} style={styles.contentImg} />
              </View>

              <Text style={styles.contentTxt}>Account</Text>
            </View>

            <View>
              <Image source={icons.arrow} style={styles.contentArrow} />
            </View>
          </TouchableOpacity>
        </View>

        {/* blur */}
        {Platform.OS === "ios" ?
          <BlurView
            style={styles.blurView}
            blurType="light"
            blurAmount={4}
            reducedTransparencyFallbackColor="rgba(0, 158, 245, 0.3)"
          />
          :
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.3)"]}
            style={{ width: "100%", height: "100%", position: "absolute", zIndex: -2, borderRadius: 16 }}
          />
        }
      </View>
    </View>
  )
};

export default UserProfile;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  headerTop: {
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    ...Platform.select({
      ios: {
        height: _Height * 0.37,
      },
      android: {
        height: _Height * 0.42,
      }
    })
  },
  navWrap: {
    marginHorizontal: 20,
    marginTop: 25,
    alignItems: "center",
    justifyContent: "space-between",
  },
  nav: {
    borderWidth: 1,
    borderColor: colors.white,
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  navImg: {
    width: 20,
    height: 20,
    tintColor: colors.white,
  },
  menu: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  menuImg: {
    width: 20,
    height: 20,
    tintColor: colors.white,
  },
  user_dummy: {
    width: 140,
    height: 140,
    borderRadius: 100,
  },
  user: {
    borderWidth: 5,
    width: 147,
    height: 147,
    borderRadius: 100,
    borderColor: colors.white,
    position: "relative",
  },
  userEdit: {
    width: 40,
    height: 40,
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: 30,
  },
  userEditImg: {
    width: 15,
    height: 15,
    tintColor: colors.userprofile.pencil,
  },
  userName: {
    fontSize: 25,
    fontFamily: fonts.semibold,
    color: colors.white,
  },
  blurView: {
    borderRadius: 18,
    ...Platform.select({
      ios: {
        ...StyleSheet.absoluteFillObject,
        height: 383,
        zIndex: -1,
      },
      android: {}
    }),
  },
  profileMenu: {
    marginHorizontal: 30,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: colors.white,
    ...Platform.select({
      ios: {
        marginTop: -35,
        height: 390,
      },
      android: {
        marginTop: -40,
        height: 380,
      }
    }),
    backgroundColor: colors.userprofile.contentbgcolor,
    position: "relative",
  },
  contentImgWrap: {
    backgroundColor: colors.black,
    width: 22,
    height: 22,
    borderRadius: 20,
  },
  contentImg: {
    width: 13,
    height: 13,
    tintColor: colors.white,
  },
  contentTxt: {
    fontSize: 18,
    fontFamily: fonts.medium,
    color: colors.userprofile.contenttextcolor,
  },
  contentArrow: {
    width: 23,
    height: 23,
    transform: [{ rotate: "180deg" }],
  },
});