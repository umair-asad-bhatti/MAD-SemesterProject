import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from "../home_screen/home_screen";
import DrinkScreen from "../drink_screen/drink_screen";
import SearchScreen from "../search_screen/search_screen";
import { AntDesign } from "@expo/vector-icons";
import AccountScreen from "../accounts_screen/account_screen";
import { Colors } from "../../constants/colors";
const icon_size = 25
const Tab = createMaterialBottomTabNavigator();

const DashboardScreen = () => {
    return (
        <Tab.Navigator
            theme={{ colors: { primary: 'red' } }}
            shifting={true}
            initialRouteName="HomeScreen"
            backBehavior='initialRoute'
            activeColor={Colors.lightColor}
            inactiveColor={Colors.lightColor}
            barStyle={{
                backgroundColor: Colors.backgroundColor,
            }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}

                options={{
                    // tabBarColor: 'red',
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused, color }) => (
                        <AntDesign name="home" color={focused ? 'black' : color} size={icon_size} />

                    ),
                }}
            />
            <Tab.Screen
                name="DrinkScreen"
                component={DrinkScreen}
                options={{
                    tabBarColor: 'red',
                    tabBarLabel: 'Drink',
                    tabBarIcon: ({ focused, color }) => (
                        <AntDesign name="antdesign" color={focused ? 'black' : color} size={icon_size} />
                    ),
                }}
            />
            <Tab.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ focused, color }) => (
                        <AntDesign name="search1" color={focused ? 'black' : color} size={icon_size} />
                    ),
                }}
            />
            <Tab.Screen
                name="AccountScreen"
                component={AccountScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused, color }) => (
                        <AntDesign name="user" color={focused ? 'black' : color} size={icon_size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default DashboardScreen;