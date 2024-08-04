import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Image, TextInput, Button, PermissionsAndroid, Platform, TouchableOpacity } from 'react-native';
import styles from './styles';
import Voice from '@react-native-voice/voice';
import { images } from '../../constants';
import { useSelector, useDispatch} from 'react-redux';
import { fetchCharacters } from '../../store/characterReducer';

const Dashboard = ({navigation}) => {
    const dispatch = useDispatch();
    const characters = useSelector((state) => state.character.data);
    const loading = useSelector((state) => state.character.isLoader);
    const error = useSelector((state) => state.character.isError);
    console.log('Characters:', characters);
    const [query, setQuery] = useState('');
    const [recognized, setRecognized] = useState('');
    const [started, setStarted] = useState('');
    const [results, setResults] = useState([]);
    const [start, setStart] = useState(false);
    const [filteredCharacters, setFilteredCharacters] = useState();
    

    useEffect(() => {
        dispatch(fetchCharacters());
    }, [dispatch]);

    useEffect(() => {
        setFilteredCharacters(characters);
    }, [characters]);

    useEffect(() => {
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechRecognized = onSpeechRecognized;
        Voice.onSpeechResults = onSpeechResults;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const onSpeechStart = (e) => {
        setStarted('√');
    };

    const onSpeechRecognized = (e) => {
        setRecognized('√');
    };

    const onSpeechResults = (e) => {
        const speechText = e.value[0];
        setQuery(speechText);
        filterCharacters(speechText);
        setResults(e.value);
    };

    const startRecognizing = async () => {
        if (Platform.OS === 'android') {
            await requestMicrophonePermission();
        }
        try {
            setStart(true);
            await Voice.start('en-US');
            setQuery('');
            setStart(false);
        } catch (e) {
            console.error(e);
        }
    };

    const requestMicrophonePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: 'Microphone Permission',
                    message: 'App needs access to your microphone to use voice recognition',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Microphone permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const filterCharacters = (text) => {
        const filtered = characters.filter(character =>
            character.fullName.toLowerCase().includes(text.toLowerCase()) ||
            character.title.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredCharacters(filtered);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Dashboard</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search..."
                        placeholderTextColor={'gray'}
                        value={query}
                        onChangeText={(text) => {
                            setQuery(text);
                            filterCharacters(text);
                        }}
                    />
                    <TouchableOpacity onPress={startRecognizing}>
                        {start ?
                            <Image style={styles.voiceIcon} source={images.voiceStart} />
                            :
                            <Image style={styles.voiceIcon} source={images.voice} />
                        }
                    </TouchableOpacity>
                </View>
            </View>
            {loading ? (
                <View style={styles.loadBack}>
                    <Image source={images.loadingpet} style={styles.loading} />
                </View>
            ) : error ? (
                <View style={styles.loadBack2}>
                    <Image source={images.nowifi}  />
                    <Text>{error}</Text>
                </View>
                
            ) : (
                <FlatList
                    data={filteredCharacters}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.charactersCard}>
                            <View style={styles.cardLeft}>
                                <Text style={styles.titleTxt}>{item.title}</Text>
                                <Image
                                    style={styles.characterImage}
                                    source={{
                                        uri: item.imageUrl,
                                    }}
                                />
                            </View>
                            <View style={styles.cardRight}>
                                <Text style={styles.semiTitle}>{"Full Name : "}</Text>
                                <Text style={styles.value}>{item.fullName}</Text>
                                <Text style={styles.semiTitle}>{"Family : "}</Text>
                                <Text style={styles.value}>{item.family}</Text>
                            </View>
                        </View>
                    )}
                />
            )}
            <TouchableOpacity style={styles.settingButton} onPress={()=> navigation.navigate("ProfileScreen")}>
              <Image source={images.setting} style={styles.settingIcon} />
            </TouchableOpacity>
        </View>
    );
};

export default Dashboard;
