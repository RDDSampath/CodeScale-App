import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { 
  responsiveScreenHeight as SH,
  responsiveScreenWidth as SW,
  responsiveScreenFontSize as RF,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { images } from '../../constants/images';
import { fonts } from '../../constants';
import colors from '../../constants/colors';

const SplashScreen = ({navigation}) => {
  // State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  
  useEffect(() => {
    setTimeout(async () => {
      setAnimating(false);
      // Check if user is already logged in or not
      AsyncStorage.getItem('user').then((data) => {
        if(data !== null) {
          navigation.navigate('DashboardNavigation');
  
        } else {
          navigation.navigate('AuthNavigation');
        }
    });
    }, 3000);
  }, []);

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
