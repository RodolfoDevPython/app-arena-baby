import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { SvgXml } from "react-native-svg";

import currency from '../../../helpers/float-to-currency';

import style from "./style";

import api from "../../../server";

import icon_desconto from "../../../assets/png/icon_desconto.png";

import Loading from "../../skeleton/ShelfCollection";


export default function ResultCategory({ colecao = 139 }) {

    const [ items, SetItems] = useState([]);

    useEffect( () => {

        async function fetchData() {

            const response = await api.get(`/catalog_system/pub/products/search?fq=H:${colecao}`);

            SetItems(response.data)

        }

        fetchData();

    }, []);

    function handleAddMiniCart(item) {
        console.log(item);
    }

    return (

        <View style={ style.container } >

            { 
                !items.length ? < Loading /> : (

                <FlatList 
                    data={ items }
                    horizontal={false}
                    numColumns={2}
                    keyExtractor={ element => element.items[0].itemId }
                    renderItem={ ({ item }) => { 

                        console.log(item)
                            
                            let { Price, ListPrice } = item.items[0].sellers[0].commertialOffer

                            let imagem = item.items[0].images[0].imageUrl;

                            return (
                                <>
                                    <View style={ style.item } >

                                        <View style={ style.container_img }>

                                            {/* <TouchableOpacity>

                                                <View style={ style.desconto }>
                                                    <Image 
                                                        style={{ height: 15 }}
                                                        source={ icon_desconto } 
                                                        alt='Icone desconto' 
                                                    />
                                                </View>

                                            </TouchableOpacity>

                                            <TouchableOpacity>

                                            </TouchableOpacity> */}

                                            <Image 
                                                resizeMode="contain"
                                                style={{  height: 300 }}
                                                source={{ uri: imagem }} 
                                                alt='Imagem de Música' 
                                            />

                                            <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row' }}>

                                                <Text style={ style.condicao }> { item['Condição'] } </Text>

                                            </View>

                                        </View>

                                        <View>
                                            
                                            <Text style={ style.brand } > { item['brand'] } </Text>

                                            <Text style={ style.name } numberOfLines = { 2 } > { item['productName'] } </Text>

                                            <Text style={ style.price } > <Text style={{ ...style.price, fontSize: 15 }} >R$</Text>{ currency(Price) } </Text>

                                        </View>

                                        <TouchableOpacity 
                                            onPress={ () => handleAddMiniCart('') }
                                            style={ style.box_buy }    
                                        >
                                            <Text style={ style.text_buy } >COMPRAR</Text>
                                        </TouchableOpacity>
                                    </View>

                                </>
                            );

                        } 
                    }
                />

                )
            }

        </View>

    );
}