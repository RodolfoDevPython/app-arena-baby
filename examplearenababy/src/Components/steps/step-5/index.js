import React from "react";
import { View, Text, Image, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import style from "../style";

export default function InitStep3() {

    const logo = require('../../../assets/png/icon-ative-localizacao-step.png');

    return(
        <>
            
            <View style={style.container} >
            
                <View style={style.step}>


                    <Image style={style.logo} source={logo} />

                    <Text style={style.title} >Ative sua localização</Text>

                    <Text style={style.subTitle} >para ganhar descontos</Text>

                    <Text style={style.text_small}>
                        Nos ajude a localizar a <Text style={ style.txt_destaque } >loja {"\n"} 
                        mais próxima de você</Text>{"\n"}
                        e <Text style={ style.txt_destaque } >liberar descontos. </Text>
                    </Text>

                    <TouchableOpacity style={style.btn_destaque}>
                        <Text style={style.txt_btn_destaque}>Ativar Minha Localização</Text>
                    </TouchableOpacity>
                    
                </View>
                
            </View>          
            
        </>
    );
    
}
