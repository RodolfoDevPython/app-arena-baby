import React, { useState } from "react";

import { View, Text, Image, ImageBackground, Dimensions } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import InsetShadow  from "react-native-inset-shadow";

import { useNavigation } from '@react-navigation/native';


const _logo = require('../../assets/png/icon-logo-small.png');
const _icon_search = require('../../assets/png/icon-search.png');
const _icon_menu = require('../../assets/png/icon-menu-burger.png');
const _icon_wishlist = require('../../assets/png/icon-wishlist.png');
const _icon_minicart = require('../../assets/png/icon-minicart.png');

import IconCloseWhite from "../../assets/svg/icon-close-white";


import style from "./style";


export default function Header() {

    
    const navigation = useNavigation();

    const [ openBoxSearch, setOpenBoxSearch ] = useState(false);
    
    function onOpenMenu() {
        console.log("aqiiiiiiiiiiiiiiiiiiiiiiii")
        navigation.openDrawer();
    }

    function _onMomentumScrollEnd(e, state, context) {
        console.log(state, context.state)
    }

    return (
        
        <View style={style.container}>
            <InsetShadow shadowOffset={ 1 } top={true} bottom={false}  shadowRadius={ 1 } shadowOpacity={ 1 } elevation={ 20 } containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.08)' }} >
                
                <View style={ style.header_top } >
                    <View style={ style.icon } >
                        <TouchableOpacity onPress={ () => onOpenMenu() } style={{ marginRight: 10 }} >
                            <Image source={_icon_menu} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={ () => { openBoxSearch ? setOpenBoxSearch(false) : setOpenBoxSearch(true) }}>

                            {
                                openBoxSearch 
                                ? 
                                (
                                    <IconCloseWhite />
                                )
                                : 
                                (
                                    <Image source={_icon_search} />
                                )
                            }
                            

                        </TouchableOpacity>

                    </View>

                    <Image source={_logo} />

                    <View style={ style.icon } >
                        <TouchableOpacity style={{ marginRight: 10 }} >
                            <Image source={_icon_wishlist} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={ () => navigation.navigate('MiniCart') } >
                            <Image source={_icon_minicart} />
                        </TouchableOpacity>
                        
                    </View>
                </View>

                {/* <View style={ style.slick }>   

                
                </View> */}
            </InsetShadow>

            {
                openBoxSearch && 
                (
                    <View style={{ backgroundColor: "#fff" }} >
                        <TextInput 
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: "#fff", margin: 10 }}
                            placeholder={"Aquiiiiiiiiii"}
                        />
                    </View>
                )
            }
            

        </View>
        
    );

}