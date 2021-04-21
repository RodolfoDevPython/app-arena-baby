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

import api from "../../../server";

import style from "./style";

export default function Items() {

    const navigation = useNavigation();

    const [ toggleMenu , setToggleMenu ]  = useState({ 
        'isActive': false, 
        'element': null, 
        "sub_isActive": false, 
        "top_marca_isActive": false
    });

    const [ itemMenu, setItemMenu ] = useState([]);

    const rotation = useRef(new Animated.Value(0)).current;
    const rotationCatg = useRef(new Animated.Value(0)).current;
    const rotationTopMarcas = useRef(new Animated.Value(0)).current;

    //ajusta para colocar o valor com deg
    const rotate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    const rotateCatg = rotationCatg.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    const rotateTopMarcas = rotationTopMarcas.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    function onClickAbas(element) {

        
        if (!toggleMenu.isActive) {
            setToggleMenu({ ...toggleMenu, isActive: true, element })
        } else {
            setToggleMenu({ ...toggleMenu, isActive: false, element })
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


    function onClickAbasCategorias() {

        
        if (!toggleMenu.sub_isActive) {
            setToggleMenu({ ...toggleMenu, sub_isActive: true, top_marca_isActive: false })
        } else {
            setToggleMenu({ ...toggleMenu, sub_isActive: false })
        }

        let toValue = toggleMenu.sub_isActive ? 0 : 1        

        console.log(toggleMenu)

        Animated.timing(
            rotationCatg,{
                toValue ,
                duration: 500,
                useNativeDriver: true
            }
        ).start();

    }

    function onClickAbasTopMarcas() {

        
        if (!toggleMenu.top_marca_isActive) {
            setToggleMenu({ ...toggleMenu, top_marca_isActive: true, sub_isActive: false })
        } else {
            setToggleMenu({ ...toggleMenu, top_marca_isActive: false })
        }

        let toValue = toggleMenu.top_marca_isActive ? 0 : 1        

        console.log(toggleMenu)

        Animated.timing(
            rotationTopMarcas,{
                toValue ,
                duration: 500,
                useNativeDriver: true
            }
        ).start();

    }

    function onLink(departament) {

        console.log("departament")
        console.log(departament)
        
        navigation.navigate('Category', {
                Busca: departament 
            }
        )
        
    }

    useEffect( () => {

        async function fetchData() {
            const { data } = await api.get("/catalog_system/pub/category/tree/1");

            console.log(data)

            
            ///apendar os dados em ordem alfabetica
            setItemMenu(data.sort( (a, b) => {

                if (a.Title < b.Title ) {
                  return -1;
                }

                if(a.Title > b.Title) {
                    return 1;
                }

                return 0;

            }));

        }
        
        fetchData();
        
    }, [])

    return(

        <View>
            
            <FlatList 
                data={ itemMenu }
                keyExtractor={ (element, index) => String(index) }
                showsHorizontalScrollIndicator={ true }
                renderItem={ ({ item }) => { 

                    //let departament = item.Title;

                    let { Title, id } = item;
                    
                    return (
                        <>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomColor: '#ddd', borderBottomWidth: 1, padding: 17, paddingLeft: 30, backgroundColor: '#F5F5F5' }} >
                                <TouchableOpacity 
                                    onPress={ () => onClickAbas(Title) }
                                    // onPress={ () => onLink({ category: item }) } 

                                >
                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                    {
                                        Title == 'Roupas'? <IconRoupas /> : null
                                    }
                                    {
                                        Title == 'Calçados'? <IconCalcados /> : null
                                    }
                                    {
                                        Title == 'Passeio'? <IconPasseio /> : null
                                    }   
                                    {
                                        Title == 'Banho'? <IconBanho /> : null
                                    }
                                    {
                                        Title == 'Higiene'? <IconHigiene /> : null
                                    }
                                    {
                                        Title == 'Alimentação'? <IconAlimentacao /> : null
                                    }
                                    {
                                        Title == 'Quarto'? <IconQuarto /> : null
                                    }
                                    {
                                        Title == 'Brinquedos'? <IconBrinquedos /> : null
                                    }
                                    {
                                        Title == 'Acessorios'? <IconAcessorios /> : null
                                    }
                                    {
                                        Title == 'Mamães'? <IconMamae /> : null
                                    }
                                    
                                        <Text style={{ marginLeft: 32, fontSize: 14, fontWeight: "700" }} >{Title.toUpperCase()}</Text>

                                    </View>

                                </TouchableOpacity>

                                { 
                                    toggleMenu.element == Title ? 
                                    (
                                        
                                        <Animated.View style={{ transform: [{rotate: rotate }] }} > 
                                            <TouchableOpacity name={ Title } onPress={ () => onClickAbas(Title) } >
                                                <IconArrow />
                                            </TouchableOpacity>
                                        </Animated.View>
                                
                                    )
                                    : (

                                        <Animated.View style={{ transform: [{rotate: '0deg' }] }}> 

                                            <TouchableOpacity name={ Title} onPress={ () => onClickAbas(Title) }>
                                                <IconArrow />
                                            </TouchableOpacity>

                                        </Animated.View>

                                    )
                                } 
                                
                            </View>                        

                        { 
                            toggleMenu.element == Title && toggleMenu.isActive
                            ? (
                                <View style={{ flexDirection: 'column', padding: 20, paddingLeft: 30,  backgroundColor: '#F5F5F5' }} >

                                    <TouchableOpacity onPress={ () => onLink({ category: item, search: '' }) }  >
                                        <Text style={{ fontWeight: '700', fontSize: 13, lineHeight: 13 }} >VER TODOS</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={ () => onLink({ category: item, search: '' }) } >
                                        <Text style={{ fontWeight: '300', fontSize: 13, marginTop: 20, lineHeight: 13 }} >ACABOU DE CHEGAR</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={ () => onLink({ category: item, search: '' }) } >
                                        <Text style={{ fontWeight: '300', fontSize: 13, marginTop: 20, lineHeight: 13 }} >NUNCA USADOS</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={ () => onLink({ category: item, search: "&fq=P:[0TO40]" }) } >
                                        <Text style={{ fontWeight: '300', fontSize: 13, marginTop: 20, lineHeight: 13 }} >ESTILOS ABAIXO R$40</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={ () => onLink({ category: item, search: "&fq=P:[0TO30]" }) } >
                                        <Text style={{ fontWeight: '300', fontSize: 13, marginTop: 20, lineHeight: 13 }} >ESTILOS ABAIXO R$30</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={ () => onLink({ category: item , search: "&fq=P:[0TO20]" }) } >
                                        <Text style={{ fontWeight: '300', fontSize: 13, marginTop: 20, marginBottom: 5, lineHeight: 13 }} >ESTILOS ABAIXO R$20</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={ () => onLink({ category: item , search: "&fq=specificationFilter_36:213" }) } >
                                        <Text style={{ fontWeight: '700', fontSize: 13, marginTop: 20, marginBottom: 5, lineHeight: 13, color: '#AACE37' }} >PRIME</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={ () => onLink({ category: item , search: "&fq=P:[0TO20]" }) } >
                                        <Text style={{ fontWeight: '700', fontSize: 13, marginTop: 20, marginBottom: 5, lineHeight: 13, color: '#DF3300' }} >SALE</Text>
                                    </TouchableOpacity>
                                    
                                <View>

                                <View style={{ flexDirection: 'column', padding: 5, paddingLeft: 0 }} >

                                    <TouchableOpacity 
                                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                                        onPress={ onClickAbasCategorias }
                                        >
                                        <Text style={{ fontWeight: '700', fontSize: 13 }} >CATEGORIAS</Text>

                                        <Animated.View style={{ transform: [{rotate: rotateCatg }] }} > 
                                            {/* <TouchableOpacity name={ Title } onPress={ () => onClickAbas(Title) } > */}
                                            <IconArrow />
                                            {/* </TouchableOpacity> */}
                                        </Animated.View>

                                    </TouchableOpacity>
                                    
                                    {
                                        toggleMenu.sub_isActive
                                        ? (
                                            <View style={{ backgroundColor: '#F5F5F5', paddingLeft: 30 }}>
                                                { 
                                                    item.children.map( (e, i) => (

                                                        <TouchableOpacity 
                                                            onPress={ () => onLink({ category: item , search: `/${e.id}` }) }
                                                        >
                                                            <Text 
                                                                style={{ fontWeight: '300', fontSize: 13, marginTop: 20, lineHeight: 13, textTransform: 'uppercase' }} 
                                                                key={i} >{e.name}</Text>
                                                        </TouchableOpacity>
                                                    
                                                    )) 
                                                }
                                            </View>
                                        )
                                        : 
                                        (<></>)
                                    }
                                    
                                </View>

                                <View style={{ flexDirection: 'column', padding: 0, paddingLeft: 0 }} >

                                        <TouchableOpacity
                                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                                            onPress={ onClickAbasTopMarcas }
                                        >

                                            <Text style={{ fontWeight: '700', fontSize: 13, lineHeight: 13 }} >TOP MARCAS</Text>

                                            <Animated.View style={{ transform: [{rotate: rotateTopMarcas }] }} > 
                                                {/* <TouchableOpacity name={ Title } onPress={ () => onClickAbas(Title) } > */}
                                                <IconArrow />
                                                {/* </TouchableOpacity> */}
                                            </Animated.View>

                                        </TouchableOpacity>
                                        
                                    </View>
                                    
                                </View>
                            </View>
                            ) : null
                        
                        }

                        </>
                    )
                    
                } 

            }

            />

        </View>

    );
}