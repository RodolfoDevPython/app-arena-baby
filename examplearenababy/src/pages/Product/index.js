import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { RadioButton  } from "react-native-paper";
import Slick from 'react-native-slick';

import Shelf from "../../Components/Shelf/ShelfCollection";

import Header from "../../Components/MenuNavigation/Header";

import currency from '../../helpers/float-to-currency';

import { useDispatch } from "react-redux";

import style from "./style";
import api from "../../server";



export default function Product({ route, navigation }) {

    const { product } = route.params;

    const dispatch = useDispatch();

    // const navigation = useNavigation();

    const [ chooseWithdrawal, setChooseWithdrawal ] = useState("");

    const [ cep, setCEP ] = useState("");

    const [ sellers, foundSellers ] = useState([]);

    const [ seller, setSellers ] = useState([]);

    const [ loading , setLoading ] = useState(false);

    const [ infoBuy, setInfoBuy ] = useState({});

    const [ activeDesc, setActiveDesc ] = useState();

    const [ sellerVendidoEentregue, SetSellerVendidoEentregue ] = useState();

    const Price = product.items[0].sellers[0].commertialOffer.Price;

    const ListPrice = product.items[0].sellers[0].commertialOffer.ListPrice;

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

    function handleSellers({ logisticsInfo, sellerName }){

        console.log("logisticsInfo")
        console.log(logisticsInfo)

        //deixar a variavel de seller já populada
        setSellers(logisticsInfo[0].slas.filter( (item) => item.price == 0 )[0].id )

        // logisticsInfo.filter( (item) => item )

        logisticsInfo.map( (e, i) => {
                   
            foundSellers({
                "Casa": { info: e.slas.filter( (item) => item.price != 0 ), sellerName },
                "Loja": { info: e.slas.filter( (item) => item.price == 0 ), sellerName },                
            });            
    
        });

    }

    useEffect( () => {
        console.log("Flegado")

        console.log(chooseWithdrawal)
        console.log(sellers['Loja'])    

        console.log("--------------= Flegado =---------------");
    }, [ sellers ]);

    useEffect( () => {

    }, [ ]) 

    async function GetCEP() {


        setLoading(true);
        console.log("GEP CEPPP")

        const items = [];

        const sku = product.items[0].itemId

        const { data } = await api.get("/catalog_system/pvt/seller/list");

        data.map( (seller, i) => {
            
            items.push({
                id: sku,
                quantity: 1,
                seller: seller.SellerId
            })

        });     

        const simulate = await api.post("/checkout/pub/orderForms/simulation/?sc=1", {
            items,
            "postalCode": "06515053",
            "country": "BRA"    
        });

        console.log("simulate");        

        simulate.data.items.map( (e, i) => {

            if (e.availability == "available" ) {


                //para flegar o campo de vendido e entregue por
                if (i == 0) {
                    SetSellerVendidoEentregue(e.seller)
                }

                //Vai pegar as respectivas informações dos sellers no objeto de logisticsInfo
                const infoSeller = simulate.data.logisticsInfo.filter( item => item.itemIndex == i );

                const sellerName = e.seller;

                console.log(infoSeller)

                handleSellers({ logisticsInfo: infoSeller , sellerName });

            }

        });

        // slas
        console.log("---------------------= simulate =----------")
        console.log(items)
        console.log("=----------------- GEP CEPPP -----------------------------=")

    }

    function addToCart() {
        // setInfoBuy
        // sellers
        // product
        // infoBuy
        console.log("ADD TO CART")
        console.log(seller)
        console.log(product)
        // setSellers()

        switch (chooseWithdrawal) {

            case 'Loja':
                console.log("aquiiiiiiii Loja")
                dispatch({ type: 'ADD_TO_CART', item : { 'seller': sellers['Loja'], product } });

                break;

            case 'Casa':
                console.log("aquiiiiiiii Casa")
                dispatch({ type: 'ADD_TO_CART', item : { 'seller': sellers['Casa'], product } });

                break;
        
            default:
                break;

        }

        navigation.navigate('MiniCart');

        console.log("---------------= ADD TO CART =--------------")


    }
 
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

                    {/* <View style={{ paddingBottom: 30, paddingTop: 30, marginLeft: 20, marginRight: 20, borderBottomWidth: 1, borderBottomColor: '#C4C4C4', justifyContent: 'center', alignItems: 'center' }} >

                        <Text style={{ fontWeight: '700', fontSize: 14, lineHeight: 14, color: '#000', marginBottom: 10 }} >COR</Text>

                        <Text style={{ fontWeight: '700', fontSize: 14, lineHeight: 14, color: '#000', marginBottom: 10 }} >TAMANHO</Text>

                    </View> */}

                    <View style={{ paddingTop: 30, marginLeft: 20, marginRight: 20 }} >

                        <TouchableOpacity>

                            <Text>FRETE INTELIGENTE</Text>

                        </TouchableOpacity>

                    </View>

                    <View style={{ paddingBottom: 30, paddingTop: 30, marginTop: 30, marginLeft: 20, marginRight: 20, flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#C4C4C4' }} >

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} >

                            <RadioButton 
                                value="first"
                                color="#AACE37"
                                onPress={ () => setChooseWithdrawal("Loja") }
                                status={ chooseWithdrawal == "Loja" ? 'checked' : 'unchecked' }
                            />

                            <Text style={{ fontSize: 14, lineHeight: 17, color: '#636262' }} >Retirada Na Loja</Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} >

                            <RadioButton 
                                value="first"
                                color="#AACE37"
                                onPress={ () => setChooseWithdrawal("Casa") }
                                status={ chooseWithdrawal == "Casa" ? 'checked' : 'unchecked' }
                            />

                            <Text style={{ fontSize: 14, lineHeight: 17, color: '#636262' }} >Receber Em Casa</Text>

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

                    {

                        sellers == "" && loading
                        ? ( <ActivityIndicator size="large" color="#AACE37" style={{ marginBottom: 35 }} /> )
                        :(

                            <View style={{  justifyContent: 'center' , alignItems: 'center', paddingBottom: 40, borderBottomColor: "#C4C4C4" }} >

                            {/* <View style={{ position: "relative", borderColor: '#E95810', borderWidth: 1, borderRadius: 15, padding: 15, marginBottom: 16 , maxWidth: 300 }} >

                                <Text style={{ position: 'absolute', top: -10, left: 10, backgroundColor: '#E95810', color: '#fff', fontSize: 11, lineHeight: 13, padding: 6, borderRadius: 4 }} >EM DESTAQUE</Text>

                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} >                            

                                    <RadioButton 
                                        value="first"
                                        color="#E95810"
                                        // onPress={ () => setChooseWithdrawal() }
                                        // status={ chooseWithrawal ? 'checked' : 'unchecked' }
                                    />

                                    <Text 
                                        style={{ fontSize: 14, lineHeight: 16, color: "#969696", marginRight: 20 }} 
                                    >Arena Baby Mauá</Text>

                                    <Text 
                                        style={{ fontSize: 19, lineHeight: 22, fontWeight: '700', color: "#E95810", paddingLeft: 20, borderLeftColor: '#C4C4C4', borderLeftWidth: 1 }} 
                                    >Grátis</Text>

                                </TouchableOpacity>

                            </View> */}

                            {     
                                // sellers 

                                chooseWithdrawal == "Casa" && sellers != "" ?
                                (

                                    sellers['Casa'].info.map( (e, i) => (

                                        
                                        <View key={i} style={{ position: "relative" , borderColor: "#969696", borderWidth: 1, borderRadius: 15, padding: 15, marginBottom: 16, maxWidth: 300 }} >

                                            <TouchableOpacity 
                                                style={{ flexDirection: 'row', alignItems: 'center' }} 
                                                onPress={ () => setSellers(e.id) } 
                                            >                                

                                                <RadioButton 
                                                    value="first"
                                                    color="#E95810"
                                                    onPress={ () => setChooseWithdrawal() }
                                                    status={ chooseWithdrawal ? 'checked' : 'unchecked' }
                                                />

                                                <Text style={{ fontSize: 14, lineHeight: 16, color: "#969696", marginRight: 20 }} >
                                                    { e.pickupStoreInfo.address ? e.pickupStoreInfo.address.city : `${(e.shippingEstimate).replace("bd", "")} Dias` }
                                                </Text>

                                                <Text style={{ fontSize: 19, lineHeight: 22, fontWeight: '700', color: "#969696", paddingLeft: 20, borderLeftColor: '#C4C4C4', borderLeftWidth: 1 }} >
                                                    { e.price == 0 ? "Grátis": `R$ ${(e.price / 100).toFixed(2).replace('.', ',')}` }
                                                </Text>

                                            </TouchableOpacity>    

                                        </View>

                                        )
                                    )                                

                                ) : (<></>)

                            }

                            {

                                chooseWithdrawal == "Loja" && sellers != "" ?
                                (

                                    sellers['Loja'].info.map( (e, i) => (

                                        <View key={i} style={{ position: "relative" , borderColor: "#969696", borderWidth: 1, borderRadius: 15, padding: 15, marginBottom: 16, maxWidth: 300 }} >

                                            <TouchableOpacity 
                                                style={{ flexDirection: 'row', alignItems: 'center' }} 
                                                onPress={ () => setSellers(e.id) } 
                                            >                            

                                                <RadioButton 
                                                    value="first"
                                                    color="#E95810"
                                                    onPress={ () => setChooseWithdrawal() }
                                                    status={ chooseWithdrawal || i == 0 ? 'checked' : 'unchecked' }
                                                />

                                                <Text style={{ fontSize: 14, lineHeight: 16, color: "#969696", marginRight: 20 }} >
                                                    Arena baby {e.pickupStoreInfo.address.city}
                                                </Text>

                                                <Text style={{ fontSize: 19, lineHeight: 22, fontWeight: '700', color: "#969696", paddingLeft: 20, borderLeftColor: '#C4C4C4', borderLeftWidth: 1 }} >
                                                    { e.price == 0 ? "Grátis": `R$ ${currency(e.price)}` }
                                                </Text>

                                            </TouchableOpacity>    

                                        </View>

                                        )
                                    )                                

                                ) : (<></>)

                            }
                        
                        </View>

                        )

                    }

                    <View style={{ paddingBottom: 0, paddingTop: 0, marginLeft: 20, borderBottomWidth: 1, borderBottomColor: '#C4C4C4', flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', paddingLeft: 10, paddingRight: 10 }} >
                    {
    
                    product["Countdown"] 
                    ? (
                    
                        <>

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
                            
                        </>

                    ) 
                    : null
                    
                    }

                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 30, paddingTop: 30, marginLeft: 20, marginRight: 20, borderBottomWidth: 1, borderBottomColor: '#C4C4C4' }}>

                        <Image 
                            source={require("../../assets/png/informacoes-de-compras.png")} 
                            resizeMode={"contain"}
                        />

                    </View>

                    <View style={{ paddingBottom: 30, paddingTop: 30, marginLeft: 20, marginRight: 20, borderBottomWidth: 1, borderBottomColor: '#C4C4C4', justifyContent: 'center', alignItems: 'center' }} >

                        <Text style={{ fontSize: 14, lineHeight: 16, color: '#969696', fontWeight: '300' }} >VENDIDO E ENTREGUE POR</Text>

                        <Text style={{ fontSize: 16, lineHeight: 22, color: '#434343', fontWeight: '700', color: '#000' }} >{ product.items[0].sellers[0].sellerName }</Text>

                    </View>  

                    <View style={{ paddingBottom: 50, paddingTop: 20, marginLeft: 20, marginRight: 20 }} >

                        <TouchableOpacity 
                            style={{ marginTop: 16 }} 
                            onPress={ addToCart }
                        > 

                            <Text style={ style.btnBuy } >ADICIONAR A SACOLA</Text>
                            
                        </TouchableOpacity>

                    </View>

                </View>

                <View>

                    <Text 
                        style={{ borderTopColor: "#C4C4C4", borderTopWidth: 1, color: '#434343', paddingTop: 48, fontWeight: '700', fontSize: 16, lineHeight: 19, textAlign: 'center' , marginLeft: 20, marginRight: 20 }} 
                    >VEJA MAIS PRODUTOS DA MESMA LOJA</Text>

                    <Text 
                        style={{ color: "#AACE37", textDecorationLine: 'underline', fontWeight: '300', textAlign: 'center', marginTop: 8 }} 
                    >Ver Todos</Text>

                    <View>

                        <Shelf />

                    </View>

                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }} >

                    <TouchableOpacity 
                        onPress={ () => activeDesc ? setActiveDesc(false) : setActiveDesc(true)  }
                    >

                        <Text 
                            style={{ fontSize: 16, lineHeight: 19, fontWeight: '300', textAlign: 'center', marginTop: 64, marginBottom: 32, paddingBottom: 5, borderBottomColor: '#AACE37', borderBottomWidth: 2, maxWidth: 190, color: '#737373' }} 
                        >DESCRIÇÃO DO PRODUTO</Text>

                    </TouchableOpacity>

                    {
                        activeDesc 
                        ? (

                            <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 80 }} >

                                <Text>
                                    
                                    { product.metaTagDescription }
                                    
                                </Text>

                            </View>

                        ) 
                        : null

                    }

                </View>
                
        
        
            </ScrollView>

        </View>
     
    );
}