// showss the cokctails
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getData } from '../../utils'
import { Colors } from '../../constants/colors'
import { Sizes } from '../../constants/sizes'
import { TypeScale } from '../../constants/type_scale'
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated'
import RecepirCard from '../../components/RecepirCard/recepie_card'
import CategoryCircularCard from '../../components/categoryCircularCard/categoryCircularCard'
export default function OverviewScreen() {
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('ordinary drink')
  const [Recipes, setRecipes] = useState([])
  useEffect(() => {
    const getCategories = async () => {
      setRecipes([])
      const data = await getData('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      setCategories(data.drinks)
    }
    getCategories()
  }, [])
  useEffect(() => {
    const getCocktails = async () => {
      const data = await getData(`https://thecocktaildb.com/api/json/v1/1/filter.php?c=${activeCategory}`)
      setRecipes(data.drinks)
    }
    getCocktails()
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
            const categoryImg = "data:image/jpeg;base64,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"
            return <Animated.View entering={FadeInLeft.delay(100 + (index * 100))}>
              <CategoryCircularCard categoryName={categoryName} categoryImg={categoryImg} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            </Animated.View>
          }}
        />
      </View>
      <View style={{ flex: 0.6 }}>
        {
          Recipes.length > 0 ?
            <Animated.View entering={FadeInDown.delay(200)}>
              <FlatList
                data={Recipes}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item }) => {
                  const itemName = item.strDrink
                  const itemImg = item.strDrinkThumb
                  const itemId = item.idDrink
                  const category = 'drink'
                  return <RecepirCard itemName={itemName} itemImg={itemImg} itemId={itemId} category={category} />

                }}
              />
            </Animated.View> :
            <ActivityIndicator />
        }

      </View>
    </View >
  )
}