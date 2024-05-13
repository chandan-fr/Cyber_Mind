import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Icon from '../utility/Icon';
import colors from '../config/colors';
import FamilyCalendar from '../screens/FamilyCalendar';
import Chat from '../screens/Chat';
import Profile from '../screens/Profile';
import { ParamListBase, RouteProp, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { commonstyles } from '../assets/css/CommonStyles';

const Tab = createBottomTabNavigator();

const BottomNavigation = (): JSX.Element => {
    return (
        <Tab.Navigator
            initialRouteName='home'
            screenOptions={({ route }: { route: RouteProp<ParamListBase, string> }) => ({
                tabBarIcon: ({ focused }: { focused: boolean }): JSX.Element => {
                    let rn = route.name;
                    return <Icon name={rn} size={25} iconColor={focused ? colors.bottomnav.actviconcolor : colors.bottomnav.iconcolor} />
                },
                tabBarShowLabel: false,
                tabBarStyle: commonstyles.tabBarStyle,
                tabBarIconStyle: commonstyles.tabIconStyle
            })}
        >
            <Tab.Screen
                name='home'
                options={{
                    headerShown: false
                }}
                component={Home}
            />

            <Tab.Screen
                name='calendar'
                options={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: {
                        ...commonstyles.tabBarStyle,
                        display: getFocusedRouteNameFromRoute(route) === "addevent" || getFocusedRouteNameFromRoute(route) === "addtodo" ? "none" : "flex",
                    },
                })}
                component={FamilyCalendar}
            />

            <Tab.Screen
                name='chat'
                options={({ route }) => ({
                    tabBarStyle: {
                        ...commonstyles.tabBarStyle,
                        display: getFocusedRouteNameFromRoute(route) === "p2pchat" ? "none" : "flex",
                    },
                    headerShown: false,
                    // tabBarBadge: 3,
                    // tabBarBadgeStyle:{
                    //     backgroundColor: colors.chathome.notifinum,
                    //     color: colors.white,
                    // },
                    
                })}
                component={Chat}
            />

            <Tab.Screen
                name='profile'
                options={({ route }) => ({
                    tabBarStyle: {
                        ...commonstyles.tabBarStyle,
                        display: getFocusedRouteNameFromRoute(route) === "editprofile" ? "none" : "flex",
                    },
                    headerShown: false,
                })}
                component={Profile}
            />
        </Tab.Navigator>
    )
};

export default BottomNavigation;