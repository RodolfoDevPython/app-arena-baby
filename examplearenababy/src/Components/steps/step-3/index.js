import React from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import style from "../style";

export default function InitStep3() {

    const logo = require('../../../assets/png/icon-encontre-loja-step.png');

    return(
        <>
            
            <View style={style.container} >
            
                <View style={style.step}>
                    <Image style={style.logo} source={logo} />
                    <Text style={style.subTitle} >Encontre a <Text style={style.title} > Arena baby </Text> </Text>
                    <Text style={style.title} >mais próxima de você</Text>

                    <Text style={style.text_small}>
                        <Text style={ style.txt_destaque } > Pesquise as lojas </Text> no mapa, descubra os <Text style={ style.txt_destaque } >horários de atendimento </Text> e trace uma <Text style={ style.txt_destaque } > rota para a loja escolhida. </Text>
                    </Text>
                    
                </View>
                
            </View>          
            
        </>
    );
    
}
