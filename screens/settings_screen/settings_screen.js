import { View, Text, Button } from 'react-native'
import React from 'react'

import { Colors } from '../../constants/colors'

export default function SettingsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.lightColor }}>
            <Text>settings_screen</Text>
            <Button title='logout' onPress={() => navigation.navigate('Login')} />
        </View>
    )
}
