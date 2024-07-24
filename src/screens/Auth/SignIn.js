import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity,ToastAndroid, Image } from 'react-native';
import styles from './styles';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, images } from '../../constants';

const SignIn = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const signIn = () => {
        const emailPattern = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
        if(email === '' && password === '' ) {
            ToastAndroid.show('Email and password is required', ToastAndroid.SHORT);
        } else if(emailPattern.test(email) === false){
            ToastAndroid.show('Invalid email address', ToastAndroid.SHORT);
            return;
        }
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                AsyncStorage.setItem('user', JSON.stringify(user));
                console.log('User data stored in AsyncStorage');
                console.log('User signed in:', user);
                ToastAndroid.show('User signed in successfully', ToastAndroid.SHORT);
                navigation.navigate('DashboardNavigation');
                
            })
            .catch((error) => {
                ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error during sign-in:', errorCode, errorMessage);
            });
    };

    return (
        <View style={styles.container}>
            <Image source={images.logoWhite} style={styles.logoIcon} resizeMode='contain' />
            <View style={styles.inputBox}>
                <Text style={styles.labelTxt}>Email </Text>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={colors.LABEL_COLOR}
                    style={[styles.input,{marginTop:0}]}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <View style={styles.inputBox}>
                <View style={styles.PasswordBox}>
                    <TextInput 
                        placeholder="Password" 
                        placeholderTextColor={colors.LABEL_COLOR}
                        style={styles.input}
                        value={password}
                        secureTextEntry={showPassword ? false : true}
                        onChangeText={(text) => setPassword(text)}
                    />
                    {showPassword ?
                    <TouchableOpacity style={styles.showPasswordBtn} onPress={()=> setShowPassword(!showPassword)}>
                        <Image source={images.hide} style={styles.showIcon}/>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.showPasswordBtn} onPress={()=> setShowPassword(!showPassword)}>
                        <Image source={images.show} style={styles.showIcon}/>
                    </TouchableOpacity>
                    }
                    </View> 
            </View>
            <TouchableOpacity  style={styles.forgotButton}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signBtn} onPress={signIn}>
                <Text style={styles.signBtnText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.signUpNav}>
                <Text style={styles.signUpText}>Don't have an account?</Text>
                <TouchableOpacity onPress={()=> navigation.navigate('SignUpScreen')}>
                    <Text style={styles.signUpBtn}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default SignIn;
