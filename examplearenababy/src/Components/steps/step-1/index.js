import React from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import style from "../style";

export default function InitStep1() {

    const logo = require('../../../assets/png/logo-grande.png');

    return(
        <>
            <View style={style.container} >
            
                <View style={style.step}>
                    <Image style={style.logo} source={logo} />
                    <Text style={style.subTitle} >Bem-Vindo ao aplicativo</Text>
                    <Text style={style.title} >Clube Arena Baby</Text>


                    <Text style={style.text_small}>
                        Fique ligado nas <Text style={ style.txt_destaque } >novidades, tendências coleções e promoções exclusivas. ,</Text>
                    </Text>
                    
                </View>

            </View>          
        </>
    );
    
}
