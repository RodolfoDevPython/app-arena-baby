import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";


import IconMiniCart from "../../assets/svg/icon-minicart";
import IconRemoveItem from "../../assets/svg/icon-remove-item";
import Header from "../MenuNavigation/Header";

import currency from "../../helpers/float-to-currency";

import style from "./style";

export default function Minicart({ navigation }) {

    const items = useSelector(state => state.minicart);

    const dispatch = useDispatch();

    const [ total, setTotal ] = useState(0);

    useEffect( () => {
        console.log("COMPONENTE DE MINICART")
        console.log(items)
        console.log("-------------= COMPONENTE DE MINICART =--------------")
    }, [])

    useEffect( () => {
        console.log("itemmsss")

        let tot = 0;

        items.map( (e,i) => {
            // console.log("1")
            // console.log(total)
            // console.log("2")
            // console.log(e.product.items[0].sellers[0].commertialOffer.ListPrice)
            // console.log( (total == undefined ? 0 : total) + e.product.items[0].sellers[0].commertialOffer.ListPrice )      
            tot += e.product.items[0].sellers[0].commertialOffer.ListPrice;
        });

        setTotal(tot);  
        // setTotal
        
        console.log(" =------------ itemmsss --------------= ")
    }, [ items ])

    function removeItem(productId) {
        console.log(productId)

        dispatch({ type: "REMOVE_ITEM_MINICART", productId });
        // REMOVE_ITEM_MINICART
    }

    function GoToCheckout() {

        dispatch({ type: "GO_TO_CHECKOUT", items });

        navigation.navigate("Checkout", { items });

    }

    return (
        <View style={{ backgroundColor: '#fff' }}>   
        
            <Header is_active={true} title={"ITENS DA SACOLA"} />

            { 
            items.length == 0
            ? 
            (
                <View style={{ alignItems: 'center', justifyContent: 'center', height: 400 }} >

                    <Text>CARRINHO VAZIO</Text>

                    <TouchableOpacity 
                        style={{ ...style.btn, borderColor: "#AACE37", backgroundColor: "#AACE37", marginTop: 80 }}
                        onPress={() => navigation.navigate("Home") }
                    >

                        <Text style={{ color: "#fff", fontWeight: "700" }} >
                            CONTINUAR COMPRANDO
                        </Text>

                    </TouchableOpacity>

                </View>
            ) 
            : 
            (

                <View style={{ justifyContent: 'flex-start', minHeight: 500 }} >

                    <View style={{ padding: 25, borderBottomColor: '#DBDBDB', borderBottomWidth: 1 }} >

                        <View>

                            <Text style={{ fontWeight: "400", fontSize: 18, lineHeight: 21, color: '#707174', marginBottom: 5 }} >SUA SACOLA</Text>

                            <Text style={{ fontWeight: '300', lineHeight: 19, fontSize: 16, color: '#434343' }} >R$ {currency(total) }</Text>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 5 }} >

                            <View style={{ position: "relative" }}>
                                <Text style={style.qtd} >{items.length}</Text>
                                <IconMiniCart />
                            </View>

                            <Text style={{ fontSize: 12, lineHeight: 14, fontWeight: '300', marginLeft: 7 }} >RESUMO DO PEDIDO</Text>

                        </View>

                        </View>

                    <ScrollView 
                        style={style.menu} 
                    >                
                        {
                            items.map( (e, i) => {

                                    const image = e.product.items ? e.product.items[0].images[0].imageUrl : null;

                                    return(
                                        // e.map( (product, i) => (
                                            <View key={i} style={style.item} >

                                                <View>
                                                {
                                                    image && 
                                                    (

                                                        <Image 
                                                            style={{ height: 88, width: 81 }}
                                                            source={{ uri: image }}  />

                                                    )
                                                }
                                                </View>
                                                
                                                <View style={{ marginLeft: -30 }} >

                                                    <Text style={{ fontSize: 16, fontWeight: "700", lineHeight: 19 }} >
                                                    { 
                                                        e.product.items ?  `R$ ${currency(e.product.items[0].sellers[0].commertialOffer.ListPrice)}` : ""
                                                    }
                                                    </Text>

                                                    <Text style={{ fontSize: 12, fontWeight: "300", lineHeight: 14 }} >{e.product.productName}</Text>

                                                </View>

                                                <TouchableOpacity onPress={() => removeItem(e.product.productId)}>

                                                    <IconRemoveItem />
                                                    
                                                </TouchableOpacity>
                                                
                                            </View>

                                    )
                                
                            })
                        }
                    </ScrollView>

                    <View style={{ padding: 25, borderTopColor: '#DBDBDB', borderTopWidth: 1  }}>

                            <TouchableOpacity 
                                style={{ ...style.btn, borderColor: "#434343" }}  
                            >

                                <Text style={{ color: "#434343" ,fontSize: 14, lineHeight: 16, fontWeight: '700' }} >CONTINUAR COMPRADO</Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ ...style.btn, borderColor: "#AACE37", backgroundColor: "#AACE37", marginTop: 8 }}  
                                onPress={GoToCheckout}
                            >

                                <Text style={{ color: '#fff', fontSize: 14, lineHeight: 16, fontWeight: '700' }} >FINALIZAR COMPRA</Text>

                            </TouchableOpacity>

                        </View>

                </View>

            )
            }

            
        </View>
    );
}