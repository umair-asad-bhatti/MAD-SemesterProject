import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import { Colors } from '../../constants/colors'
import { Sizes } from '../../constants/sizes'

const CategoryCardSize = 70
const CategoryCircularCard = ({ categoryName, categoryImg, setActiveCategory, activeCategory }) => {

    return <TouchableOpacity onPress={() => setActiveCategory(categoryName)} style={{
        margin: 5, justifyContent: 'center', alignItems: 'center', width: CategoryCardSize, height: CategoryCardSize, borderRadius: CategoryCardSize, backgroundColor: activeCategory == categoryName ? Colors.accentColor : Colors.lightColor, shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }}>
        <Image style={{ borderRadius: 40 }} source={{ uri: categoryImg }} width={40} height={40} />
        <Text style={{ textAlign: "center", opacity: 0.7, fontSize: Sizes.body2 }}>{categoryName}</Text>
    </TouchableOpacity>

}


export default CategoryCircularCard;
