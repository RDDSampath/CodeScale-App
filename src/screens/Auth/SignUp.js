import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ToastAndroid, Image} from 'react-native';
import styles from './styles';
//import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
//import {app} from '../../firebase/config';
import colors from '../../constants/colors';
import { images } from '../../constants/images';
import auth from '@react-native-firebase/auth';

const SignUp = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword ] = useState(false);

    const [isLowerCase,setIsLowerCase] = useState(false);
    const [isUpperCase,setIsUpperCase] = useState(false);
    const [isNumber,setIsNumber] = useState(false);
    const [isLength,setIsLength] = useState(false);
    const [checkConfirmPassword,setCheckConfirmPassword] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);

    useEffect(() => {
        checkPassword(password);
        checkingPassword(password,confirmPassword);
        checkingEmail(email);
    }, [password,confirmPassword, email]);

    const checkPassword = (password) => {
        const lowerCase = new RegExp('(?=.*[a-z])');
        const upperCase = new RegExp('(?=.*[A-Z])');
        const number = new RegExp('(?=.*[0-9])');
        const length = new RegExp('(?=.{8,})');
        setIsLowerCase(lowerCase.test(password));
        setIsUpperCase(upperCase.test(password));
        setIsNumber(number.test(password));
        setIsLength(length.test(password));
    };

    const checkingPassword = (password,confirmPassword) => {
        if(password === confirmPassword){
            if(password.length > 0 && confirmPassword.length > 0){
            setCheckConfirmPassword(true);
            }else{
                setCheckConfirmPassword(false);
            }
        }else{
            setCheckConfirmPassword(false);
        }
    };

    const checkingEmail = (email) => {
        if(email.length > 0){
        const emailPattern = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
        setIsValidEmail(emailPattern.test(email));
        }else{
            setIsValidEmail(false);
        }
    };

    const signUp = async () => {
        if(!isLowerCase || !isUpperCase || !isNumber || !isLength || !checkConfirmPassword || !isValidEmail){
            ToastAndroid.show('Please check the rules', ToastAndroid.SHORT);
            return;
        }
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        await userCredential.user.updateProfile({ displayName: name })
        //const auth = getAuth(app);
        //createUserWithEmailAndPassword(auth, email, password)
            // .then((userCredential) => {
            //     // Signed in 
            //     const user = userCredential.user;
            //     console.log(user);
            //     // Update the user profile
            //     updateProfile(user, {
            //         displayName: name
            //     })
                .then(() => {
                    // Update successful
                    // ...
                    ToastAndroid.show('User signed up successfully', ToastAndroid.SHORT);
                    navigation.navigate("SignInScreen");

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error during sign-up:', errorCode, errorMessage);
                ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
            });
    };

    return (
        <View style={styles.container}>
            <Image source={images.logoWhite} style={styles.logoIconSignUp} resizeMode='contain' />
            <View style={styles.inputBox}>
                <Text style={styles.labelTxt}>Name</Text>
                <TextInput
                    placeholder="Name"
                    placeholderTextColor={colors.LABEL_COLOR}
                    style={[styles.input,{marginTop:0}]}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
            </View>
            <View style={styles.inputBox}>
            <TextInput
                placeholder="Email Address" 
                placeholderTextColor={colors.LABEL_COLOR}
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            </View>
            {email.length > 0 ? (isValidEmail ? null : <Text style={styles.errorText}>Enter Valid Email Address</Text>) : null }
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
            <View style={styles.inputBox}>
                <View style={styles.PasswordBox}>
                    <TextInput 
                        placeholder="Confirm Password" 
                        placeholderTextColor={colors.LABEL_COLOR}
                        style={styles.input}
                        value={confirmPassword}
                        secureTextEntry={showConfirmPassword ? false : true}
                        onChangeText={(text) => setConfirmPassword(text)}
                    />
                    {showConfirmPassword ?
                    <TouchableOpacity style={styles.showPasswordBtn} onPress={()=> setShowConfirmPassword(!showConfirmPassword)}>
                        <Image source={images.hide} style={styles.showIcon}/>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.showPasswordBtn} onPress={()=> setShowConfirmPassword(!showConfirmPassword)}>
                        <Image source={images.show} style={styles.showIcon}/>
                    </TouchableOpacity>
                    }
                </View> 
            </View>
            <View style={styles.rulesBox}>
                <View style={styles.ruleLine}>
                    <View style={styles.rule}>
                        {isLowerCase ? 
                            <>
                                <Image source={images.acsept} style={styles.ruleIcon2}/> 
                                <Text style={styles.ruleText}>One lowercase character</Text>
                            </>
                            :
                            <>
                                <Image source={images.refresh} style={styles.ruleIcon}/> 
                                <Text style={styles.ruleText}>One lowercase character</Text>
                            </>
                            }
                    </View>
                    <View style={styles.rule}>
                    {isLength ? 
                            <>
                                <Image source={images.acsept} style={styles.ruleIcon2}/> 
                                <Text style={styles.ruleText}>8 characters minimum</Text>
                            </>
                            :
                            <>
                                <Image source={images.refresh} style={styles.ruleIcon}/> 
                                <Text style={styles.ruleText}>8 characters minimum</Text>
                            </>
                            }
                    </View>
                </View>
                <View style={styles.ruleLine}>
                    <View style={styles.rule}>
                    {isUpperCase ? 
                            <>
                                <Image source={images.acsept} style={styles.ruleIcon2}/> 
                                <Text style={styles.ruleText}>One uppercase character</Text>
                            </>
                            :
                            <>
                                <Image source={images.refresh} style={styles.ruleIcon}/> 
                                <Text style={styles.ruleText}>One uppercase character</Text>
                            </>
                            }
                    </View>
                    <View style={styles.rule}>
                    {isNumber ? 
                            <>
                                <Image source={images.acsept} style={styles.ruleIcon2}/> 
                                <Text style={styles.ruleText}>One Number</Text>
                            </>
                            :
                            <>
                                <Image source={images.refresh} style={styles.ruleIcon}/> 
                                <Text style={styles.ruleText}>One Number</Text>
                            </>
                            }
                    </View>
                </View>
                <View style={styles.ruleLine}>
                    <View style={styles.rule}>
                    {checkConfirmPassword ? 
                            <>
                                <Image source={images.acsept} style={styles.ruleIcon2}/> 
                                <Text style={styles.ruleText}>Password match</Text>
                            </>
                            :
                            <>
                                <Image source={images.refresh} style={styles.ruleIcon}/> 
                                <Text style={styles.ruleText}>Password match</Text>
                            </>
                            }
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.signBtn} onPress={signUp}>
                <Text style={styles.signBtnText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.signUpNav}>
                <Text style={styles.signUpText}>Have an account?</Text>
                <TouchableOpacity onPress={()=> navigation.navigate('SignInScreen')}>
                    <Text style={styles.signUpBtn}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default SignUp;
