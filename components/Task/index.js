import {
    View,
    Text,
    TouchableOpacity,
    Button,
    Dimensions,
    Image,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";

import { StyleSheet } from "react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const LEVEL_LOW = 'low';
const LEVEL_MEDIUM = 'medium';
const LEVEL_HIGH = 'high';

const styleByLevel = {
    [LEVEL_LOW]: {
        color: '#fff',
        backgroundColor: 'green',
        text: 'Thấp'
    },
    [LEVEL_MEDIUM]: {
        color: 'grey',
        backgroundColor: 'yellow',
        text: 'Trung bình'
    },
    [LEVEL_HIGH]: {
        color: '#fff',
        backgroundColor: 'red',
        text: 'Cao'
    }
}

const Task = ({ data, navigation, message }) => {
    const [value, setValue] = useState({
        pm25: null,
        mq7: null,
        gas: null,
    });

    useEffect(() => {
        if (message) {
            // const message = message.replace(/[^\{\}\[\]0-9a-zA-Z\,\.\:]+/g, '')
            // messasge = message.replace('►', '');
            // let json_object = JSON.parse(message);
            console.log(message)
            const messageJson = JSON.parse(message);

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
    }, [message])


    const {
        pm25,
        mq7,
        gas
    } = value;

    let level = null;
    if (mq7 && gas) {
        if (mq7 < 10 && gas < 20) {
            level = LEVEL_LOW;
        } else if ((10 < mq7 && mq7 < 120 && gas < 20) || (20 < gas && gas < 100 && mq7 < 10)) {
            level = LEVEL_MEDIUM;
        } else if ((10 < mq7 && 20 < gas) || gas > 100 || mq7 > 120) {
            level = LEVEL_HIGH;
        }
    }
    if (level) {
        level = styleByLevel[level]
    }
     
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("info", {
                    data,
                    message
                });
            }}
        >
            <View style={styles.item}>
                {level ? <View style={{...styles.square, ...({backgroundColor: level.backgroundColor})}}>
                    <Text numberOfLines={1} style={{...styles.number, ...({color: level.color})}}>{level.text}</Text>
                </View> : <View style={styles.square}></View>}
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
        backgroundColor: "#eff7f8",
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
        height: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    number: {
        fontSize: 16,
        fontWeight: "700",
        // color: "#fff",
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
