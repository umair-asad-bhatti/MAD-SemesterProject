
import React, { useEffect } from 'react'
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
export default function Youtube_Screen({ route }) {
    const { youtubeId, mealName } = route.params
    console.log(youtubeId);
    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({ title: mealName })
    }, [])

    return (
        <WebView
            source={{ uri: youtubeId }}

        />

    )
}