import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { SvgXml } from "react-native-svg";

import currency from '../../../helpers/float-to-currency';

import style from "./style";

import api from "../../../server";

import icon_desconto from "../../../assets/png/icon_desconto.png";

import Loading from "../../skeleton/ShelfCollection";


export default function Shelf({ colecao = 139 }) {

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
                    horizontal={ true }
                    keyExtractor={ element => element.items[0].itemId }
                    showsHorizontalScrollIndicator={ true }
                    renderItem={ ({ item }) => { 
                            
                            let { Price, ListPrice } = item.items[0].sellers[0].commertialOffer

                            let imagem = item.items[0].images[0].imageUrl;

                            return (
                                <>
                                    <View style={ style.item } >

                                        <View style={ style.container_img }>

                                            <Image 
                                                resizeMode="contain"
                                                style={{  height: 300 }}
                                                source={{ uri: imagem }} 
                                                alt='Imagem de Música' 
                                            />

                                            <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row' }}>

                                                <View style={ style.desconto }>
                                                    <Image 
                                                        style={{ height: 15 }}
                                                        source={ icon_desconto } 
                                                        alt='Icone desconto' 
                                                    />
                                                </View>

                                                <Text style={ style.condicao }> { item['Condição'] } </Text>

                                            </View>

                                        </View>

                                        <View>
                                            
                                            <Text style={ style.brand } > { item['brand'] } </Text>

                                            <Text style={ style.name } > { item['productName'] } </Text>

                                            <Text style={ style.price } > { currency(Price) } </Text>

                                        </View>

                                        <TouchableOpacity 
                                            onPress={ () => handleAddMiniCart('') }
                                            style={ style.box_buy }    
                                        >
                                            <Text style={ style.text_buy } >ADICIONAR A SACOLA</Text>
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