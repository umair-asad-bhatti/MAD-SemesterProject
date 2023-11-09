import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Sizes } from '../../constants/sizes'
import { Colors } from '../../constants/colors'
export default function RecipeDetailScreen({ route }) {
  const { itemId } = route.params
  const [MealDetails, setMealDetails] = useState({})
  useEffect(() => {
    const getMealDetails = async () => {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`)
      const data = response.data
      setMealDetails(data.meals[0])
    }
    getMealDetails()
  }, [])
  return (
    <View style={{ flex: 0.9, padding: Sizes.screenPadding }}>
      <Image source={{ uri: MealDetails.strMealThumb }} style={{ borderRadius: 20, width: '100%', height: '40%' }} />
      <Text style={{ color: Colors.accentColor, marginVertical: 10 }}>{MealDetails.strMeal}</Text>
      <Text style={{ marginVertical: 10 }}>{MealDetails.strArea}</Text>
      <Text>{MealDetails.strInstructions}</Text>
    </View>
  )
}