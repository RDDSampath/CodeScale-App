import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';


const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="ProfileScreen">
            <Stack.Screen name="SignInScreen" component={SignIn} />
            <Stack.Screen name="SignUpScreen" component={SignUp} />
        </Stack.Navigator>
  );
};

export default AuthNavigation;