
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'
import Animated, { FadeInDown, FadeInLeft, FadeIn } from 'react-native-reanimated'
import RecipeCard from "../../components/RecipeCard/recipe_card";
import CategoryCircularCard from '../../components/categoryCircularCard/categoryCircularCard'
import { Colors } from '../../constants/colors'
import { Sizes } from '../../constants/sizes'
import { TypeScale } from '../../constants/type_scale'
import { getData } from '../../utils'
import { mealdb_category_api, mealdb_catMeal_api } from '../../constants/api'
import MasonryList from '@react-native-seoul/masonry-list';
const logo_size = 50
const indicator_color = Colors.accentColor;
const indicator_size = 50;
export default function HomeScreen() {
    const [categories, setCategories] = useState([])
    const [Recipes, setRecipes] = useState([])
    const [activeCategory, setActiveCategory] = useState('beef')
    const [loading, setLoading] = useState(false);
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
            setLoading(false)
        }
        getRecipeByCategory()
    }, [activeCategory])


    useEffect(() => {
        setLoading(true)
    }, [activeCategory])
    return (
        <View style={{ padding: Sizes.screenPadding, flex: 1 }}>
            <View style={{ flex: 0.30 }}>
                <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={{ ...TypeScale.h4Headline, color: Colors.accentColor, fontWeight: 'bold' }}>Recipe At Door</Text>
                    <Image style={{ width: logo_size, height: logo_size, borderRadius: logo_size }} source={require("../../assets/download.jpg")} />
                </View>
                <Text style={[TypeScale.h2Headline, { color: Colors.darkColor }]}>Lets Explore the Recipes of your <Text style={{ color: Colors.accentColor }}>Taste</Text></Text>
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
            <View style={{ flex: 0.6 }}>
                {
                    Recipes.length > 0 && categories.length > 0 && !loading ?

                        <MasonryList
                            data={Recipes}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            renderItem={({ item, index }) => {
                                const itemName = item.strMeal
                                const itemImg = item.strMealThumb
                                const itemId = item.idMeal
                                const category = 'meals'
                                return <View style={{ margin: 5 }}><RecipeCard index={index} itemName={itemName} itemImg={itemImg} itemId={itemId} category={category} /></View>
                            }}
                        />


                        :
                        <ActivityIndicator size={indicator_size} color={indicator_color} />
                }

            </View>
        </View >
    )
}
