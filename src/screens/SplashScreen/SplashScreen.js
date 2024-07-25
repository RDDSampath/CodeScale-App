import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { 
  responsiveScreenHeight as SH,
  responsiveScreenWidth as SW,
  responsiveScreenFontSize as RF,
} from 'react-native-responsive-dimensions';
import { images } from '../../constants/images';
import { fonts } from '../../constants';
import colors from '../../constants/colors';
import auth from '@react-native-firebase/auth';

const SplashScreen = ({navigation}) => {
  // State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      const user = auth().currentUser;
      if (user) {
        // User is signed in, navigate to the main screen
        navigation.navigate('DashboardNavigation');  // Update with the correct screen name
      } else {
        // User is not signed in, navigate to the sign-in screen
        navigation.navigate('AuthNavigation');
      }
      setLoading(false);
    }, 3000);

  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={images.logoWhite} style={{height: 200 ,width:200, marginTop:SH(5)}} resizeMode='contain' />
      
      <Image source={images.loading} style={styles.loading} resizeMode='contain' />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.MAIN_THEME_COLOR,
    paddingTop: SH(15),
  },
  logoText: {
    fontFamily: fonts.interBold,
    fontSize: RF(5),
   top: SH(30),
   color: colors.WHITE_COLOR,
    position: 'absolute',
  },
  loading: {
    height: 50,
    width: 50,
    top: SH(75),
    position: 'absolute',
  },
});
