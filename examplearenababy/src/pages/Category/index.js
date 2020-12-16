import React, { useEffect, useRef, useState } from "react";
import { View, Button, Text, Dimensions, Animated } from "react-native";
import { RadioButton  } from "react-native-paper";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import Header from "../../Components/MenuNavigation/Header";

import ResultCategory from "../../Components/Shelf/ResultCategory";

import IconArrow from "../../assets/svg/icon-arrow-small";
import IconCloseBig from "../../assets/svg/icon-close--big";

import style from "./style";

export default function Category({ route, navigation }) {

    const { Busca } = route.params;

    const [ itemMenu , setItemMenu ] = useState()

    const [ posFilter, setPosFilter ] = useState(-400);
    const [ opacity, setOpacity ] = useState(0);
    const [ posOrder, setPosOrder ] = useState(410);

    const styleLeftFilter = useRef(new Animated.Value(posFilter)).current;
    const styleRightOrder = useRef(new Animated.Value(posOrder)).current;
    const opacityShadow = useRef(new Animated.Value(opacity)).current;

    useEffect( () => {
        
    }, [  ]);
    
    function onToggleMenu(action) {

        switch (action) {

            case "Filter":
                setPosOrder(410);
                setPosFilter(0);    
                setOpacity(1);

                break;

            case "Order":
                setPosFilter(-410);    
                setPosOrder(0);
                setOpacity(1);

                break;

            case "CloseFilter":
                setPosFilter(-410);    
                setPosOrder(410);
                setOpacity(0);
                
                break;
        
            default:
                break;

        }

        //Animação Lateral para o Menu de Filter
        Animated.timing(
            styleLeftFilter,{
                toValue: posFilter ,
                duration: 500,
                useNativeDriver: true
            }
        ).start();

        //Animação Lateral para o Menu de Ordernar
        Animated.timing(
            styleRightOrder,{
                toValue: posOrder ,
                duration: 500,
                useNativeDriver: true
            }
        ).start();
        
        //Animação opacidade para o box-shadow
        Animated.timing(
            opacityShadow,{
                toValue: opacity ,
                duration: 500,
                useNativeDriver: true
            }
        ).start();

    }

    function onChechItem(valor) {

        console.log("checkkk");
        console.log(valor);
        console.log("---checkkk---");

    }

    return (
        <View style={{ flex: 1 }} >

            <Header />    

            <View style={{ elevation: 6,  zIndex: 7 }} >

                <View style={{ position: 'relative' , elevation: 4, flexDirection: 'row', justifyContent: 'center', maxWidth: Dimensions.get('window').width }} >

                    <TouchableOpacity 
                        onPress={ () => onToggleMenu('Filter') } 
                        style={{ backgroundColor: "#F5F5F5", padding: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >

                        <View style={{ padding: 6, borderRightColor: '#C4C4C4', borderRightWidth: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingLeft: 53, paddingRight: 53 }}>
                            <Text>Filtrar</Text>
                            <IconArrow />
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={ () => onToggleMenu('Order') } 
                        style={{ backgroundColor: "#F5F5F5", padding: 16, paddingLeft: 53, paddingRight: 53, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >
                        <Text>Ordenar</Text>
                        <IconArrow />
                    </TouchableOpacity>                    

                </View>
                
            </View>

            <Animated.View style={{ ...style.boxShadow, opacity: opacityShadow }} >

            </Animated.View>


            <Animated.View style={{ ...style.boxMenu, transform: [{ translateX: styleLeftFilter }] }} >

                <View style={ style.headerMenu } >

                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, lineHeight: 19 ,fontWeight: '700' }} >
                            FILTRAR    
                        </Text>

                        <TouchableOpacity onPress={ () => onToggleMenu('CloseFilter') } >
                            <IconCloseBig />
                        </TouchableOpacity>                            
                    </View>

                    <Text>+ 5000 Itens</Text>

                </View>

                <View style={ style.filterByMenu } >
                    
                    <Text>Filtrados Por:</Text>                            

                    <TouchableOpacity style={ style.filteredItem } >

                        <Text style={{ color: '#AACE37' }} >Categoria    x</Text>

                    </TouchableOpacity>

                </View>
                
                <ScrollView>

                    <View>

                        <TouchableOpacity style={ style.itemMenuLv1 } >
                            <Text>CATEGORIA</Text>
                            <Text style={{ fontSize: 23 }} >+</Text>
                        </TouchableOpacity>

                        <ToggleBox label='Show me something' value='asd' style={{backgroundColor: '#ddd', borderBottomWidth: 1}}>
                            <View style={{height: 300, alignItems: 'center', justifyContent: 'center', backgroundColor: '#eee'}}>
                                <Text>Hello, how are you?</Text>
                            </View>
                        </ToggleBox>

                        <View style={{ padding: 10, paddingLeft: 28, paddingRight: 38,  }} >

                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <RadioButton
                                        value="first"
                                        color="#AACE37"
                                        onPress={ () => onChechItem('Todas Categorias') }
                                    />
                                <Text style={{ paddingRight: 10 }} >
                                    Todas Categorias
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <RadioButton
                                        value="first"
                                        color="#AACE37"
                                        onPress={ () => onChechItem('Prime') }
                                    />
                                <Text style={{ paddingRight: 10 }} >
                                    Prime
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <RadioButton
                                        value="first"
                                        color="#AACE37"
                                        onPress={ () => onChechItem('Novos de Fábrica') }
                                    />
                                <Text style={{ paddingRight: 10 }} >
                                    Novos de Fábrica
                                </Text>
                            </View>
                            
                        </View>

                    </View>

                    <View>
                        <TouchableOpacity style={ style.itemMenuLv1 } >
                            <Text>GENERO</Text>
                            <Text style={{ fontSize: 23 }} >+</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity style={ style.itemMenuLv1 } >
                            <Text>TAMANHO</Text>
                            <Text style={{ fontSize: 23 }} >+</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity style={ style.itemMenuLv1 } >
                            <Text>MARCA</Text>
                            <Text style={{ fontSize: 23 }} >+</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity style={ style.itemMenuLv1 } >
                            <Text>COR</Text>
                            <Text style={{ fontSize: 23 }} >+</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>


                <View style={{ marginTop: 10, marginBottom: 20, padding: 10, paddingLeft: 28, paddingRight: 28 }}>

                    <TouchableOpacity style={{ backgroundColor: '#AACE37', padding: 16, marginBottom: 8, borderRadius: 8 }} >
                        <Text style={{ color: 'white', textTransform: 'uppercase', textAlign: 'center', fontSize: 14 }} >Aplicar filtro</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: '#969696', padding: 16, borderRadius: 8 }} >
                        <Text style={{ color: 'white', textTransform: 'uppercase', textAlign: 'center', fontSize: 14 }} >Limpar filtro</Text>
                    </TouchableOpacity>

                </View>
            </Animated.View>


            <Animated.View style={{ ...style.boxMenu, right: 0, transform: [{ translateX: styleRightOrder }] }} >

                <View style={ style.headerMenu } >

                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, lineHeight: 19 ,fontWeight: '700' }} >
                            ORDERNAR    
                        </Text>

                        <TouchableOpacity onPress={ () => onToggleMenu('CloseFilter') } >
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

            <ScrollView style={ style.ContainerResult }>  
                <ResultCategory busca={`ft='${Busca}'`} />
            </ScrollView>

        </View>
    );
}