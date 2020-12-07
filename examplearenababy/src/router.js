import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Drawer from './Components/DrawerNavigation';
import Tap from './Components/TabNavigator';

import Init from "./pages/InitSteps";
import Home from './pages/Home';

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
                    component={ Tap } 
                    options={{ headerShown: false }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );

}