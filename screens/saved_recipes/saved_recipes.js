import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        keyExtractor={(item) => item.itemId.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.data.mealName}</Text>

            {/* display other fields like img, description, also */}
          </View>
        )}
      />
    </View>
  );
}

