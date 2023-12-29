import React, { useEffect, useState } from 'react'
import {  FlatList, Image, Text, View, StyleSheet, Alert } from 'react-native'
import Animated, { FadeInLeft } from 'react-native-reanimated'
import RecipeCard from "../../components/recipe_card/recipe_card";
import CategoryCircularCard from '../../components/category_circular_card/category_circular_card'
import { Colors } from '../../constants/colors'
import { Sizes } from '../../constants/sizes'
import { TypeScale } from '../../constants/type_scale'
import { ImageStrings } from "../../constants/image_strings";
import { supabase } from '../../services/supabase/client'
import Loading from "../../components/loading/Loading";

export default function HomeScreen() {
    const [categories, setCategories] = useState([])
    const [Recipes, setRecipes] = useState([])
    const [activeCategory, setActiveCategory] = useState('Beef')
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const getCategories = async () => {
            try {
                setRecipes([])
                const { data } = await supabase.from('categories').select()
                // const data = await getData(mealdb_category_api)
                if (data)
                    setCategories(data)
            } catch (error) {
                Alert.alert("Something went wrong", error)
            }
        }
        getCategories()
    }, [])

    // fetch the data from api whenever category changes
    useEffect(() => {
        const getRecipeByCategory = async () => {
            try {
                setLoading(true)

                const { data } = await supabase.from('RecipesByCategory').select().ilike('strCategory', activeCategory)
                setRecipes(data)
                setLoading(false)
            } catch (error) {
                Alert.alert("Something went wrong")
            }
        }
        getRecipeByCategory()
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

                                return <View style={{ margin: 5 }}><RecipeCard index={index} itemName={itemName} itemImg={itemImg} itemId={itemId} /></View>
                            }}
                        /> :
                        <Loading size={Sizes.screenIndicatorSize} color={Colors.accentColor}/>
                        // <ActivityIndicator size={Sizes.screenIndicatorSize} color={Colors.accentColor} />
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