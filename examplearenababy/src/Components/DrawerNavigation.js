import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';
import Product from "../pages/Product";
import Category from "../pages/Category";

import DrawerCustom from './DrawerCustomer';

import Tab from './TabNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {

    return(

        <Drawer.Navigator 
            initialRouteName='Home'             
            drawerContent={(props) => <DrawerCustom {...props} />}
        >

            <Drawer.Screen 
                name="Home"
                component={Home}
            />

            <Drawer.Screen 
                name="Roupas"
                component={Category}
            />
            <Drawer.Screen 
                name="Calçados" 
                component={Category}
            />

            <Drawer.Screen 
                name="Passeio" 
                component={Category}
            />

            <Drawer.Screen 
                name="Banho" 
                component={Category}
            />

            <Drawer.Screen 
                name="Higiene" 
                component={Category}
            />

            <Drawer.Screen 
                name="Alimentação" 
                component={Category}
            />

            <Drawer.Screen 
                name="Quarto" 
                component={Category}
            />

            <Drawer.Screen 
                name="Brinquedos" 
                component={Category}
            />

            <Drawer.Screen 
                name="Acessorios" 
                component={Category}
            />

            <Drawer.Screen 
                name="Mamãe" 
                component={Category}
            />

        </Drawer.Navigator>

    )
    
};