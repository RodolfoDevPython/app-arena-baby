import React from 'react';
import { ScrollView } from "react-native";

import { DrawerItem, DrawerItemList } from "@react-navigation/drawer";

export default function Drawer(props) {

    return (
        <ScrollView>

            <DrawerItemList {...props} />

            <DrawerItem 
                label="Logout"
                
            />

        </ScrollView>
    );

}