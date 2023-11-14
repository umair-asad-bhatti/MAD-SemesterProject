import {
    View,
    Text,
    FlatList,
    ScrollView,
    TextInput,
    StyleSheet,
    ActivityIndicator,

} from 'react-native';
import React, { useState, useEffect } from 'react';
import { getData } from '../../utils';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { Sizes } from '../../constants/sizes';
import { Colors } from '../../constants/colors';
import { TypeScale } from '../../constants/type_scale';
import RecipeCard from '../../components/recipe_card/recipe_card';
import useDebounce from '../../hooks/debounce';
import { TextStrings } from '../../constants/text_strings';
import { mealdb_searchBy_ingredients_api } from '../../constants/api';
const marginTop = 200;
export default function SearchScreen() {
    const [Meals, setMeals] = useState([]);
    const [ingredient, setIngredient] = useState('');
    const [loading, setLoading] = useState(false);

    const debouncedIngredient = useDebounce(ingredient) //deBouncing the user input
    useEffect(() => {
        const getMealsByIngredients = async () => {
            setLoading(true);
            try {
                const data = await getData(
                    mealdb_searchBy_ingredients_api + debouncedIngredient
                );
                if (data.meals) {
                    setMeals(data.meals);
                }
                else {
                    setMeals([])
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }

        };
        getMealsByIngredients();
    }, [debouncedIngredient]);

    return (
        <View style={{ padding: Sizes.screenPadding, flex: 1 }}>
            <View style={{ flex: 0.2 }}>
                <Text
                    style={{
                        marginVertical: 10,
                        ...TypeScale.h6Headline,
                        color: Colors.accentColor,
                    }}>
                    Search By Ingredient
                </Text>
                <View style={styles.search_field}>
                    <TextInput
                        placeholder={TextStrings.search_placeholder}
                        cursorColor={Colors.darkColor}
                        value={ingredient}
                        onChangeText={setIngredient}
                    />
                    <AntDesign name="search1" size={Sizes.search_icon_size} color={Colors.accentColor} />
                </View>
            </View>
            <View style={{ flex: 0.8, marginTop: 10 }}>
                {loading ? (
                    <ActivityIndicator color={Colors.accentColor} size={Sizes.indicator_size} style={{ marginTop }} />
                ) : Meals.length > 0 ? (
                    <FlatList
                        data={Meals}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        renderItem={({ item, index }) => {
                            const itemName = item.strMeal;
                            const itemImg = item.strMealThumb;
                            const itemId = item.idMeal;
                            const category = 'meals';
                            return <View style={{ margin: 5 }}><RecipeCard index={index} itemName={itemName} itemImg={itemImg} itemId={itemId} category={category} /></View>
                        }}
                    />

                ) : (
                    <Text style={{ marginTop, marginLeft: 120, color: Colors.errorColor }}>No data found</Text>
                )}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    search_field: {
        flexDirection: 'row',
        marginHorizontal: 'auto',
        padding: 10,
        borderRadius: 5,
        borderColor: Colors.accentColor,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderWidth: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
