import Paho from "paho-mqtt";

import { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, TouchableOpacity, ScrollView } from 'react-native';
import Task from './components/Task'
import styles from './App.components.style'

client = new Paho.Client(
  "broker.hivemq.com",
  Number(8000),
  `mqtt-async-test-${parseInt(Math.random() * 100)}`
);

export default function info() {

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
    <View style={styles.container}>
     
      {/* <Text>Value is: {value}</Text>
      <Button onPress={() => { changeValue(client);} } title="Press Me"/>
      <StatusBar style="auto" /> */}
    </View>
  );
}
