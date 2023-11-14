import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getData } from '../../utils'
import { Colors } from '../../constants/colors'
import { Sizes } from '../../constants/sizes'
import { TypeScale } from '../../constants/type_scale'
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated'
import RecipeCard from "../../components/recipe_card/recipe_card";
import CategoryCircularCard from '../../components/category_circular_card/category_circular_card'
import { drinkdb_catDrink_api, drinkdb_category_api } from '../../constants/api'
import MasonryList from '@react-native-seoul/masonry-list';
const indicator_color = Colors.accentColor;
const indicator_size = 50;

export default function DrinkScreen() {
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('ordinary drink')
  const [Drinks, setDrinks] = useState([])
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getCategories = async () => {
      setDrinks([])
      const data = await getData(drinkdb_category_api)
      setCategories(data.drinks)
    }
    getCategories()
  }, [])
  useEffect(() => {
    const getCocktails = async () => {
      const data = await getData(drinkdb_catDrink_api + activeCategory)
      setDrinks(data.drinks)
      setLoading(false)
    }
    getCocktails()
  }, [activeCategory])
  useEffect(() => {
    setLoading(true)
  }, [activeCategory])
  return (
    <View style={{ padding: Sizes.screenPadding, flex: 1 }}>
      <View style={{ flex: 0.28 }}>

        <Text style={[TypeScale.h2Headline, { color: Colors.darkColor }]}>Lets Explore the Drinks of your <Text style={{ color: Colors.accentColor }}>Taste</Text></Text>
        <Text style={[TypeScale.h6Headline, { color: Colors.accentColor, marginVertical: 5 }]}>Drinks</Text>
        <FlatList
          data={categories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            const categoryName = item.strCategory.toLowerCase()
            const categoryImg = "https://thegirlonbloor.com/wp-content/uploads/2022/01/Pink-Drink-2.jpg"
            return <Animated.View entering={FadeInLeft.delay(100 + (index * 100))}>
              <CategoryCircularCard categoryName={categoryName} categoryImg={categoryImg} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            </Animated.View>
          }}
        />
      </View>
      <View style={{ flex: 0.6 }}>
        {
          Drinks.length > 0 && categories.length > 0 && !loading ?
            // <Animated.View entering={FadeInDown.delay(200)}>
            //   <FlatList
            //     data={Drinks}
            //     showsVerticalScrollIndicator={false}
            //     numColumns={2}
            //     columnWrapperStyle={{ justifyContent: 'space-between' }}
            //     renderItem={({ item }) => {
            //       const itemName = item.strDrink
            //       const itemImg = item.strDrinkThumb
            //       const itemId = item.idDrink
            //       const category = 'drink'
            //       return <recipe_card itemName={itemName} itemImg={itemImg} itemId={itemId} category={category} />

            //     }}
            //   />
            // </Animated.View> :
            <MasonryList
              style={{ justifyContent: 'center', alignItems: "center" }}

              data={Drinks}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              renderItem={({ item, index }) => {

                const itemName = item.strDrink
                const itemImg = item.strDrinkThumb
                const itemId = item.idDrink
                const category = 'drink'
                return <View style={{ margin: 5 }}><RecipeCard index={index} itemName={itemName} itemImg={itemImg} itemId={itemId} category={category} /></View>
              }}
            /> :
            <ActivityIndicator color={indicator_color} size={indicator_size} />
        }
      </View>
    </View >
  )
}
