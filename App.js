import Paho from "paho-mqtt";

import { useState, useEffect, createContext } from "react";
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
export const DataContext = createContext(null);
export const gates = [
    {
        code: "gate_1",
        name: "Cổng Parabol Giải Phóng",
        icon: require(`./assets/gate_1.jpeg`),
        topic: 'gate_1'
    },
    {
        code: "gate_2",
        name: "Cổng Đại Cồ Việt",
        icon: require(`./assets/gate_2.jpeg`),
        topic: 'gate_2'
    },
    {
        code: "gate_3",
        name: "Cổng Trần Đại Nghĩa",
        icon: require(`./assets/gate_3.jpeg`),
        topic: 'hoanpx'
    },
    {
        code: "gate_4",
        name: "Cổng dẫn vào khu Kí túc xá",
        icon: require(`./assets/gate_4.jpeg`),
        topic: 'gate_4'
    },
];
export default function App() {
  
    const [dataByTopic, setDataByTopic] = useState({});
    const updateDataByTopic = (topic, message) => {
        setDataByTopic(prev =>({
            ...prev,
            [topic]: message
        }))
    }

    useEffect(() => {
        try {
            client.connect({
                onSuccess: () => {
                    gates.forEach(item => {
                        client.subscribe(item.topic)
                    })
                    client.onMessageArrived = onMessage;
                },
                onFailure: () => {
                },
            });
        } catch (e) {
        }
    }, []);

    function onMessage(message) {
        updateDataByTopic(message.destinationName, message.payloadString)
    }
    return (
        <DataContext.Provider value={{
            dataByTopic, updateDataByTopic
        }}>
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
        </DataContext.Provider>
    );
}
