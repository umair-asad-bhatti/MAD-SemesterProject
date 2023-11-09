import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/colors'
import { Sizes } from '../../constants/sizes'
import { useNavigation } from '@react-navigation/native'

export default function RecepirCard({ item }) {
  const navigation = useNavigation()
  const itemName = item.strMeal
  const itemImg = item.strMealThumb
  const itemId = item.idMeal
  return <TouchableOpacity onPress={() => navigation.navigate("RecipeDetailScreen", { itemId })} style={{
    padding: 10, flex: 1, margin: 5, backgroundColor: Colors.lightColor, width: 100, shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    borderRadius: 20
  }}>
    <Image fadeDuration={200} resizeMode='cover' source={{ uri: itemImg }} style={{ borderRadius: 10 }} width={134} height={100} />
    <Text style={{ opacity: 0.6, fontSize: Sizes.body1, textAlign: 'center', marginTop: 10 }}>{itemName}</Text>
  </TouchableOpacity>
}