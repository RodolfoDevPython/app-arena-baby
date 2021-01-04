import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, Animated } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

import ItemJson from "../../../helpers/jsonFakeItemsMenu";

import RemoveAcentos from "../../../helpers/removeAcentos";

import IconMamae from "../../../assets/svg/icon-mamae";
import IconCalcados from "../../../assets/svg/icon-sapatos";
import IconHigiene from "../../../assets/svg/icon-higiene";
import IconQuarto from "../../../assets/svg/icon-quarto";
import IconBanho from "../../../assets/svg/icon-banho";
import IconAcessorios from "../../../assets/svg/icon-acessorios";
import IconPasseio from "../../../assets/svg/icon-passeio";
import IconAlimentacao from "../../../assets/svg/icon-alimentacao";
import IconBrinquedos from "../../../assets/svg/icon-brinquedos";
import IconRoupas from "../../../assets/svg/icon-roupas";

import IconArrow from "../../../assets/svg/icon-arrow-small";

import style from "./style";

export default function Items() {

    const navigation = useNavigation();

    const [ toggleMenu , setToggleMenu ]  = useState({ 'isActive': false, 'element': null });

    const rotation = useRef(new Animated.Value(0)).current;

    //ajusta para colocar o valor com deg
    const rotate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    })

    function onClickAbas(element) {

        if (!toggleMenu.isActive) {
            setToggleMenu({ isActive: true, element })
        } else {
            setToggleMenu({ isActive: false, element })
        }

        let toValue = toggleMenu.isActive ? 0 : 1

        console.log(toggleMenu)

        Animated.timing(
            rotation,{
                toValue ,
                duration: 500,
                useNativeDriver: true
            }
        ).start();

    }

    function onLink(departament) {

        navigation.navigate('Category', {
                Busca: departament 
            }
        )
        
    }

    return(

        <View>
            
            <FlatList 
                data={ ItemJson }
                keyExtractor={ (element, index) => String(index) }
                showsHorizontalScrollIndicator={ true }
                renderItem={ ({ item }) => { 

                    let departament = item.Departament;

                    let { Departament, categoriesIds } = item;

                    console.log(categoriesIds)
                    
                    
                    return (
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomColor: '#ddd', borderBottomWidth: 1, padding: 17, paddingLeft: 30, backgroundColor: '#F5F5F5' }} >
                            <TouchableOpacity 
                                onPress={ () => onLink({ departament }) } 

                            >
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                {
                                    departament == 'Roupas'? <IconRoupas /> : null
                                }
                                {
                                    departament == 'Calçados'? <IconCalcados /> : null
                                }
                                {
                                    departament == 'Passeio'? <IconPasseio /> : null
                                }   
                                {
                                    departament == 'Banho'? <IconBanho /> : null
                                }
                                {
                                    departament == 'Higiene'? <IconHigiene /> : null
                                }
                                {
                                    departament == 'Alimentação'? <IconAlimentacao /> : null
                                }
                                {
                                    departament == 'Quarto'? <IconQuarto /> : null
                                }
                                {
                                    departament == 'Brinquedos'? <IconBrinquedos /> : null
                                }
                                {
                                    departament == 'Acessorios'? <IconAcessorios /> : null
                                }
                                {
                                    departament == 'Mamãe'? <IconMamae /> : null
                                }
                                
                                    <Text style={{ marginLeft: 32 }} >{ item.Departament }</Text>
                                </View>

                            </TouchableOpacity>
                            { 
                                toggleMenu.element == departament ? 
                                (
                                    <Animated.View style={{ transform: [{rotate: rotate }] }} > 
                                        <TouchableOpacity name={ departament } onPress={ () => onClickAbas(departament) }>
                                            <IconArrow />
                                        </TouchableOpacity>
                                    </Animated.View>
                                
                                )
                                : (

                                    <Animated.View style={{ transform: [{rotate: '0deg' }] }}> 

                                        <TouchableOpacity name={ departament} onPress={ () => onClickAbas(departament) }>
                                            <IconArrow />
                                        </TouchableOpacity>

                                    </Animated.View>

                                )
                            } 
                            
                            
                        </View>
                    )
                    
                } 

            }

            />

        </View>

    );
}