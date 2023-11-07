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
                style={{height:200}}
                screenOptions={({ route }) => ({

                    "tabBarActiveTintColor": Colors.primaryColor,
                    "tabBarInactiveTintColor": "black",
                    "tabBarShowLabel": true,
                    "tabBarShowIcon": true,
                    "tabBarStyle": {
                        "backgroundColor": "#f2f2f2"
                    },
                    tabBarIcon: ({ color, focused }) => {
                        let iconName;
                        if (route.name === 'overview') {
                            iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'ios-settings' : 'ios-settings-outline';
                        }
                        return <Ionicons name={iconName} size={20} color={color} />;
                    },
                    tabBarLabel: ({ focused, color }) => {
                        let labelName;
                        if (route.name === 'overview') {
                            labelName = 'Overview';
                        } else if (route.name === 'Settings') {
                            labelName = 'Settings';
                        }
                        return <Text style={{ color: color }}>{labelName}</Text>;
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
