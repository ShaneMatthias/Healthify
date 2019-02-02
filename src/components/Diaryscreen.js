import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class Diaryscreen extends Component {
    render() {
        return (
            <View styles={styles.containerStyle}>
                <Text>TESTING TESTING 1..2..DIARY..</Text>
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        justifyConent: 'center',
        alignItems: 'center',
    }
}