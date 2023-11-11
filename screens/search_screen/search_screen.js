


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
import { FontAwesome5 } from '@expo/vector-icons';
import { Sizes } from '../../constants/sizes';
import { Colors } from '../../constants/colors';
import { TypeScale } from '../../constants/type_scale';
import Animated, { FlipInYLeft } from 'react-native-reanimated';
import RecipeCard from '../../components/RecipeCard/recipe_card';
import useDebounce from '../../hooks/debounce';
const search_icon_size = 20;
const search_icon_color = Colors.accentColor;
const curosr_Color = 'black';
const placeholder = 'search by ingredient';
const indicator_color = Colors.accentColor;
const indicator_size = 50;
const marginTop = 200;
export default function Search_Screen() {
    const [Meals, setMeals] = useState([]);
    const [ingredient, setIngredient] = useState('');
    const [loading, setLoading] = useState(false);

    const debouncedIngredient = useDebounce(ingredient) //deBouncing the user input
    useEffect(() => {
        const getMealsByIngredients = async () => {
            setLoading(true);
            try {
                const data = await getData(
                    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${debouncedIngredient}`
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
                    placeholder={placeholder}
                    cursorColor={curosr_Color}
                    value={ingredient}
                    onChangeText={setIngredient}
                />
                <FontAwesome5 name="search" size={search_icon_size} color={search_icon_color} />
            </View>
            <View contentContainerStyle={{ flex: 0.9, marginTop: 10 }}>
                {loading ? (
                    <ActivityIndicator color={indicator_color} size={indicator_size} style={{ marginTop }} />
                ) : Meals.length > 0 ? (
                    <Animated.View entering={FlipInYLeft.delay(200)}>
                        <FlatList
                            data={Meals}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                            renderItem={({ item }) => {
                                const itemName = item.strMeal;
                                const itemImg = item.strMealThumb;
                                const itemId = item.idMeal;
                                const category = 'meals';
                                return <RecipeCard itemName={itemName} itemImg={itemImg} itemId={itemId} category={category} />;
                            }}
                        />
                    </Animated.View>
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
