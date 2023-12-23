import React, { useState, useEffect, useRef } from 'react';
import * as Network from 'expo-network';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    StatusBar,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';
import { TextStrings } from "../../constants/text_strings";
import { Colors } from "../../constants/colors";
import { Sizes } from "../../constants/sizes";
import { TypeScale } from "../../constants/type_scale";
import { ImageStrings } from "../../constants/image_strings";
import { CustomStyles } from "../../constants/custom_styles";

import axios from 'axios';


const RecipesRecommendation = ({ navigation }) => {
    const [ipAddr, setIpAddr] = useState(null)

    useEffect(() => {
        const getIpAddress = async () => {
            const ip = await Network.getIpAddressAsync();
            setIpAddr(ip)
        }

        getIpAddress()
    }, [])

    let getRecipeRecommendations = async () => {

        const res = await axios.post(`http://10.135.82.30:5000/recommend`, {
            ingredients: "eggs, bread, cheese, ketchup, mayo, onions"
        });
        console.log(res.data);

    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                <StatusBar backgroundColor={Colors.backgroundColor} barStyle="light-content" />
                <Image style={styles.image} source={ImageStrings.mainLogo} />
                <Text style={styles.title}>{`http://${ipAddr}:5000/recommmend`}</Text>
                {/* <Text style={styles.subtitle}>{TextStrings.loginSubtitle}</Text> */}
                <TextInput
                    style={styles.input}
                    placeholder={TextStrings.ingredients}
                    placeholderTextColor={Colors.lightColor}
                    cursorColor={Colors.lightColor}
                    value={''}
                    onChangeText={(text) => setData(text)}
                    keyboardAppearance='light'
                // keyboardType={'Recipe_Recommend'}
                />
                <Button title={TextStrings.recommend} onPress={getRecipeRecommendations} />
                <View style={styles.formHeight}></View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: CustomStyles.screenScrollContainerStyle,
    container: CustomStyles.screenContainerStyle,
    title: CustomStyles.title,
    subtitle: CustomStyles.subtitle,
    image: {
        height: Dimensions.get('window').width * 0.45,
        width: Dimensions.get('window').width * 0.45,
    },
    input: {
        ...CustomStyles.input,
        width: '100%',
    },
    forgotPasswordView: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: Sizes.formHeight,
    },
    forgotPasswordText: TypeScale.button,
    button: {
        ...CustomStyles.button,
        width: '100%',
    },
    formHeight: {
        height: Sizes.formHeight,
    },
    footerText: {
        ...TypeScale.subtitle2,
        marginTop: Sizes.formHeight * 2,
    },
});

export default RecipesRecommendation;
