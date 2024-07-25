import React, { useEffect, useState } from 'react';
import {Alert, Image, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { images } from '../../constants';
import auth from '@react-native-firebase/auth';

const { BatteryLevel } = NativeModules;

const Profile = ({navigation}) => {

  const [batteryLevel, setBatteryLevel] = useState(0);
  const user = auth().currentUser;

  useEffect(() => {
    getBatteryLevel();
  }, []);


  const getBatteryLevel = async () => {
    try {
        const batteryLevel = await BatteryLevel.getBatteryLevel();
        //console.log(`Battery Level: ${batteryLevel}%`);
        setBatteryLevel(batteryLevel);

    } catch (e) {
        console.error(e);
    }
};

  const logOutAlert = () => {
    Alert.alert(
      'Log out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => signOut() }
      ]
    );
  }

  const signOut = () => {
    auth().signOut().then(() => {
      AsyncStorage.removeItem('user');
      ToastAndroid.show('User signed out successfully', ToastAndroid.SHORT);
      navigation.navigate('AuthNavigation');
    }).catch((error) => {
      ToastAndroid.show('Error during sign-out', ToastAndroid.SHORT);
      console.error('Error during sign-out:', error);
    });
  }

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
                <Text style={styles.headerText}>Profile</Text>
        </View>

        <View style={styles.inputBox}>
            <Text style={styles.labelTxt}>Name</Text>
            <Text style={styles.valuep}>{user.displayName}</Text>
        </View>
        <View style={styles.inputBox}>
            <Text style={styles.labelTxt}>Email Address</Text>
            <Text style={styles.valuep}>{user.email}</Text>
        </View>
        <View style={styles.inputBox}>
            <Text style={styles.labelTxt}>Battery Level</Text>
            <Text style={styles.valuep}>{batteryLevel}%</Text>
        </View>
        <TouchableOpacity style={styles.backBtn}onPress={handleBack}>
          <Image source={images.back} style={styles.back} resizeMode='contain' />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={logOutAlert}>
            <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>


    </View>
  )
}

export default Profile;
