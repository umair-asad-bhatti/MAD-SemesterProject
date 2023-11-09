import { View, Text } from 'react-native'
import React from 'react'

export default function RecipeDetailScreen({ route }) {
  const { itemId } = route.params
  return (
    <View style={{ flex: 1 }}>
      <Text>{itemId}</Text>
    </View>
  )
}