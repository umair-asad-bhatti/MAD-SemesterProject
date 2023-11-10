
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '../../constants/colors'
import { Sizes } from '../../constants/sizes'
import { getData } from '../../utils'
import { CustomStyles } from '../../constants/custom_styles'
import { FontAwesome5 } from '@expo/vector-icons'
import Button from '../../components/button/button'
import { TypeScale } from '../../constants/type_scale'
const image_size = 300
const heart_size = 50
const heart_bg = '#00755E'
export default function RecipeDetailScreen({ route, navigation }) {

  const { itemId, category } = route.params
  const [MealDetails, setMealDetails] = useState({}) //store the data from api

  //parsed data from api
  const [data, setData] = useState({
    mealImg: null, mealName: "", mealDescription: "hehehh", mealArea: "", mealCategory: ""
  });


  useEffect(() => {
    const getMealDetails = async () => {

      const data = await getData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`)
      setMealDetails(data.meals[0])

    }
    const getCocktailDetails = async () => {

      const data = await getData(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${itemId}`)
      setMealDetails(data.drinks[0])

    }
    if (category == 'meals')
      getMealDetails()
    else if (category == 'drink')
      getCocktailDetails()
  }, [category])


  useEffect(() => {
    if (category == 'meals') {
      setData({
        mealName: MealDetails.strMeal,
        mealImg: MealDetails.strMealThumb,
        mealArea: MealDetails.strArea,
        mealDescription: MealDetails.strInstructions,
        mealCategory: MealDetails.strCategory
      })
    }

    else if (category == 'drink') {
      setData({
        mealName: MealDetails.strDrink,
        mealImg: MealDetails.strDrinkThumb,
        mealArea: MealDetails.strGlass,
        mealDescription: MealDetails.strInstructions,
        mealCategory: MealDetails.strCategory
      })
    }


  }, [MealDetails])
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return <View>
          <Text style={{ color: Colors.accentColor, fontWeight: 'bold' }}>{data.mealName}</Text>
          <Text style={{ marginTop: 5 }}>{data.mealArea + " | " + data.mealCategory}</Text>
        </View>
      }
    })
  }, [data])

  return (
    <>
      <View style={{ flex: 1 }}>
        <Image source={{ uri: data.mealImg }} style={{ borderRadius: image_size, width: image_size, height: image_size, position: 'relative', left: '40%', top: 80, zIndex: 23 }} />
        <View style={{ position: 'absolute', width: 170, top: 50 }}>
          <TouchableOpacity style={[CustomStyles.button]}>
            <Text style={TypeScale.button}>Youtube</Text>
          </TouchableOpacity>
        </View>
        <View style={{ position: 'absolute', width: 140, top: 110 }}>
          <TouchableOpacity style={[CustomStyles.button, { backgroundColor: 'rgba(255,0,0,0.2)' }]}>
            <Text style={TypeScale.button}>Source</Text>
          </TouchableOpacity>
        </View>
        <View style={{ position: 'absolute', width: 100, top: 170 }}>
          <TouchableOpacity style={[CustomStyles.button, { backgroundColor: 'rgba(0,0,255,0.1)' }]}>
            <Text style={TypeScale.button}>Origin</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          zIndex: 100, borderRadius: 5, position: 'relative', top: 20, left: 30, width: heart_size, height: heart_size, justifyContent: 'center', alignItems: "center", backgroundColor: heart_bg
        }}>
          < FontAwesome5
            name='heart'
            color={Colors.accentColor}
            size={Sizes.h3Headline}
          />
        </View>
        <ScrollView style={{ backgroundColor: Colors.accentColor, borderTopLeftRadius: 40, padding: 20 }}>
          <Text style={{ marginTop: 10, color: Colors.lightColor }}>{data.mealDescription}</Text>
        </ScrollView>
      </View >
    </>
  )
}