import { View, Text, TouchableOpacity, Button } from 'react-native'
import React from 'react'

import styles from './style'
const Task = () => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Details')}>
        <View style = {styles.item}>
            <View style = {styles.square}>
                <Text style = {styles.number}> 01 </Text>
            </View>
            <Text style = {styles.content}> Cổng Trần Đại Nghĩa </Text>
            
        </View>
    </TouchableOpacity>
  )
}

export default Task