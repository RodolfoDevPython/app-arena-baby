import React from 'react';

import { Image, ScrollView, Text, View } from "react-native";

import { TouchableOpacity } from 'react-native-gesture-handler';

import { useNavigation, useRoute, DrawerActions } from "@react-navigation/native";

const _icon_minicart = require('../../../assets/png/icon-minicart.png');

import IconShare from "../../../assets/svg/icon-share";

import { Svg, Path } from "react-native-svg";

import style from "./style.js";

export default function Drawer({ is_active = false, title = null }) {

    const route = useRoute();    
    const navigation = useNavigation();

    function onGoBack() {

        if (route.name == 'Home') { 
            console.log('essa é a home')

            navigation.dispatch(DrawerActions.toggleDrawer);

        } else {

            navigation.goBack();

        }
        
    }

    return (
        
        <View style={ style.header } >

            <TouchableOpacity onPress={ onGoBack } >
                <Svg width="16" height="28" viewBox="0 0 18 22" fill="none">
                    <Path d="M14 2L2 14L14 26" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                </Svg>
            </TouchableOpacity>

            <Text style={ style.title } > 
                { 
                    is_active && title == null 
                    ? route.name 
                    : title != null ? title
                    : null
                } 
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }} >

                { 
                    route.name == "Product" 
                    ? 
                    ( 
                        <TouchableOpacity style={{ marginRight: 20 }} > 
                            <IconShare />
                        </TouchableOpacity> 
                    ) 
                    :null 
                }
                
                <TouchableOpacity onPress={ () => navigation.navigate('MiniCart') } >
                    <Image source={_icon_minicart} />
                </TouchableOpacity>
            </View>
            

        </View>

    );

}