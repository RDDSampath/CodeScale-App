import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screens/Dashboard/Dashboard';
import Profile from '../screens/Dashboard/Profile';


const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="DashboardScreen">
            <Stack.Screen name="DashboardScreen" component={Dashboard} />
            <Stack.Screen name="ProfileScreen" component={Profile} />
        </Stack.Navigator>
  );
};

export default AuthNavigation;