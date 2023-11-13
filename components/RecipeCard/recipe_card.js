import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/colors'
import { Sizes } from '../../constants/sizes'
import { useNavigation } from '@react-navigation/native'
export default function RecipeCard({ itemName, itemImg, itemId, category, index }) {
  const navigation = useNavigation()

  return <>
    <TouchableOpacity onPress={() => navigation.navigate("RecipeDetailScreen", { itemId, category })} style={{
      flex: 1, width: 150, shadowColor: "#000", height: itemId % 3 == 0 < 0.5 ? 240 : 280, backgroundColor: 'white',
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,

      elevation: 2,
    }}>

      <Image borderTopRightRadius={20} borderTopLeftRadius={20} fadeDuration={200} resizeMode='cover' source={{ uri: itemImg }} style={{ width: '100%', height: '80%' }} />
      <Text style={{ color: "black", opacity: 0.6, fontSize: Sizes.caption, textAlign: 'center', marginTop: 10 }}>{itemName}</Text>
    </TouchableOpacity >

  </>
}
