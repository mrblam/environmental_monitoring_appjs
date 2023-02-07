import Paho from "paho-mqtt";

import { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Task from './components/Task'
import styles from './App.components.style'
import home from './screens/home'
import AppNavigator from './AppNavigator'

client = new Paho.Client(
  "broker.hivemq.com",
  Number(8000),
  `mqtt-async-test-${parseInt(Math.random() * 100)}`
);

export default function App() {

  const [value, setValue] = useState(0);

  function onMessage(message) {
    if (message.destinationName === "mqtt-async-test/value")
        setValue(parseInt(message.payloadString));
  }

  useEffect(() => {
    client.connect( {
      onSuccess: () => { 
      console.log("Connected!");
      client.subscribe("mqtt-async-test/value");
      client.onMessageArrived = onMessage;
    },
    onFailure: () => {
      console.log("Failed to connect!"); 
    }
  });
  }, [])

  function changeValue(c) {
    const message = new Paho.Message((value + 1).toString());
    message.destinationName = "mqtt-async-test/value";
    c.send(message);
  }

  return (
    home()
    
    // {/* <NavigationContainer> 
      // {/* <AppNavigator.Navigator initialRouteName="Home">
        // <AppNavigator.Screen name="Home" component={home} />
        // <AppNavigator.Screen name="Details" component={DetailsScreen} />
      // </AppNavigator.Navigator> */}


      // <View style={styles.container}>
        // <View style = {styles.body}>
          // <Text style = {styles.header}> Mật độ giao thông tại các điểm </Text>
          // <ScrollView style = {styles.items}>
            // <Task></Task>
            // <Task></Task>
            // <Task></Task>
            // <Task></Task>
          // </ScrollView>
        // </View>  
        // {/* {/* <Text>Value is: {value}</Text> */}
        // {/* // <Button onPress={() => { changeValue(client);} } title="Press Me"/> */}
        //  {/* <StatusBar style="auto" /> */} */}
      // </View>
    //  {/* </NavigationContainer> */}
    
  );
}
