
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated'
import RecipeCard from "../../components/RecipeCard/recipe_card";
import CategoryCircularCard from '../../components/categoryCircularCard/categoryCircularCard'
import { Colors } from '../../constants/colors'
import { Sizes } from '../../constants/sizes'
import { TypeScale } from '../../constants/type_scale'
import { getData } from '../../utils'
import { mealdb_category_api, mealdb_catMeal_api } from '../../constants/api'
const logo_size = 50
export default function HomeScreen() {
    const [categories, setCategories] = useState([])
    const [Recipes, setRecipes] = useState([])
    const [activeCategory, setActiveCategory] = useState('beef')

    // handling the active category state
    useEffect(() => {
        const getCategories = async () => {
            setRecipes([])
            const data = await getData(mealdb_category_api)
            setCategories(data.categories)
        }
        getCategories()
    }, [])

    // fetch the data from api whenever category changes
    useEffect(() => {
        const getRecipeByCategory = async () => {
            const data = await getData(mealdb_catMeal_api + activeCategory)
            setRecipes(data.meals)
        }
        getRecipeByCategory()
    }, [activeCategory])
    return (
        <View style={{ padding: Sizes.screenPadding, flex: 1 }}>
            <View style={{ flex: 0.35 }}>
                <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={{ ...TypeScale.h4Headline, color: Colors.accentColor, fontWeight: 'bold' }}>Recipe At Door</Text>
                    <Image style={{ width: logo_size, height: logo_size, borderRadius: logo_size }} source={require("../../assets/download.jpg")} />
                </View>
                <Text style={[TypeScale.h2Headline, { color: Colors.darkColor }]}>Lets Explore the Recipes of your <Text style={{ color: Colors.accentColor }}>Taste</Text></Text>
                <Text style={[TypeScale.h6Headline, { color: Colors.accentColor, marginVertical: 5, textAlign: 'center', fontWeight: 'bold' }]}>Categories</Text>
                <FlatList
                    data={categories}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        const categoryName = item.strCategory.toLowerCase()
                        const categoryImg = item.strCategoryThumb
                        return <Animated.View entering={FadeInLeft.delay(100 + (index * 100))}>
                            <CategoryCircularCard categoryName={categoryName} categoryImg={categoryImg} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                        </Animated.View>
                    }}
                />
            </View>
            <View style={{ flex: 0.54 }}>
                {
                    Recipes.length > 0 ?
                        <Animated.View entering={FadeInDown.delay(200)}>
                            <FlatList
                                data={Recipes}
                                showsVerticalScrollIndicator={false}
                                numColumns={2}
                                columnWrapperStyle={{ justifyContent: 'space-between' }}
                                renderItem={({ item }) => {
                                    const itemName = item.strMeal
                                    const itemImg = item.strMealThumb
                                    const itemId = item.idMeal
                                    const category = 'meals'
                                    return <RecipeCard itemName={itemName} itemImg={itemImg} itemId={itemId} category={category} />

                                }}
                            />
                        </Animated.View> :
                        <ActivityIndicator />
                }

            </View>
        </View >
    )
}
