import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../../constants/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TextStrings } from "../../constants/text_strings";
import { CustomStyles } from "../../constants/custom_styles";
import { Icons } from "../../constants/icons";
import TextIconButtonView from "../../components/text_icon_button_view/text_icon_button_view";
import Animated, { useSharedValue, withSpring, withDelay } from 'react-native-reanimated'
createNativeStackNavigator();
const WelcomeScreen = ({ navigation }) => {
    const outerRingPadding = useSharedValue(0)
    const innerRingPadding = useSharedValue(0)
    const buttonOpacity = useSharedValue(0)
    useEffect(() => {
        outerRingPadding.value = 0
        innerRingPadding.value = 0
        buttonOpacity.value = 0
        innerRingPadding.value = withDelay(600, withSpring(innerRingPadding.value + 40))
        outerRingPadding.value = withDelay(800, withSpring(outerRingPadding.value + 50))
        buttonOpacity.value = withDelay(1600, withSpring(buttonOpacity.value + 1))
    })
    const continueButtonHandle = () => {
        console.log("Taking user to Registration Screen");
        navigation.navigate("SignUp");
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Colors.backgroundColor} barStyle="light-content" />
            <View style={styles.container}>
                <Animated.View style={{ padding: outerRingPadding, backgroundColor: 'rgba(0, 0, 0,0.2)', borderRadius: 200 }}>
                    <Animated.View style={{ padding: innerRingPadding, backgroundColor: 'rgba(0, 0, 0,0.2)', borderRadius: 200 }}>
                        <Image style={{ width: 100, height: 100, borderRadius: 100 }} source={require("../../assets/download.jpg")} />
                    </Animated.View>
                </Animated.View>
            </View >
            <View style={{ marginBottom: 30, width: '100%' }}>
                <Text style={styles.title}>{TextStrings.welcomeTitle}</Text>
                <Text style={styles.subtitle}>{TextStrings.welcomeSubtitle}</Text>
                    <TouchableOpacity onPress={continueButtonHandle} >
                        <Animated.View style={[styles.button, { opacity: buttonOpacity }]} >
                                <TextIconButtonView textString={TextStrings.continue} icon={Icons.rightArrowIcon} />
                        </Animated.View>    
                    </TouchableOpacity>
            </View>
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