import React from 'react';
import { Image } from "react-native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Category from '../pages/Category';

import Home from "../pages/Home";

import DrawerNavigation from './DrawerNavigation';
import { useRoute } from '@react-navigation/native';

const _icon_home = require('../assets/png/icon-home-tab.png');
const _icon_nossas_lojas = require('../assets/png/icon-nossas-lojas-tab.png');
const _icon_creditos = require('../assets/png/icon-crediros-tab.png');
const _icon_fidelidade = require('../assets/png/icon-fidelidade-tab.png');
const _icon_contas = require('../assets/png/icon-contas-tab.png');

const Tab = createBottomTabNavigator();

export default function TabNavigator() {

    const router = useRoute();

    console.log(router.name)

    return(

        <Tab.Navigator 
            initialRouteName={ router.name }         
            tabBarOptions={{
                activeTintColor: '#AACE37',
                inactiveTintColor: '#434343',
                style: {
                    height: 65,
                    paddingBottom: 10,
                    backgroundColor: '#fff',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }
            }}    

        >
            <Tab.Screen 
                name="Home"
                component={ DrawerNavigation }
                options={{
                    tabBarIcon: ({ color, size }) => (
                      <Image name="home" color={color} source={_icon_home} size={size} />
                    ),
                }}

            />

            <Tab.Screen 
                name="Category"
                component={ Category }
                options={{
                    tabBarButton: () => null
                }}

            />

            <Tab.Screen 
                name="Lojas"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                      <Image name="home" color={color} source={_icon_nossas_lojas} size={size} />
                    ),
                }}

            />

            <Tab.Screen 
                name="Créditos"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                      <Image name="home" color={color} source={_icon_creditos} size={size} />
                    ),
                }}

            />
            <Tab.Screen 
                name="Fidelidade"
                component={Category}
                options={{
                    tabBarIcon: ({ color, size }) => (
                      <Image name="home" color={color} source={_icon_fidelidade} size={size} />
                    ),
                }}

            />

            <Tab.Screen 
                name="Contas"
                component={Category}
                options={{
                    tabBarIcon: ({ color, size }) => (
                      <Image name="home" color={color} source={_icon_contas} size={size} />
                    ), 
                }}

            />

        </Tab.Navigator>
    )

}