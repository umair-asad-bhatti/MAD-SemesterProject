import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useRef } from 'react';
import { Animated, StatusBar, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Colors } from '../../constants/colors';
import OverviewScreen from '../overview_screen/overview_screen';
import SettingsScreen from '../settings_screen/settings_screen';
import HomeScreen from '../home_screen/home_screen';
import AccountScreen from '../accounts_screen/account_screen';
import BoardingScreen from '../boarding_screen/boarding_screen';
const Tab = createBottomTabNavigator();
function getWidth() {
    let width = Dimensions.get("window").width
    // Horizontal Padding = 20...
    width = width - 80
    // Total five Tabs...
    return width / 5
}

const DashboardScreen = () => {
    const tabOffsetValue = useRef(new Animated.Value(0)).current;
    return (
        <>
            <Tab.Navigator

                screenOptions={{

                    tabBarShowLabel: false,
                    headerShown: false,
                    // Floating Tab Bar...
                    tabBarStyle: {

                        backgroundColor: 'white',
                        position: 'absolute',

                        // bottom: 40,
                        // marginHorizontal: 20,
                        // Max Height...
                        height: 80,
                        borderRadius: 10,
                        // Shadow...
                        shadowColor: '#000',
                        shadowOpacity: 0.06,
                        shadowOffset: {
                            width: 10,
                            height: 10
                        },
                        paddingHorizontal: 20,
                    }
                }}

            >

                {
                    // Tab Screens....

                    // Tab ICons....
                }
                <Tab.Screen name={"Home"} component={HomeScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            // centring Tab Button...
                            position: 'absolute',
                            top: 20,

                        }}>
                            <FontAwesome5
                                name="home"
                                size={25}
                                color={focused ? Colors.accentColor : 'gray'}
                            ></FontAwesome5>
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    // Onpress Update....
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: 0,
                            useNativeDriver: true
                        }).start();
                    }
                })}></Tab.Screen>

                <Tab.Screen name={"Overview"} component={OverviewScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            // centring Tab Button...
                            position: 'absolute',
                            top: 20
                        }}>
                            <FontAwesome5
                                name="search"
                                size={25}
                                color={focused ? Colors.accentColor : 'gray'}
                            ></FontAwesome5>
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    // Onpress Update....
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: getWidth() * 1.1,
                            useNativeDriver: true
                        }).start();
                    }
                })}></Tab.Screen>
                {

                    // Extra Tab Screen For Action Button..
                }

                <Tab.Screen name={"ActionButton"} component={BoardingScreen} options={{
                    tabBarIcon: ({ focused }) => (

                        <View style={{
                            // centring Tab Button...
                            position: 'absolute',
                            top: 20
                        }}>
                            <FontAwesome5
                                name="snowboarding"
                                size={25}
                                color={focused ? Colors.accentColor : 'gray'}
                            ></FontAwesome5>
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    // Onpress Update....
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: getWidth() * 2.3,
                            useNativeDriver: true
                        }).start();
                    }
                })}></Tab.Screen>

                <Tab.Screen name={"Accounts"} component={AccountScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            // centring Tab Button...
                            position: 'absolute',
                            top: 20
                        }}>
                            <FontAwesome5
                                name="bell"
                                size={25}
                                color={focused ? Colors.accentColor : 'gray'}
                            ></FontAwesome5>
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    // Onpress Update....
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: getWidth() * 3.4,
                            useNativeDriver: true
                        }).start();
                    }
                })}></Tab.Screen>

                <Tab.Screen name={"Settings"} component={SettingsScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            // centring Tab Button...
                            position: 'absolute',
                            top: 20
                        }}>
                            <FontAwesome5
                                name="user-alt"
                                size={25}
                                color={focused ? Colors.accentColor : 'gray'}
                            ></FontAwesome5>
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    // Onpress Update....
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: getWidth() * 4.6,
                            useNativeDriver: true
                        }).start();
                    }
                })}></Tab.Screen>

            </Tab.Navigator>

            <Animated.View style={{
                width: getWidth() - 20,
                height: 2,
                backgroundColor: Colors.accentColor,
                position: 'absolute',
                bottom: 20,

                left: 35,
                borderRadius: 20,
                transform: [
                    { translateX: tabOffsetValue }
                ]
            }}>

            </Animated.View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default DashboardScreen;
