import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Header from "../../Components/MenuNavigation/Header";

import IconCreditosLojas from "../../assets/svg/icon-creditos-lojas";

import style from "./style";

export default function Credits() {

    const [ show, SetShow ] = useState(true);

    const [ url , setUrl ] = useState();
    
    return(

        <View>

            <Header is_active={true} />    

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#e5e5e5', borderBottomWidth: 1, backgroundColor: '#fff' }} >

                <TouchableOpacity>

                    <Text 
                        style={{ fontSize: 15, lineHeight: 14, color: '#AACE37', padding: 14, borderBottomColor: "#AACE37", borderBottomWidth: 1 }} 
                    >Créditos em lojas</Text>

                </TouchableOpacity>

                <TouchableOpacity>

                    <Text 
                        style={{ fontSize: 15, lineHeight: 14, color: '#969696', padding: 14, borderBottomColor: "#969696", borderBottomWidth: 1 }} 
                    >Créditos na rede</Text>

                </TouchableOpacity>

            </View>
            
            <View style={{ backgroundColor: '#EEEEEE', height: Dimensions.get('window').height, alignItems: 'center' }}>

                <View style={ style.cartItem } >

                    <Text style={ style.cartItemTitle } >Créditos em lojas</Text>

                    <View style={{ marginTop: 20, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }} >

                        <IconCreditosLojas />
                        
                        <Text style={{ fontSize: 15, lineHeight: 18, color: '#969696', marginTop: 20 }} >você ainda não possui créditos</Text>

                        <Text style={{ fontSize: 15, lineHeight: 18, color: '#969696',marginTop: 3 }} >disponíveis nas lojas.</Text>

                    </View>

                </View>

            </View>

        </View>   
        
    )
}