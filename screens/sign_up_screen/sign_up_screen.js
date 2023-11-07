import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Image,
    Dimensions, ScrollView,
} from 'react-native';
import {TextStrings} from "../../constants/text_strings";
import {Colors} from "../../constants/colors";
import {Sizes} from "../../constants/sizes";
import {TypeScale} from "../../constants/type_scale";
import {ImageStrings} from "../../constants/image_strings";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {CustomStyles} from "../../constants/custom_styles";

createNativeStackNavigator();

const SignUpScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = () => {
        console.log('Signing Up with', {username, email, password, confirmPassword});
        navigation.replace("Dashboard");
    };

    const goToLoginScreen = () => {
        navigation.replace("Login");
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                <StatusBar backgroundColor={Colors.backgroundColor} barStyle="light-content"/>
                <Image style={styles.image} source={ImageStrings.mainLogo}/>
                <Text style={styles.title}>{TextStrings.signUpTitle}</Text>
                <Text style={styles.subtitle}>{TextStrings.signUpSubtitle}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={TextStrings.username}
                    placeholderTextColor={Colors.lightColor}
                    cursorColor={Colors.lightColor}
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    keyboardAppearance='light'
                    keyboardType={'default'}
                />
                <TextInput
                    style={styles.input}
                    placeholder={TextStrings.email}
                    placeholderTextColor={Colors.lightColor}
                    cursorColor={Colors.lightColor}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardAppearance='light'
                    keyboardType={'email-address'}
                />
                <TextInput
                    style={styles.input}
                    placeholder={TextStrings.password}
                    secureTextEntry={true}
                    placeholderTextColor={Colors.lightColor}
                    cursorColor={Colors.lightColor}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    keyboardAppearance='light'
                />
                <TextInput
                    style={styles.input}
                    placeholder={TextStrings.confirmPassword}
                    secureTextEntry={true}
                    placeholderTextColor={Colors.lightColor}
                    cursorColor={Colors.lightColor}
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    keyboardAppearance='light'
                />
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={TypeScale.button}>{TextStrings.signUp}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToLoginScreen}>
                    <Text style={styles.footerText}>{TextStrings.alreadyRegistered}</Text>
                </TouchableOpacity>
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
    button: {
        ...CustomStyles.button,
        width: '100%',
    },
    footerText: {
        ...TypeScale.subtitle2,
        marginTop: Sizes.formHeight * 2,
    },
});

export default SignUpScreen;
