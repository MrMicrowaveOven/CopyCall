/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

const App = () => {
  const copyOne = () => {}
  const copyN = () => {}
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => copyOne()} style={[styles.button, styles.copyOneButton]}>
          <Text style={[styles.buttonText, styles.oneCallText]}>Copy{"\n"}one{"\n"}call</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => copyN()} style={[styles.button, styles.copyNButton]}>
          <Text style={[styles.buttonText, styles.nCallText]}>Copy{"\n"}several{"\n"}calls</Text>
        </TouchableOpacity>
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
});

export default App;
