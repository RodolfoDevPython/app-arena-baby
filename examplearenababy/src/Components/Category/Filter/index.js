import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { RadioButton  } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import IconCloseBig from "../../../assets/svg/icon-close--big";

import style from "./style";

import api from "../../../server";

export default function BoxMenuFilter() {

    const dispatch = useDispatch();

    const [ itemFilter, setItemFilter ] = useState([]);
    
    const { posFilter } = useSelector( state => state.filterCategory );

    const [ itemMenu , setItemMenu ] = useState();
    //const [ posFilter, setPosFilter ] = useState(-400);

    const [ checkedItem, SetCheckedItem ] = useState(false);

    const styleLeftFilter = useRef(new Animated.Value(posFilter)).current;


    useEffect( () => {

        async function fetchData() {
            const { data } = await api.get('/catalog_system/pub/specification/field/listByCategoryId/3');

            setItemFilter(data)
        }

        fetchData();

    }, [ ]);

    useEffect( () => {

        Animated.timing(
            styleLeftFilter,{
                toValue: posFilter ,
                duration: 500,
                useNativeDriver: true
            }
        ).start();
        
    }, [ posFilter ]);

    function onToggleMenu(type) {

        let posActive = 0;

        dispatch({ type, posActive });

    }

    function onCheckItem(obj) {

        console.log("checkkk");
        console.log(obj);
        console.log("---checkkk---");

        if (checkedItem.FieldValueId == obj.FieldValueId ) return SetCheckedItem(false);

        SetCheckedItem(obj);        

    }

    function getItemMenu(FieldId) {

        
        itemFilter.map( (e, i) => {    

            if( e.FieldId == FieldId && !e["Items"] ) {
                api.get(`/catalog_system/pub/specification/fieldvalue/${FieldId}`).then( ({ data }) => {
                    e["Items"] = data;
                });
            }
        
        });

    }

    function handleItemMenu(item) {

        if ( itemMenu && itemMenu.name == item.Name) return setItemMenu('');

        setItemMenu({ name: item.Name, items: [ ] });

        getItemMenu(item.FieldId);
        
    }

    function setResult() {

        if (checkedItem) { 
            dispatch({ type: 'FILTER', checkedItem });
            onToggleMenu('CLOSE_FILTER');
        }

    }

    return(

        <Animated.View style={{ ...style.boxMenu, transform: [{ translateX: styleLeftFilter }] }} >

                <View style={ style.headerMenu } >

                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, lineHeight: 19 ,fontWeight: '700' }} >
                            FILTRAR    
                        </Text>

                        <TouchableOpacity onPress={ () => onToggleMenu('CLOSE_FILTER') } >
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

                        <TouchableOpacity 
                            style={ style.itemMenuLv1 } 
                            onPress={ () => { 

                                if (itemMenu == 'Categoria') return setItemMenu('');

                                setItemMenu('Categoria');

                            }}
                        >
                            <Text>CATEGORIA</Text>

                            <Text style={{ fontSize: 23 }} >
                                { itemMenu == 'Categoria'? '-' : '+' }
                            </Text>
                            
                        </TouchableOpacity>

                    {
                        (itemMenu != 'Categoria') 
                        
                        ? (<></>)

                        : (
                            
                            <View style={{ padding: 10, paddingLeft: 28, paddingRight: 38 }} >

                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >

                                    <RadioButton
                                            value="first"
                                            color="#AACE37"
                                            onPress={ () => onCheckItem('Todas Categorias') }
                                            status={ checkedItem ? 'checked' : 'unchecked' }                                            
                                        />
                                    <Text style={{ paddingRight: 10 }} >
                                        Todas Categorias
                                    </Text>

                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                    <RadioButton
                                            value="first"
                                            color="#AACE37"
                                            status={ checkedItem ? 'checked' : 'unchecked' }
                                            onPress={ () => onCheckItem('Prime') }
                                        />
                                    <Text style={{ paddingRight: 10 }} >
                                        Prime
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                    <RadioButton
                                            value="first"
                                            color="#AACE37"
                                            status={ checkedItem ? 'checked' : 'unchecked' }
                                            onPress={ () => onCheckItem('Novos de Fábrica') }
                                        />
                                    <Text style={{ paddingRight: 10 }} >
                                        Novos de Fábrica
                                    </Text>
                                </View>
                                
                            </View>
                            )

                        }

                    </View>


                    {
                        //Deve ser trocado para o flatlist onde traz mais performace para o app
                        itemFilter.map( (e, i) => {
                            console.log(e)
                            console.log(i)

                            let FieldId = e.FieldId

                            return (

                                <View key={i} >

                                    <TouchableOpacity 
                                        onPress={ () => handleItemMenu(e) }    
                                        style={ style.itemMenuLv1 } 
                                    >
                                        <Text>{e.Name}</Text>
                                        <Text style={{ fontSize: 23 }} > 
                                            { itemMenu && itemMenu.name == e.Name ? '-' : '+' }
                                        </Text>
                                    </TouchableOpacity>

                                { 
                                    //exibi somente quando estiver com item e faz uma verificação para abrir o menu correto
                                    ( e['Items'] && itemMenu.name == e.Name ) 
                                    ? (
                                        
                                        e['Items'].map( (e, i) => {

                                            return (

                                                <View key={i} style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 28, paddingRight: 38, flexDirection: 'row', alignItems: 'center', marginTop: (i == 0 ? 10 : 0)  }} >

                                                    <RadioButton
                                                            value="first"
                                                            color="#AACE37"
                                                            status={ checkedItem.FieldValueId == e.Value ? 'checked' : 'unchecked' }
                                                            onPress={ () => onCheckItem({ FieldId, FieldValueId: e.Value }) }
                                                        />
                                                    <Text style={{ paddingRight: 10 }} >
                                                        { e.Value }
                                                    </Text>

                                                </View>

                                            )
                                        })
                                           
                                    )
                                    :
                                    (<></>)

                                }

                                </View>

                            )

                        }) 
                    }

                </ScrollView>


                <View style={{ marginTop: 10, marginBottom: 20, padding: 10, paddingLeft: 28, paddingRight: 28 }}>

                    <TouchableOpacity 
                        style={{ backgroundColor: '#AACE37', padding: 16, marginBottom: 8, borderRadius: 8 }} 
                        onPress={ setResult }
                        >
                        <Text style={{ color: 'white', textTransform: 'uppercase', textAlign: 'center', fontSize: 14 }} >Aplicar filtro</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: '#969696', padding: 16, borderRadius: 8 }} >
                        <Text style={{ color: 'white', textTransform: 'uppercase', textAlign: 'center', fontSize: 14 }} >Limpar filtro</Text>
                    </TouchableOpacity>

                </View>
        </Animated.View>
       
    );

}