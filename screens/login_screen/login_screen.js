import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';
import {TextStrings} from "../../constants/text_strings";
import {Colors} from "../../constants/colors";
import {Sizes} from "../../constants/sizes";
import {TypeScale} from "../../constants/type_scale";
import {ImageStrings} from "../../constants/image_strings";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {CustomStyles} from "../../constants/custom_styles";

createNativeStackNavigator();
const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        console.log('Logging in with', {email, password});
        navigation.replace("Dashboard");
    };

    const forgetPasswordHandle = () => {
        console.log('Taking user to forget password screen');
        navigation.navigate("ForgetPassword");
    };

    const goToRegisterScreen = () => {
        navigation.replace("SignUp");
    };
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                <StatusBar backgroundColor={Colors.backgroundColor} barStyle="light-content"/>
                <Image style={styles.image} source={ImageStrings.mainLogo}/>
                <Text style={styles.title}>{TextStrings.loginTitle}</Text>
                <Text style={styles.subtitle}>{TextStrings.loginSubtitle}</Text>
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
                <View style={styles.forgotPasswordView}>
                    <TouchableOpacity onPress={forgetPasswordHandle}>
                        <Text style={styles.forgotPasswordText}>{TextStrings.forgetPassword}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={TypeScale.button}>{TextStrings.login}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToRegisterScreen}>
                    <Text style={styles.footerText}>{TextStrings.notRegistered}</Text>
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
    footerText: {
        ...TypeScale.subtitle2,
        marginTop: Sizes.formHeight * 2,
    },
});

export default LoginScreen;
