import React from 'react';
import { Colors } from '../../constants/colors';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import SettingsScreen from '../settings_screen/settings_screen';
import OverviewScreen from '../overview_screen/overview_screen';

const Tab = createMaterialTopTabNavigator();

const DashboardScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: Colors.primaryColor,
                    tabBarInactiveTintColor: 'black',
                    tabBarShowLabel: true,
                    tabBarShowIcon: true,
                    tabBarIndicatorStyle: {
                        backgroundColor: 'transparent', // Remove the indicator border
                    },
                    tabBarStyle: {
                        backgroundColor: Colors.lightColor,
                        elevation: 0, // Remove the shadow on Android
                        borderTopWidth: 0, // Remove the border on Android
                        borderBottomWidth: 0, // Remove the border on iOS
                    },
                    tabBarLabel: ({ focused, color }) => {
                        let labelName;
                        let iconName;
                        if (route.name === 'overview') {
                            labelName = focused ? 'Overview' : '';
                            iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
                        } else if (route.name === 'Settings') {
                            labelName = focused ? 'Settings' : '';
                            iconName = focused ? 'ios-settings' : 'ios-settings-outline';
                        }
                        return (
                            <View style={{ flexDirection: 'row', width: 100, gap: 10 }}>
                                <Ionicons name={iconName} size={20} color={color} />
                                <Text style={{ color }}>{labelName}</Text>
                            </View>
                        );
                    },
                })}
            >
                <Tab.Screen name="Settings" component={SettingsScreen} />
                <Tab.Screen name="overview" component={OverviewScreen} />
            </Tab.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default DashboardScreen;
