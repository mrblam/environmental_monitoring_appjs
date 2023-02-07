import Paho from "paho-mqtt";

import { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, TouchableOpacity, ScrollView } from 'react-native';
import Task from '../components/Task'
import styles from '../App.components.style'


export default function home() {
  return (
    <View style={styles.container}>
      <View style = {styles.body}>
        <Text style = {styles.header}> Mật độ giao thông tại các điểm </Text>
        <ScrollView style = {styles.items}>
          <Task>
            
          </Task>
          <Task></Task>
          <Task></Task>
          <Task></Task>
        </ScrollView>
      </View>  
    </View>
  );
}
