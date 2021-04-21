import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { RadioButton  } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import IconCloseBig from "../../../assets/svg/icon-close--big";

import style from "./style";

export default function BoxMenuFilter() {

    const dispatch = useDispatch();

    const [ orderBy, setOrderBy ] = useState("");
    
    const { posOrder } = useSelector( state => state.boxMenuCategory );

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

    useEffect( () => {
        console.log(orderBy)

        dispatch({ type: 'ORDER_BY', orderBy });

    }, [ orderBy ]);

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

            {
                orderBy ? (

                <View style={ style.filterByMenu } >
                    <Text>Ordernador Por:</Text>                            

                    <TouchableOpacity style={ style.sortedItem } onPress={ () => setOrderBy("") } >

                        <Text style={{ color: '#AACE37', alignItems: 'center', justifyContent: 'space-between' }} >{orderBy.title}</Text>
                        <Text style={{ transform: [ { rotate: '46deg' } ], color: '#AACE37', alignItems: 'center', fontSize: 25, fontWeight: '100' }} >+</Text>

                    </TouchableOpacity>

                </View>

            ) : <View style={ style.filterByMenu } ></View>}
            
            
            <ScrollView>

                <View>
                    <TouchableOpacity style={ style.itemMenuLv1 } onPress={ () => setOrderBy({ title: "MAIS VENDIDOS", script: "?O=OrderByTopSaleDESC" }) } >
                        <Text>MAIS VENDIDOS</Text>                            
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={ style.itemMenuLv1 } onPress={ () => setOrderBy({ title: "MELHORES AVALIAÇÕES" , script: "?O=OrderByReviewRateDESC" }) } >
                        <Text>MELHORES AVALIAÇÕES</Text>                            
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={ style.itemMenuLv1 } onPress={ () => setOrderBy({ title: "DATA DE LANCAMENTO", script: "?O=OrderByReleaseDateDESC" }) } >
                        <Text>DATA DE LANCAMENTO</Text>                            
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={ style.itemMenuLv1 } onPress={ () => setOrderBy({ title: "MENOR PRECO" , script: "?O=OrderByPriceASC" }) } >
                        <Text>MENOR PRECO</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={ style.itemMenuLv1 } onPress={ () => setOrderBy({ title: "MAIOR PRECO", script: "?O=OrderByPriceDESC" }) } >
                        <Text>MAIOR PRECO</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={ style.itemMenuLv1 } onPress={ () => setOrderBy({ title: "A - Z", script: "?O=OrderByNameASC" }) } >
                        <Text>A - Z</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={ style.itemMenuLv1 } onPress={ () => setOrderBy({ title: "Z- A", script: "?O=OrderByNameDESC" }) } >
                        <Text>Z - A</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={ style.itemMenuLv1 } onPress={ () => setOrderBy({ title: "MAIOR DESCONTO", script: "?O=OrderByBestDiscountDESC" }) } >
                        <Text>MAIOR DESCONTO</Text>
                    </TouchableOpacity>
                </View>

                {/* <View>
                    <TouchableOpacity style={ style.itemMenuLv1 } >
                        <Text>MENOR DESCONTO</Text>
                    </TouchableOpacity>
                </View> */}

            </ScrollView>
            
        </Animated.View>

    );

}