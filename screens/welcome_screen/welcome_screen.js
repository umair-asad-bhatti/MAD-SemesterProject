import React from 'react';
import {View, StyleSheet, StatusBar, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../../constants/colors';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TextStrings} from "../../constants/text_strings";
import {CustomStyles} from "../../constants/custom_styles";
import {Icons} from "../../constants/icons";
import TextIconButtonView from "../../components/text_icon_button_view/text_icon_button_view";
createNativeStackNavigator();
const WelcomeScreen = ({navigation}) => {

    const continueButtonHandle = () => {
        console.log("Taking user to Registration Screen");
        navigation.navigate("SignUp");
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Colors.backgroundColor} barStyle="light-content"/>
            <Text style={styles.title}>{TextStrings.welcomeTitle}</Text>
            <Text style={styles.subtitle}>{TextStrings.welcomeSubtitle}</Text>
            <TouchableOpacity style={styles.button} onPress={continueButtonHandle}>
                <TextIconButtonView textString={TextStrings.continue} icon={Icons.rightArrowIcon}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: CustomStyles.screenContainerStyle,
    title: CustomStyles.title,
    subtitle: CustomStyles.subtitle,
    button: {
        ...CustomStyles.button,
        width: '100%'
    },
});

export default WelcomeScreen;