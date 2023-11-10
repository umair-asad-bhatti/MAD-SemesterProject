
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, View, StyleSheet } from 'react-native'
import { Colors } from '../../constants/colors'
import { Sizes } from '../../constants/sizes'
import { getData } from '../../utils'
import { FontAwesome5 } from '@expo/vector-icons'
import Button from '../../components/button/button'
const image_size = 300
const heart_size = 50
const heart_bg = '#00755E'
export default function RecipeDetailScreen({ route, navigation }) {

  const { itemId, source } = route.params

  const [MealDetails, setMealDetails] = useState({}) //store the data from api

  //parsed data from api
  const [data, setData] = useState({
    mealImg: null, mealName: "", mealDescription: "hehehh", mealArea: "", mealCategory: ""
  });

  //get the data from api
  useEffect(() => {
    const getMealDetails = async () => {
      let data = null
      if (source == 'mealdb') {
        data = await getData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`)
        setMealDetails(data.meals[0])
      }

    }
    getMealDetails()
  }, [source])

  //extract the data from mealDetails state according to api used
  useEffect(() => {
    if (source == 'mealdb') {
      setData({
        mealName: MealDetails.strMeal,
        mealImg: MealDetails.strMealThumb,
        mealArea: MealDetails.strArea,
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
          <Button text={'Youtube'} onButtonPress={{}} />
        </View>
        <View style={{ position: 'absolute', width: 140, top: 110 }}>
          <Button text={'source recipe'} onButtonPress={{}} />
        </View>
        <View style={{ position: 'absolute', width: 100, top: 170 }}>
          <Button text={'source recipe'} onButtonPress={{}} />
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