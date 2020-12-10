import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';
import Product from "../pages/Product";

import DrawerCustom from './DrawerCustomer';

import Tab from './TabNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {

    return(

        <Drawer.Navigator 
            initialRouteName="Home" 
        >
            <Drawer.Screen 
                name="Home"
                component={Home}
            />
            <Drawer.Screen 
                name="Product" 
                component={Product}
            />
            
            <Drawer.Screen 
                name="Category" 
                component={Tab}
            />
        </Drawer.Navigator>

    )
    
};