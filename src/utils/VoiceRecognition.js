import React, { useState, useEffect } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native';
import Voice from '@react-native-voice/voice';

const VoiceRecognition = () => {
  const [recognized, setRecognized] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);

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
    setResults(e.value);
  };

  const startRecognizing = async () => {
    if (Platform.OS === 'android') {
      await requestMicrophonePermission();
    }
    try {
      await Voice.start('en-US');
      setRecognized('');
      setStarted('');
      setResults([]);
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    setRecognized('');
    setStarted('');
    setResults([]);
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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Recognized: {recognized}</Text>
      <Text>Started: {started}</Text>
      <Text>Results: {results.map((result, index) => <Text key={index}>{result}</Text>)}</Text>
      <Button title="Start Recognizing" onPress={startRecognizing} />
      <Button title="Stop Recognizing" onPress={stopRecognizing} />
      <Button title="Destroy Recognizer" onPress={destroyRecognizer} />
    </View>
  );
};

export default VoiceRecognition;
