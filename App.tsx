/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import CallLogs from 'react-native-call-log';
import Clipboard from '@react-native-clipboard/clipboard';

type Call = {
  dateTime: Date;
  duration: Number;
  name: string;
  phoneNumber: Number;
  rawType: Number;
  timeStamp: Number;
  type: string
}

const App = () => {
  const [numCallsToCopy, setNumCallsToCopy] = useState(2)

  const copyOne = () => { copyCall(1) }
  const copyN = (n : number) => {
    copyCall(n)
  }
  const copyCall = async (numCalls : number) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Call Log Example',
          message:
            'Access your call logs',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        CallLogs.load(numCalls).then((calls : Call[]) => {
          const selectedCalls = calls.map((call : Call) => {
            return {
              timeOfCall: call.dateTime,
              durationInSeconds: call.duration,
              contact: call.name,
              phoneNumber: call.phoneNumber,
              callType: call.type 
            }
          })
          console.log(selectedCalls)
          Clipboard.setString(JSON.stringify(selectedCalls))
        });
      } else {
        console.log('Call Log permission denied');
      }
    }
    catch (e) {
      console.log(e);
    }
  }
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => copyOne()} style={[styles.button, styles.copyOneButton]}>
          <Text style={[styles.buttonText, styles.oneCallText]}>Copy{"\n"}one{"\n"}call</Text>
        </TouchableOpacity>
        <View style={styles.nCallsButtons}>
          <View style={styles.nCallSetButtons}>
            <Button title={"-"} onPress={() => numCallsToCopy > 2 && setNumCallsToCopy(numCallsToCopy - 1)} />
          </View>
          <TouchableOpacity onPress={() => copyN(numCallsToCopy)} style={[styles.button, styles.copyNButton]}>
            <Text style={[styles.buttonText, styles.nCallText]}>Copy{"\n"}{numCallsToCopy}{"\n"}calls</Text>
          </TouchableOpacity>
          <View style={styles.nCallSetButtons}>
            <Button title={"+"} onPress={() => setNumCallsToCopy(numCallsToCopy + 1)} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgba(0,0,0,.4)"
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: "100%",
  },
  button: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 200,
    backgroundColor: "blue",
    borderRadius: 50,
  },
  copyOneButton: {},
  copyNButton: {},
  buttonText: {
    textAlign: "center",
    fontWeight: "900",
    fontSize: 40,
    color: "white",
  },
  oneCallText: {},
  nCallText: {},
  nCallsButtons: {
    width: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  nCallSetButtons: {
    margin: 20
  }
});

export default App;
