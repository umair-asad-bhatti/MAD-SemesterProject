import { Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Sizes } from '../../constants/sizes'
import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native'
export default function RecipeCard({ itemName, itemImg, itemId }) {

  const navigation = useNavigation()
  const windowWidth = Dimensions.get('window').width;

  return <>
    <TouchableOpacity onPress={() => navigation.navigate("RecipeDetailScreen", { itemId })} style={{
      flex: 1, width: windowWidth / 2 - 20, shadowColor: "#000", height: 200, backgroundColor: 'white',
      borderRadius: 20,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      elevation: 2,
    }}>

      <Image borderTopRightRadius={20} borderTopLeftRadius={20} fadeDuration={200} resizeMode='cover' source={{ uri: itemImg }} style={{ width: '100%', height: '80%' }} />
      <Text style={{ color: "black", opacity: 0.6, fontSize: Sizes.caption, textAlign: 'center', marginTop: 10 }}>{itemName.slice(0, 20) + '...'}</Text>
    </TouchableOpacity >

  </>
}
