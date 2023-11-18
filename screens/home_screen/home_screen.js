import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View, StyleSheet } from 'react-native'
import Animated, { FadeInLeft } from 'react-native-reanimated'
import RecipeCard from "../../components/recipe_card/recipe_card";
import CategoryCircularCard from '../../components/category_circular_card/category_circular_card'
import { Colors } from '../../constants/colors'
import { Sizes } from '../../constants/sizes'
import { TypeScale } from '../../constants/type_scale'
import { getData } from '../../utils'
import { mealdb_category_api, mealdb_catMeal_api } from '../../constants/api'
import { ImageStrings } from "../../constants/image_strings";

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
        getCategories().then(() => null);
    }, [])

    // fetch the data from api whenever category changes
    useEffect(() => {
        const getRecipeByCategory = async () => {
            const data = await getData(mealdb_catMeal_api + activeCategory)
            setRecipes(data.meals)
            setLoading(false)
        }
        getRecipeByCategory().then(() => null);
    }, [activeCategory])


    useEffect(() => {
        setLoading(true)
    }, [activeCategory])

    return (
        <View style={styles.mainView}>
            <View style={styles.headerView}>
                <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={{ ...TypeScale.h4Headline, color: Colors.accentColor, fontWeight: 'bold' }}>Recipe At Door</Text>
                    <Image style={{ width: Sizes.homeScreenMainLogoSize, height: Sizes.homeScreenMainLogoSize, borderRadius: Sizes.homeScreenMainLogoSize }} source={ImageStrings.mainLogo} />
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
            <View style={styles.footerView}>
                {
                    Recipes.length > 0 && categories.length > 0 && !loading ?
                        <FlatList
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
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
                        /> :
                        <ActivityIndicator size={Sizes.screenIndicatorSize} color={Colors.accentColor} />
                }
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        padding: Sizes.screenPadding,
    },
    headerView: {
        flex: 0.35,
        width: '100%',
    },
    footerView: {
        flex: 0.7,
    },
});