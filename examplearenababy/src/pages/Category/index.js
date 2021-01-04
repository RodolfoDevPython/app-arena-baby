import React, { useEffect, useRef, useState } from "react";
import { View, Button, Text, Dimensions, Animated } from "react-native";
import { RadioButton  } from "react-native-paper";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import Header from "../../Components/MenuNavigation/Header";

import BoxFilter from "../../Components/Category/Filter";
import BoxOrderBy from "../../Components/Category/OrderBy";

import ResultCategory from "../../Components/Shelf/ResultCategory";

import IconArrow from "../../assets/svg/icon-arrow-small";

import style from "./style";

import { useDispatch, useSelector } from "react-redux";

export default function Category({ route, navigation }) {

    const { Busca } = route.params;

    console.log('Buscaaaaaaaaaaaaa')
    console.log(Busca.departament)
    console.log('----------------=Buscaaaaaaaaaaaaa=-------------')

    const dispatch = useDispatch();

    const { opacity } = useSelector( state => state.filterCategory );

    const opacityShadow = useRef(new Animated.Value(Number(opacity))).current;

    useEffect( () => {
        //Animação opacidade para o box-shadow
        Animated.timing(
            opacityShadow,{
                toValue: opacity ,
                duration: 500,
                useNativeDriver: true
            }
        ).start();
        
    }, [ opacity ]);


    
    function onToggleMenu(type) {

        let posActive = 0;

        dispatch({ type, posActive });

    }

    return (

        <View style={{ flex: 1 }} >

            <Header />    

            <View style={{ elevation: 6,  zIndex: 7 }} >

                <View style={{ position: 'relative' , elevation: 4, flexDirection: 'row', justifyContent: 'center', maxWidth: Dimensions.get('window').width }} >

                    <TouchableOpacity 
                        onPress={ () => onToggleMenu('OPEN_BOX_FILTER') } 
                        style={{ backgroundColor: "#F5F5F5", padding: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >

                        <View style={{ padding: 6, borderRightColor: '#C4C4C4', borderRightWidth: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingLeft: 53, paddingRight: 53 }}>
                            <Text>Filtrar</Text>
                            <IconArrow />
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={ () => onToggleMenu('OPEN_BOX_ORDER') } 
                        style={{ backgroundColor: "#F5F5F5", padding: 16, paddingLeft: 53, paddingRight: 53, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >
                        <Text>Ordenar</Text>
                        <IconArrow />
                    </TouchableOpacity>                    

                </View>
                
            </View>

            <Animated.View style={{ ...style.boxShadow, opacity: opacityShadow }} >

            </Animated.View>


            <BoxFilter />

            <BoxOrderBy />

            <ScrollView style={ style.ContainerResult }>  
                <ResultCategory busca={`${Busca.departament}`} />
            </ScrollView>

        </View>
        
    );
}