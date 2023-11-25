import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, View, TouchableOpacity, Alert } from 'react-native'
import { Colors } from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'
import { Sizes } from '../../constants/sizes'
import { getData } from '../../utils'
import { CustomStyles } from '../../constants/custom_styles'
import { FontAwesome5, AntDesign } from '@expo/vector-icons'
import { TypeScale } from '../../constants/type_scale'
import { UserContext } from '../../services/context/usercontext'
import { supabase } from '../../services/supabase/client'
import { useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
const image_size = 300
const heart_size = 60
const heart_bg = '#00755E'
const youtubeicon_size = 25
const youtubeicon_color = Colors.accentColor
export default function RecipeDetailScreen({ route }) {

  const { itemId, category } = route.params
  const navigation = useNavigation()

  //---------------states--------------------------------------------
  const { session, setSession } = useContext(UserContext)
  const [clicked, setClicked] = useState(false)
  const [likes, setLikes] = useState(0)
  const [MealDetails, setMealDetails] = useState({}) //store the data from api
  //parsed data from api
  const [data, setData] = useState({
    mealImg: null, mealName: "", mealDescription: "hehehh", mealArea: "", mealCategory: "", youtuebId: null
  });
  //-----------------------end states--------------------------------


  //fetch the likes on first render
  useEffect(() => {
    const getClickState = async () => {
      const state = await AsyncStorage.getItem(itemId)
      if (state == 'clicked')
        setClicked(true)
      else
        setClicked(false)
    }
    const getLikes = async () => {

      const { data } = await supabase.from("Recipes_Liked").select('likes').eq('Recipe_id', itemId)
      if (data.length > 0)
        setLikes(data[0].likes)
      else
        setLikes(0)
    }
    getLikes()
    getClickState()

    //now subsribing for realtime changes
    supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
        },
        (payload) => setLikes(payload.new.likes)
      )
      .subscribe()
  }, [])
  //fetching data from api
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

  //parsing data once it is fetched from api
  useEffect(() => {
    if (category == 'meals') {
      setData({
        mealName: MealDetails.strMeal,
        mealImg: MealDetails.strMealThumb,
        mealArea: MealDetails.strArea,
        mealDescription: MealDetails.strInstructions,
        mealCategory: MealDetails.strCategory,
        youtuebId: MealDetails.strYoutube
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

  //setting the screen headers  to recipe title
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
  const goToYoutubeScreen = () => {
    session ?
      navigation.navigate('youtube_screen', { youtubeId: data.youtuebId, mealName: data.mealName })
      : Alert.alert('Login Required', 'You must Loggin to watch youtube video', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Login', onPress: () => navigation.navigate("Login") },
      ])
  }
  const addRecipeToFavourite = async () => {
    if (session) {
      const { data } = await supabase.from('Recipes_Liked').select().eq('Recipe_id', itemId)
      if (data.length > 0) {
        await supabase.rpc(clicked ? 'decrement' : 'increment', { row_id: itemId })
      }
      else {
        await supabase.from('Recipes_Liked').insert({ Recipe_id: itemId, likes: 1 })
      }

      //HANDLE THE STATE OF CLIKED 
      if (clicked == false) {

        await AsyncStorage.setItem(itemId, 'clicked')
        setClicked(true)
      }
      else {

        await AsyncStorage.removeItem(itemId)
        setClicked(false)
      }


    }
    else {
      Alert.alert('Login Required', 'You must Loggin to like Recipe', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Login', onPress: () => navigation.navigate("Login") },
      ])
    }


    //implement the add recipe to favourites using supabase database
  }
  return (
    <>
      <View style={{ flex: 1 }}>
        <Image source={{ uri: data.mealImg }} style={{ borderRadius: image_size, width: image_size, height: image_size, position: 'relative', left: '40%', top: 80, zIndex: 23 }} />
        <View style={{ position: 'absolute', width: 170, top: 50 }}>
          {data.youtuebId && <TouchableOpacity onPress={goToYoutubeScreen} style={[CustomStyles.button, { flexDirection: 'row', justifyContent: 'space-evenly' }]}>
            <FontAwesome5 size={youtubeicon_size} name={'youtube'} color={youtubeicon_color} />
            <Text style={TypeScale.button}>watch on Youtube</Text>
          </TouchableOpacity>}
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
        <TouchableOpacity onPress={addRecipeToFavourite} style={{
          zIndex: 1000, borderRadius: 5, position: 'relative', top: 20, left: 30, width: heart_size, height: heart_size, justifyContent: 'center', alignItems: "center", backgroundColor: heart_bg
        }} >
          < AntDesign
            name={clicked ? 'heart' : 'hearto'}

            color={Colors.accentColor}
            size={Sizes.h3Headline}
          />
          <Text style={{ color: 'white' }}>{likes}</Text>
        </TouchableOpacity>
        <ScrollView style={{ backgroundColor: Colors.accentColor, borderTopLeftRadius: 40, padding: 20 }}>
          <Text style={{ marginTop: 10, color: Colors.lightColor }}>{data.mealDescription}</Text>
        </ScrollView>
      </View >
    </>
  )
}