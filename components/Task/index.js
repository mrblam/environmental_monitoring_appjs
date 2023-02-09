import {
    View,
    Text,
    TouchableOpacity,
    Button,
    Dimensions,
    Image,
} from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Task = ({ data, navigation }) => {
    console.log(navigation);
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("info", {
                    data,
                });
            }}
        >
            <View style={styles.item}>
                <View style={styles.square}>
                    <Text style={styles.number}> 01 </Text>
                </View>
                <Text style={styles.content}>{data.name}</Text>
                <View style={styles.iconWrapper}>
                    <Image style={styles.icon} source={data.icon} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Task;
const styles = StyleSheet.create({
    item: {
        backgroundColor: "#fff",
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "space-between",
        width: width / 2 - 40,
        // height: height / 2 - 80 > 180 ? 180 : height / 2 - 80,
    },
    square: {
        width: 48,
        height: 36,
        borderRadius: 10,
        backgroundColor: "#52d6f2",
        alignItems: "center",
        justifyContent: "center",
    },
    number: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
    },
    content: {
        width: "80%",
        fontSize: 16,
        height: 80,
        textAlign: "center",
        fontWeight: "600",
    },
    iconWrapper: {
        width: "100%",
        height: 120,
    },
    icon: {
        width: "100%",
        height: "100%",
    },
});
