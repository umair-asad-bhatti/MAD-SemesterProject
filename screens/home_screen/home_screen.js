import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../constants/colors'
import { Sizes } from '../../constants/sizes'
import CategoryCircularCard from '../../components/categoryCircularCard/categoryCircularCard'
import { TypeScale } from '../../constants/type_scale'
import RecepirCard from '../../components/RecepirCard/recepie_card'
const logo_size = 50
export default function HomeScreen() {
    const [categories, setCategories] = useState([])
    const [Recipes, setRecipes] = useState([])
    const [activeCategory, setActiveCategory] = useState('beef')

    useEffect(() => {
        const getCategories = async () => {
            setRecipes([])
            const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")
            const data = response.data
            setCategories(data.categories)
        }
        getCategories()
    }, [])
    useEffect(() => {
        const getRecipeByCategory = async () => {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${activeCategory}`)
            const data = response.data
            setRecipes(data.meals)
        }
        getRecipeByCategory()
    }, [activeCategory])
    return (
        <View style={{ padding: Sizes.screenPadding, flex: 1 }}>
            <View style={{ flex: 0.37 }}>
                <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={{ ...TypeScale.h4Headline, color: Colors.accentColor, fontWeight: 'bold' }}>Recipe At Door</Text>
                    <Image style={{ width: logo_size, height: logo_size, borderRadius: logo_size }} source={require("../../assets/download.jpg")} />
                </View>
                <Text style={[TypeScale.h2Headline, { color: Colors.darkColor }]}>Lets Explore the Recipes of your <Text style={{ color: Colors.accentColor }}>Taste</Text></Text>
                <Text style={[TypeScale.h6Headline, { color: Colors.accentColor, marginLeft: 10, marginBottom: 10 }]}>Categories</Text>
                <FlatList
                    data={categories}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <CategoryCircularCard item={item} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                    }}
                />
            </View>
            <View style={{ flex: 0.54 }}>
                <FlatList
                    data={Recipes}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    ListEmptyComponent={<ActivityIndicator color={Colors.accentColor} size={Sizes.h4Headline} />}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item }) => {
                        return <RecepirCard item={item} />
                    }}
                />
            </View>


        </View >
    )
}