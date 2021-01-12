import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput  } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { RadioButton  } from "react-native-paper";
import Slick from 'react-native-slick';

import Shelf from "../../Components/Shelf/ShelfCollection";

import Header from "../../Components/MenuNavigation/Header";

import currency from '../../helpers/float-to-currency';

import style from "./style";
import api from "../../server";

export default function Product({ route, navigation }) {

    const { product } = route.params;

    const [ chooseWithdrawal, setChooseWithdrawal ] = useState("");

    const [ cep, setCEP ] = useState("");

    const [ sellers , foundSellers ] = useState([]);

    useEffect( () => {
        console.log("TELA DE PRODUTO")
        console.log(product)
        console.log("---------------------------= TELA DE PRODUTO =----------------------------")

        // var DataToSend = {
        //     'items': [{
        //         'id': id,
        //         'quantity': 1,
        //         'vendedor': '1'
        //     }],
        //     'postalCode': zipCode,
        //     'country': 'ARG',
        // };
        // const { data } = await api.get("/catalog_system/pvt/seller/list");

        // api.get("/checkout/pub/orderForms/simulation/?sc=1");
            
        //     $.ajax({
        //         'type': 'POST',
        //         'dataType': 'json',
        //         'contentType': 'application/json',
        //         'url': '/api/checkout/pub/orderForms/simulation/?sc=1',
        //         'data': JSON.stringify(DataToSend),
        //         'success': function(ResponseData) {
        //            `//CUSTOM` function
        //             createTable(ResponseData)
        //         },
        //         'error': function(AjaxError) {
        //             console.log('Error')
        //         }
        //     });
        //     } `
        console.log("SELLLERS")
        
        console.log("=--------------- SELLLERS --------------------=")
    }, []);

    async function GetCEP() {

        console.log("GEP CEPPP")

        const items = [];

        const postalCode = product.items[0].itemId

        const { data } = await api.get("/catalog_system/pvt/seller/list");

        data.map( (seller, i) => {
            
            items.push({
                id: postalCode,
                quantity: 1,
                seller: seller.SellerId
            })

        });     

        const simulate = await api.post("/checkout/pub/orderForms/simulation/?sc=1", {
            body: {
                items,
                postalCode,
                "country": "BRA"    
            }
        });

        console.log("simulate");

        console.log(simulate.data);

        // if (simulate.data ) {

        // }

        simulate.data.items.map( (e, i) => {
            console.log(e)
        });  

        // slas
        console.log("---------------------= simulate =----------")
        console.log(items)
        
        console.log("=---------------=")
        console.log(cep)

        console.log("=----------------- GEP CEPPP -----------------------------=")

        // const data =  {
        //     "items": [
        //         {
        //             "id": product.productId,
        //             "quantity": 1,
        //             "seller": "1"
        //         }
        //     ],
        //     "postalCode": "06515053",
        //     "country": "ARG"
        // }

        // const response = api.post("/checkout/pub/orderForms/simulation/?sc=1");

        // console.log(response)

    }


    const Price = product.items[0].sellers[0].commertialOffer.Price;
    const ListPrice = product.items[0].sellers[0].commertialOffer.ListPrice;
 
    return(

        <View style={{ flex: 1 }}>

            <Header />

            <ScrollView style={ style.container } >

                <View> 

                    <View style={{ position: 'relative', paddingTop: 29 }} >  

                        <TouchableOpacity style={{ marginLeft: 20, marginBottom: 20 }} >

                            <Text style={{ backgroundColor: '#009636', padding: 5 , borderRadius: 20, maxWidth: 108, textAlign: 'center', fontSize: 10 , lineHeight: 12, fontWeight: '700', color: '#fff' }} >{product['Condição']}</Text>

                        </TouchableOpacity>

                        <TouchableOpacity>
                            
                        </TouchableOpacity>

                        <View style={{ ...style.slickBannerMain, elevation: 4 }} >
    
                            <Slick 
                                dot={
                                    <View
                                    style={{
                                        backgroundColor: '#fff',
                                        width: 10,
                                        height: 10,
                                        borderRadius: 8,
                                        marginLeft: 5,
                                        marginRight: 5,
                                        marginTop: 15,
                                        borderColor: '#C4C4C4',
                                        borderWidth: 1
                                        
                                    }}
                                />
                                }

                                activeDot={
                                    <View
                                    style={{
                                        backgroundColor: '#C4C4C4',
                                        width: 10,
                                        height: 10,
                                        borderRadius: 12,
                                        marginLeft: 4,
                                        marginRight: 4,
                                        marginTop: 15,
                                    }}
                                    />
                                }
                            >
                            {
                                product.items[0].images.map( (e,i) => ( <Image  style={ style.slickBannerMainItem } resizeMode='contain' source={{ uri: e.imageUrl }} /> ) )
                            }
                            
                            </Slick>
                            
                        </View>
                        
                    </View>

                    <View style={{ paddingBottom: 30, marginLeft: 20, marginRight: 20, borderBottomWidth: 1, borderBottomColor: '#C4C4C4', marginTop: 20 }} >

                        <Text style={{ fontWeight: '500', fontSize: 16, lineHeight: 16, marginBottom: 11,color: "#969696", textTransform: 'uppercase' }} >{ product.brand }</Text>

                        <Text style={{ fontWeight: '400', fontSize: 16, lineHeight: 16, color: "#434343", textTransform: 'uppercase' }} >{ product.productName } </Text>

                        {
                            ListPrice != Price 
                            ? (<Text>{ `R$ ${currency(ListPrice)}` }</Text>)
                            : null
                        }

                        <Text style={{  color: "#AACE37", fontSize: 24, fontWeight: '700', lineHeight: 24, marginTop: 7 }} >{ `R$ ${currency(Price)}` }</Text>

                    </View>

                    <View style={{ paddingBottom: 30, paddingTop: 30, marginLeft: 20, marginRight: 20, borderBottomWidth: 1, borderBottomColor: '#C4C4C4', justifyContent: 'center', alignItems: 'center' }} >

                        <Text style={{ fontWeight: '700', fontSize: 14, lineHeight: 14, color: '#000', marginBottom: 10 }} >COR</Text>

                        <Text style={{ fontWeight: '700', fontSize: 14, lineHeight: 14, color: '#000', marginBottom: 10 }} >TAMANHO</Text>

                    </View>

                    <View>

                        <TouchableOpacity>

                            <Text>Frete inteligente</Text>

                        </TouchableOpacity>

                        <Text>Frete inteligente</Text>

                    </View>

                    <View style={{ paddingBottom: 10, paddingTop: 30, marginLeft: 20, marginRight: 20 }} >

                        <TouchableOpacity>
                            <Text>FRETE INTELIGENTE</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginTop: 16 }} > 
                            <Text style={ style.btnBuy } >ADICIONAR A SACOLA</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{ paddingBottom: 30, paddingTop: 30, marginLeft: 20, marginRight: 20, borderBottomWidth: 1, borderBottomColor: '#C4C4C4', flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', paddingLeft: 10, paddingRight: 10 }} >

                        <View>
                            <Text style={{ fontSize: 15, lineHeight: 16, fontWeight: "500", color: '#000' }} >EXCLUSIVO</Text>
                            <Text style={{ fontSize: 25, lineHeight: 25, fontWeight: "700", color: '#000' }} >PRIME</Text>
                        </View>

                        <View>
                            <Text style={{ fontSize: 15, lineHeight: 15 }} >EXPIRA EM: </Text>
                        </View>

                        <View>
                            <Text style={{ fontSize: 22, fontWeight: '700', color: '#000' }} >
                                03 <Text style={{ color: '#969696' }} >:</Text> 15 <Text style={{ color: '#969696' }} >:</Text> 26 </Text>
                        </View>

                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 30, paddingTop: 30, marginLeft: 20, marginRight: 20, borderBottomWidth: 1, borderBottomColor: '#C4C4C4' }}>
                        <Image 
                            source={require("../../assets/png/informacoes-de-compras.png")} 
                            resizeMode={"contain"}
                        />
                    </View>

                    <View style={{ paddingBottom: 30, paddingTop: 30, marginLeft: 20, marginRight: 20, borderBottomWidth: 1, borderBottomColor: '#C4C4C4', justifyContent: 'center', alignItems: 'center' }} >

                        <Text style={{ fontSize: 14, lineHeight: 16, color: '#969696', fontWeight: '300' }} >VENDIDO E ENTREGUE POR</Text>

                        <Text style={{ fontSize: 16, lineHeight: 19, color: '#969696', fontWeight: '700', color: '#000' }} >Arena Baby Loja Tatuapé</Text>

                    </View>
                    

                    <View style={{ paddingBottom: 30, paddingTop: 30, marginLeft: 20, marginRight: 20, flexDirection: 'row', justifyContent: 'space-between' }} >

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} >

                            <RadioButton 
                                value="first"
                                color="#AACE37"
                                onPress={ () => setChooseWithdrawal() }
                                status={ chooseWithdrawal ? 'checked' : 'unchecked' }
                            />

                            <Text style={{ fontSize: 14, lineHeight: 17, color: '#636262' }} >Retirada Na Loja</Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} >

                            <RadioButton 
                                value="first"
                                color="#AACE37"
                                onPress={ () => setChooseWithdrawal() }
                                status={ chooseWithdrawal ? 'checked' : 'unchecked' }
                            />

                            <Text style={{ fontSize: 14, lineHeight: 17, color: '#636262' }} >Retirada Na Loja</Text>

                        </TouchableOpacity>

                    </View>


                    <View style={{ paddingBottom: 30, paddingTop: 10, marginLeft: 20, marginRight: 20, justifyContent: 'center', alignItems: "center" }} >

                        <Text style={{ marginBottom : 20 , fontWeight: "700", fontSize: 14, color: '#000' }}>CALCULAR FRETE</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: "center" }} >

                            <TextInput 
                                placeholder={"08280-001"}
                                style={{ borderColor: "#ddd", borderWidth: 1, borderRadius: 5, marginRight: 10, paddingLeft: 30, paddingRight: 60 }}
                                onChangeText={text => setCEP(text)}
                            />

                            <TouchableOpacity 
                                style={{ backgroundColor: '#AACE37', padding: 18, borderRadius: 5, paddingLeft: 24, paddingRight: 24 }}
                                onPress={ () => GetCEP() }
                            >
                                
                                <Text style={{ fontWeight: '700', fontSize: 18, lineHeight: 18, color: '#fff' }} >OK</Text>

                            </TouchableOpacity>

                        </View>
                        
                    </View>

                    <View style={{  justifyContent: 'center' , alignItems: 'center', paddingBottom: 40, borderBottomColor: "#C4C4C4" }} >

                        <View style={{ position: "relative", borderColor: '#E95810', borderWidth: 1, borderRadius: 15, padding: 15, marginBottom: 16 , maxWidth: 300 }} >

                            <Text style={{ position: 'absolute', top: -10, left: 10, backgroundColor: '#E95810', color: '#fff', fontSize: 11, lineHeight: 13, padding: 6, borderRadius: 4 }} >EM DESTAQUE</Text>

                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} >                            

                                <RadioButton 
                                    value="first"
                                    color="#E95810"
                                    onPress={ () => setChooseWithdrawal() }
                                    status={ chooseWithdrawal ? 'checked' : 'unchecked' }
                                />

                                <Text 
                                    style={{ fontSize: 14, lineHeight: 16, color: "#969696", marginRight: 20 }} 
                                >Arena Baby Mauá</Text>

                                <Text 
                                    style={{ fontSize: 19, lineHeight: 22, fontWeight: '700', color: "#E95810", paddingLeft: 20, borderLeftColor: '#C4C4C4', borderLeftWidth: 1 }} 
                                >Grátis</Text>

                            </TouchableOpacity>

                        </View>

                        <View style={{ position: "relative" , borderColor: "#969696", borderWidth: 1, borderRadius: 15, padding: 15, marginBottom: 16, maxWidth: 300 }} >

                            {/* <Text style={{ position: 'absolute', top: -10, backgroundColor: '#E95810', color: '#fff', fontSize: 11, lineHeight: 13, padding: 6, borderRadius: 4 }} >EM DESTAQUE</Text> */}

                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} >                            

                                <RadioButton 
                                    value="first"
                                    color="#E95810"
                                    onPress={ () => setChooseWithdrawal() }
                                    status={ chooseWithdrawal ? 'checked' : 'unchecked' }
                                />

                                <Text style={{ fontSize: 14, lineHeight: 16, color: "#969696", marginRight: 20 }} >Arena Baby Mauá</Text>

                                <Text style={{ fontSize: 19, lineHeight: 22, fontWeight: '700', color: "#969696", paddingLeft: 20, borderLeftColor: '#C4C4C4', borderLeftWidth: 1 }} >Grátis</Text>

                            </TouchableOpacity>
                            
                        </View>
                        
                    </View>

                </View>

                <View>

                    <Text 
                        style={{ borderTopColor: "#C4C4C4", borderTopWidth: 1, paddingTop: 48, fontWeight: '700', fontSize: 16, lineHeight: 19, textAlign: 'center', color: "#000", marginLeft: 20, marginRight: 20  }} >VEJA MAIS PRODUTOS DA MESMA LOJA</Text>

                    <Text style={{ color: "#AACE37", textDecorationLine: 'underline', fontWeight: '300', textAlign: 'center', marginTop: 8 }} >Ver Todos</Text>

                    <View>

                        <Shelf />

                    </View>

                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }} >

                    <TouchableOpacity>

                        <Text 
                            style={{ fontSize: 16, lineHeight: 19, fontWeight: '300', textAlign: 'center', marginTop: 64, marginBottom: 32, paddingBottom: 12, borderBottomColor: '#AACE37', borderBottomWidth: 1, maxWidth: 190 }} 
                        >DESCRIÇÃO DO PRODUTO</Text>

                    </TouchableOpacity>
                    

                    <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 80 }} >

                        <Text>
                            
                            { product.metaTagDescription }
                            
                        </Text>

                    </View>

                </View>
                
        
        
            </ScrollView>

        </View>
     
    );
}