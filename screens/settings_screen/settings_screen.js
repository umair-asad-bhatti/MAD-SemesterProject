import { View, Text } from 'react-native'
import React from 'react'
import Button from '../../components/button/button'
import { Colors } from '../../constants/colors'

export default function SettingsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.lightColor }}>
            <Text>settings_screen</Text>
            <Button onButtonPress={() => navigation.navigate('Login')} text={'logout'} />
        </View>
    )
}
