import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Drawer from './Components/DrawerNavigation';
import Tap from './Components/TabNavigator';

import Init from "./pages/InitSteps";
import Home from './pages/Home';
import SearchEmpty from "./pages/SearchEmpty";

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Router() {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }} >
                <Stack.Screen 
                    name="Init" 
                    component={ Init }  
                    options={{ headerShown: false }}
                />

                <Stack.Screen 
                    name="Home" 
                    options={{ headerShown: false }}
                    component={ Tap }   
                />

                <Stack.Screen 
                    name="Category" 
                    options={{ headerShown: false }}
                    component={ Tap }   
                />

                <Stack.Screen 
                    name="SearchEmpty" 
                    options={{ headerShown: false }}
                    component={ SearchEmpty }   
                />

            </Stack.Navigator>
        </NavigationContainer>
    );

}