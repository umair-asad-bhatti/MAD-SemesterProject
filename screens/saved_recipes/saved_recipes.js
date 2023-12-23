import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecipeCard from '../../components/recipe_card/recipe_card';
import { TypeScale } from '../../constants/type_scale';
import { Colors } from '../../constants/colors';
import { Sizes } from '../../constants/sizes';
import Accordian from '../../components/accordian/accordian';

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
  }, [savedRecipes]);

  const unsaveRecipe = async (itemId) => {

    const index = savedRecipes?.findIndex((recipe) => recipe.itemId === itemId);
    if (index !== -1) {
      savedRecipes.splice(index, 1);
    }
    await AsyncStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    setSavedRecipes(savedRecipes)
  }

  return (
    <View style={{ padding: Sizes.screenPadding }}>
      <Text style={{ ...TypeScale.h4Headline, color: Colors.accentColor, fontWeight: 'bold' }}>Your Recipes</Text>

      {/* <Button title={'clear storage'} onPress={async () => await AsyncStorage.removeItem('savedRecipes')} /> */}
      <FlatList

        data={savedRecipes}
        renderItem={({ item, index }) => {
          const itemName = item.data.mealName
          const itemImg = item.data.mealImg
          const itemId = item.itemId
          const ingredients = item.data.ingredients
          const itemDescription = item.data.mealDescription
          const category = item.category

          return <View style={{ margin: 5 }}>
            <Accordian unsaveRecipe={unsaveRecipe} id={itemId} title={itemName} image={itemImg} description={itemDescription} ingredients={ingredients} />
          </View>
        }}

      />
    </View>
  );
}

