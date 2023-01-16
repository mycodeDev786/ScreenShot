import React, {useState, useRef, useEffect} from 'react';
import {
  Button,
  TextInput,
  View,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import ViewShot from 'react-native-view-shot';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

function App() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const refScreen = useRef();
  const [code, setCode] = useState('');

  const takeScreenShot = () => {
    refScreen.current.capture().then(uri => {
      Alert.alert('Image saved to', uri);
    });
  };
  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <View>
        <ViewShot
          ref={refScreen}
          options={{
            fileName: 'name',
            format: 'png',
            quality: 0.8,
          }}>
          <View
            style={{
              height: '100%',
              alignItems: 'center',
              backgroundColor: 'pink',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: 300,
                height: 300,
                borderRadius: 150,
                backgroundColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                takeScreenShot();
              }}>
              <Text style={{color: 'white'}}>Take Screenshot</Text>
            </TouchableOpacity>
          </View>
        </ViewShot>
      </View>
    );
  }

  return <></>;
}

export default App;
