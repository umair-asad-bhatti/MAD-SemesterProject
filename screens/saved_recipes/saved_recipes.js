import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecipeCard from '../../components/recipe_card/recipe_card';
import { TypeScale } from '../../constants/type_scale';
import { Colors } from '../../constants/colors';
import { Sizes } from '../../constants/sizes';
export default function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  //get saved recipes from user local storage
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const savedRecipesData = await AsyncStorage.getItem('savedRecipes');
        if (savedRecipesData) {
          const parsedRecipes = JSON.parse(savedRecipesData);
          setSavedRecipes(parsedRecipes);

        }
      } catch (error) {
        console.error('Error fetching saved recipes:', error.message);
      }
    };

    fetchSavedRecipes();
  }, []);

  return (
    <View style={{ padding: Sizes.screenPadding }}>
      <Text style={{ ...TypeScale.h4Headline, color: Colors.accentColor, fontWeight: 'bold' }}>Your Recipes</Text>

      {/* <Button title={'clear storage'} onPress={async () => await AsyncStorage.removeItem('savedRecipes')} /> */}
      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        numColumns={2}
        data={savedRecipes}
        renderItem={({ item, index }) => {
          const itemName = item.data.mealName
          const itemImg = item.data.mealImg
          const itemId = item.itemId
          const category = item.category

          return <View style={{ margin: 5 }}><RecipeCard index={index} itemName={itemName} itemImg={itemImg} itemId={itemId} category={category} /></View>
        }}

      />
    </View>
  );
}
