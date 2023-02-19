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
import Home from "./screens/home";
import Info from "./screens/info";
const Stack = createNativeStackNavigator();

client = new Paho.Client(
    "broker.hivemq.com",
    Number(8000),
    `mqtt-async-test-${parseInt(Math.random() * 100)}`
);

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="home" component={Home} />
                <Stack.Screen name="info" component={Info} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
