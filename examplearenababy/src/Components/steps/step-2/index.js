import React, { useState } from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import * as Progress from 'react-native-progress';


import style from "../style";

export default function InitStep2() {

    const logo = require('../../../assets/png/compre-pelo-app-step.png');

    return(
        <>
            <View style={style.container} >
            
                <View style={style.step}>
                    <Image style={style.logo} source={logo} />
                    <Text style={style.subTitle} >Compre pelo app</Text>
                    <Text style={style.title} >Clube Arena Baby</Text>


                    <Text style={style.text_small}>
                        Um mundo de <Text style={ style.txt_destaque } > roupas, acessórios, brinquedos</Text> e <Text style={ style.txt_destaque } >calçados.</Text>
                    </Text>
                    
                </View>
                
            </View>          
        </>
    );
    
}
