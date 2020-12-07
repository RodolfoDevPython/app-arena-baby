import React from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import style from "../style";

export default function InitStep3() {

    const logo = require('../../../assets/png/icon-fique-por-dentro-step.png');

    return(
        <>
            
            <View style={style.container} >
            
                <View style={style.step}>
                    <Image style={style.logo} source={logo} />
                    <Text style={style.subTitle} >Fique por dentro</Text>
                    <Text style={style.subTitle} >das <Text style={style.title} >novidades</Text> </Text>

                    <Text style={style.text_small}>
                        Saiba em primeira mão sobre as <Text style={ style.txt_destaque } >promoções</Text> e <Text style={ style.txt_destaque } >lançamentos Arena Baby.</Text>
                    </Text>
                    
                </View>
                
            </View>          
            
        </>
    );
    
}
