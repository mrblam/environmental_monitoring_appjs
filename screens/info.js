import Paho from "paho-mqtt";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    Button,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native";
// import Task from "./components/Task";

const labels = [
    {
        code: "pm25",
        name: "PM 2.5",
        icon: require("./../assets/pm25.jpeg"),
    },
    {
        code: "mq7",
        name: "MQ 7",
        icon: require("./../assets/mq7.jpeg"),
    },
    {
        code: "gas",
        name: "Nồng độ khí gas",
        icon: require("./../assets/gas.jpeg"),
    },
];

export default function info({ route, navigation }) {
    const { data } = route.params;

    const [value, setValue] = useState({
        pm25: null,
        mq7: null,
        gas: null,
    });

    function onMessage(message) {
        console.log("message", message);
        if (message.destinationName === data.code) {
            const messageText = message.payloadString;
            const messageArr = messageText.split("_");
            try {
                setValue({
                    pm25: messageArr[0],
                    mq7: messageArr[1],
                    gas: messageArr[2],
                });
            } catch (e) {
                console.log(e);
            }
        }
    }

    useEffect(() => {
        client.onMessageArrived = onMessage;
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons
                    style={styles.backIcon}
                    name="arrow-back"
                    size={32}
                    color="#21a3d0"
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <Text style={styles.titleText}>Thông số chi tiết</Text>
            </View>
            <Text style={styles.nameText}>{data.name}</Text>
            <View style={styles.iconWrapper}>
                <Image style={styles.icon} source={data.icon} />
            </View>
            <View>
                {labels.map((item, index) => {
                    return (
                        <View style={styles.item}>
                            <View style={styles.labelItem}>
                                <View style={styles.labelIconWrapper}>
                                    <Image
                                        style={styles.labelIcon}
                                        source={item.icon}
                                    />
                                </View>
                                <Text style={styles.labelText}>
                                    {item.name}
                                </Text>
                            </View>
                            <View style={styles.contentItem}>
                                <Text style={styles.contentText}>
                                    {value[item.code] === null ? "_" : ""}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        padding: 20,
        backgroundColor: "#eff7f8",
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    header: {
        padding: 10,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    backIcon: {
        position: "absolute",
        left: 0,
    },
    titleText: {
        fontWeight: "600",
        fontSize: 18,
        color: "#21a3d0",
    },
    iconWrapper: {
        width: "100%",
        height: 180,
    },
    icon: {
        width: "100%",
        height: "100%",
        borderRadius: 24,
        overflow: "hidden",
    },
    nameText: {
        fontWeight: "700",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10,
    },
    item: {
        paddingVertical: 10,
    },
    labelItem: {
        flexDirection: "row",
        paddingBottom: 5,
    },
    labelIconWrapper: {
        width: 24,
        height: 24,
    },
    labelIcon: {
        width: "100%",
        height: "100%",
    },
    labelText: {
        fontSize: 15,
        fontWeight: "600",
        paddingHorizontal: 5,
    },
    contentItem: {
        paddingLeft: 40,
    },
    contentText: {
        fontStyle: "italic",
        fontSize: 20,
        fontWeight: "300",
    },
});
