import { Alert } from "react-native";
/**
 * getData()
 *
 * @param {string} URL - URL to fetch data from.
 * @returns {array of data} return the array of data from api.
 */
import axios from "axios"
const getData = async (url) => {

    const response = await axios.get(url)
    const data = response.data
    return data;

}
const getIngredientsList = (recipeDetails) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredientKey = `strIngredient${i}`;
        const measureKey = `strMeasure${i}`;
        if (recipeDetails[ingredientKey]) {
            const ingredient = `${recipeDetails[ingredientKey]} - ${recipeDetails[measureKey] || 'N/A'}`;
            ingredients.push(ingredient);
        } else {
            break;
        }
    }
    return ingredients;
};
export { getData, getIngredientsList }