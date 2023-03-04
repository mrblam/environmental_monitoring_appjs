import Paho from "paho-mqtt";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useState, useEffect, useContext } from "react";
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
import { DataContext } from "../App";

const labels = [
    {
        code: "pm25",
        name: "PM 2.5",
        icon: require("./../assets/pm25.jpeg"),
        unit: "ppm"
    },
    {
        code: "mq7",
        name: "CO",
        icon: require("./../assets/mq7.jpeg"),
        unit: "ppm"
    },
    {
        code: "gas",
        name: "Tiếng ồn",
        icon: require("./../assets/gas.jpeg"),
        unit: "db"
    },
];

export default function Info({ route, navigation }) {
    const { data, message } = route.params;
    const {dataByTopic, updateDataByTopic} = useContext(DataContext);

    const [value, setValue] = useState({
        pm25: null,
        mq7: null,
        gas: null,
    });
    useEffect(() => {
        if (dataByTopic && dataByTopic[data.topic]) {
            const messageJson = JSON.parse(dataByTopic[data.topic]);
            const gas_ppm = messageJson.gas;
            const pm25 = messageJson.pm25;
            const tieng_on = messageJson.tieng_on;
            try {
                setValue({
                    pm25: parseFloat(pm25),
                    mq7: parseFloat(gas_ppm),
                    gas: parseFloat(tieng_on),
                });
            } catch (e) {
            }
        }
    }, [dataByTopic])

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
                                    {value[item.code] === null ? "_" : value[item.code]}
                                </Text>
                                <Text style={styles.unitText}>
                                    {item.unit}
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
        flexDirection: "row"
    },
    contentText: {
        fontStyle: "italic",
        fontSize: 20,
        fontWeight: "300",
    },
    unitText: {
        fontSize: 16,
        fontWeight: "500",
        color: "green",
        paddingLeft: 5
    }
});
