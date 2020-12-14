import React from "react";
import { View , Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


import style from "./style";


export default function QueroVender() {

    return(

        <View style={ style.container } >

            <TouchableOpacity style={ style.item } >
                <Text style={ style.text } >
                    Vender produtos nas <Text style={ style.bold } >lojas fisicas</Text>
                </Text> 
            </TouchableOpacity>

            <TouchableOpacity style={ style.item } >
                <Text style={ style.text } > 
                    vender produtos por <Text style={ style.bold } >metodo online</Text>
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={ style.item } >
                <Text style={{ ...style.text, ...style.bold }} > 
                    Manual do Vendedor
                </Text>
            </TouchableOpacity>

        </View>
        
    ) 

}