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
  }, []);

  return (
    <View>
      <Text>Saved Recipes</Text>
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
