import Paho from "paho-mqtt";

import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    Button,
    View,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Task from "./components/Task";
import styles from "./App.components.style";
import home from "./screens/home";
import info from "./screens/info";

import AppNavigator from "./AppNavigator";
const Stack = createNativeStackNavigator();

client = new Paho.Client(
    "test.mosquitto.org",
    Number(8000),
    `mqtt-async-test-${parseInt(Math.random() * 100)}`
);

export default function App() {
    
    function changeValue(c) {
        const message = new Paho.Message((value + 1).toString());
        message.destinationName = "mqtt-async-test/value";
        c.send(message);
    }
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="home" component={home} />
                <Stack.Screen name="info" component={info} />
            </Stack.Navigator>
        </NavigationContainer>
    );
    return home();

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
}
