import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, Text, View } from "react-native";

import { DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { TouchableOpacity } from 'react-native-gesture-handler';


import Header from "../MenuNavigation/Header";

import QueroComprar from "../MenuNavigation/QueroComprar";
import QueroVender from "../MenuNavigation/QueroVender";

const _icon_minicart = require('../../assets/png/icon-minicart.png');

import style from "./style";


export default function Drawer(props) {

    const [ aba, setAba ] = useState('qr-comprar');

    const { state, ...rest } = props;

    const newState = { ...state }

    newState.routes = newState.routes.filter(item => item.name !== 'Home');

    function handleAbasMenu(type) {
        console.log(type)
        console.log(aba)
        setAba(type);   
        console.log(aba)     
    }

    return (
        <>
        <Header />
        <ScrollView>
        

            <View>

                <View style={ style.header } >

                    <TouchableOpacity 
                        style={ aba == 'qr-comprar' ? style.header_item__active : style.header_item } 
                        onPress={ () => handleAbasMenu('qr-comprar') }
                    >

                        <Text style={ style.header_text } >Quero <Text style={ style.header_text_strong } >Comprar</Text> </Text>

                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={ aba == 'qr-vender' ? style.header_item__active : style.header_item } 
                        onPress={ () => handleAbasMenu('qr-vender') } 
                         
                    >

                        <Text style={ style.header_text } >Quero <Text style={ style.header_text_strong } >Vender</Text> </Text>

                    </TouchableOpacity>

                </View>

                { 
                    aba == 'qr-vender' ? 
                        (
                            <QueroVender />
                        )
                    : 
                        (<QueroComprar />)
                }
                

            </View>

        </ScrollView>
        </>
    );

}