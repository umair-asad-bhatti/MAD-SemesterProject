import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
export default function Youtube_Screen({ route }) {
    const { youtubeId, mealName } = route.params
    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({ title: mealName })
    }, [])
    console.log(youtubeId);
    return (
        <WebView
            source={{ uri: youtubeId }}
        />

    )
}