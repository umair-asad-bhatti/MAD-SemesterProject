import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from "../home_screen/home_screen";
import DrinkScreen from "../drink_screen/drink_screen";
import SearchScreen from "../search_screen/search_screen";
import {AntDesign, FontAwesome5,} from "@expo/vector-icons";
import AccountScreen from "../accounts_screen/account_screen";
import {Colors} from "../../constants/colors";

const Tab = createMaterialBottomTabNavigator();

const DashboardScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            backBehavior='initialRoute'
            activeColor={Colors.lightColor}
            inactiveColor={Colors.lightColor}
            barStyle={{
                backgroundColor: Colors.backgroundColor,
                indicatorStyle: {
                    backgroundColor: 'red',
                    height: '100%',
                },
            }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({color}) => (
                        <AntDesign name="home" color={color} size={26}/>
                    ),
                }}
            />
            <Tab.Screen
                name="DrinkScreen"
                component={DrinkScreen}
                options={{
                    tabBarLabel: 'Drink',
                    tabBarIcon: ({color}) => (
                        <FontAwesome5 name="wine-bottle" color={color} size={26}/>
                    ),
                }}
            />
            <Tab.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({color}) => (
                        <AntDesign name="search1" color={color} size={26}/>
                    ),
                }}
            />
            <Tab.Screen
                name="AccountScreen"
                component={AccountScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({color}) => (
                        <AntDesign name="user" color={color} size={26}/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default DashboardScreen;