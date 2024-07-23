import React, { useEffect, useState } from 'react';
import {Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { images } from '../../constants';

const { BatteryLevel } = NativeModules;

const Profile = ({navigation}) => {

  const [batteryLevel, setBatteryLevel] = useState(0);
  const [user, setUser] = useState({});
  console.log(user);

  useEffect(() => {
    AsyncStorage.getItem('user').then((data) => {
      if(data !== null) {
        setUser(JSON.parse(data));
      } else {
        navigation.navigate('AuthNavigation');
      }
    });
    getBatteryLevel();
  }, []);


  const getBatteryLevel = async () => {
    try {
        const batteryLevel = await BatteryLevel.getBatteryLevel();
        console.log(`Battery Level: ${batteryLevel}%`);
        setBatteryLevel(batteryLevel);

    } catch (e) {
        console.error(e);
    }
};

  const logOut = () => {
    AsyncStorage.clear();
    console.log('User signed out');
    navigation.navigate('AuthNavigation');
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

        <TouchableOpacity style={styles.button} onPress={logOut}>
            <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>


    </View>
  )
}

export default Profile;
