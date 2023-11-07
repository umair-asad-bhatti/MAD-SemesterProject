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

const navigation = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const handleLogin = () => {
        console.log('Logging in with', {email, password});
    };

    const goToRegisterScreen = () => {
        navigation.replace("SignUp");
    };
    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
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
    scrollViewContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Sizes.screenPadding,
        backgroundColor: Colors.backgroundColor,
    },
    image: {
        height: Dimensions.get('window').width * 0.45,
        width: Dimensions.get('window').width * 0.45,
    },
    title: {
        ...TypeScale.h1Headline,
        marginBottom: Sizes.formHeight * 0.3,
    },
    subtitle: {
        ...TypeScale.h4Headline,
        marginBottom: Sizes.formHeight,
    },
    input: {
        ...TypeScale.subtitle1,
        width: '100%',
        height: Sizes.buttonHeight,
        borderWidth: 1,
        borderRadius: Sizes.textFormFieldRadius,
        borderColor: Colors.lightColor,
        marginBottom: Sizes.formHeight,
        padding: Sizes.textFormFieldPadding,
    },
    button: {
        height: Sizes.buttonHeight,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.accentColor,
        borderRadius: Sizes.buttonRadius,
    },
    footerText: {
        ...TypeScale.subtitle2,
        marginTop: Sizes.formHeight * 3,
    },
});

export default HomeScreen;
