import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { RadioButton  } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import IconCloseBig from "../../../assets/svg/icon-close--big";

import style from "./style";

export default function BoxMenuFilter() {

    const dispatch = useDispatch();
    
    const { posOrder } = useSelector( state => state.filterCategory );

    const styleRightOrder = useRef(new Animated.Value(Number(posOrder))).current;
    
    useEffect( () => {
        //Animação Lateral para o Menu de Ordernar
        Animated.timing(
            styleRightOrder,{
                toValue: posOrder ,
                duration: 500,
                useNativeDriver: true
            }
        ).start();

    }, [ posOrder ]);

    function onToggleMenu(type) {

        let posActive = 0;

        dispatch({ type, posActive });

    }

    return(

        <Animated.View style={{ ...style.boxMenu, right: 0, transform: [{ translateX: styleRightOrder }] }} >

            <View style={ style.headerMenu } >

                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, lineHeight: 19 ,fontWeight: '700' }} >
                        ORDERNAR    
                    </Text>

                    <TouchableOpacity onPress={ () => onToggleMenu('CLOSE_FILTER') } >
                        <IconCloseBig />
                    </TouchableOpacity>                            
                </View>

                <Text>+ 5000 Itens</Text>

            </View>

            <View style={ style.filterByMenu } >
                
                <Text>Ordernador Por:</Text>                            

                <TouchableOpacity style={ style.sortedItem } >

                    <Text style={{ color: '#AACE37', alignItems: 'flex-start' }} >Mais Vendidos    x</Text>

                </TouchableOpacity>

            </View>
            
            <ScrollView>

                <View>
                    <TouchableOpacity style={ style.itemMenuLv1 } >
                        <Text>MAIS VENDIDOS</Text>                            
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={ style.itemMenuLv1 } >
                        <Text>MELHORES AVALIAÇÕES</Text>                            
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={ style.itemMenuLv1 } >
                        <Text>DATA DE LANCAMENTO</Text>                            
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={ style.itemMenuLv1 } >
                        <Text>MENOR PRECO</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={ style.itemMenuLv1 } >
                        <Text>MAIOR PRECO</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={ style.itemMenuLv1 } >
                        <Text>A - Z</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={ style.itemMenuLv1 } >
                        <Text>Z- A </Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={ style.itemMenuLv1 } >
                        <Text>MAIOR DESCONTO</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={ style.itemMenuLv1 } >
                        <Text>MENOR DESCONTO</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
            
        </Animated.View>

    );

}