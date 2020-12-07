import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import api from "../../server";

export default function Shelf() {

    const [ items, SetItems] = useState([]);

    useEffect( () => {

        console.clear()
        async function fetchData() {

            const response = await api.get('/catalog_system/pub/products/search?fq=H:139');

            SetItems(response.data)

        }

        fetchData();

    }, []);

    function handleAddMiniCart(item) {
        console.log(item);
    }

    return (
        <View>
            <FlatList                
                data={items}
                horizontal={false}
                keyExtractor={ element => element.items[0].itemId }
                showsHorizontalScrollIndicator={true}
                renderItem={ ( item ) => { 
                        //console.log(item.item);
                        let nome =  item.item['productName'];
                        let condicao =  item.item['Condição'];
                        let cor =  item.item['Cor'];
                        let imagem = item.item.items[0].images[0].imageUrl;
                        let sku = item.item.items[0].itemId;

                        let obj = {
                            sku,
                            imagem,
                            cor,
                            condicao,
                            nome
                        }

                        return (
                            <View>

                                <Text>Nome: { nome } </Text>
                                <Text>Condição: { condicao } </Text>
                                <Text>Cor: { cor } </Text>
                                
                                <Image 
                                    resizeMode="contain"
                                    style={{  height: 300 }}
                                    source={{ uri: imagem }} 
                                    alt='Imagem de Música' 
                                />
                                <TouchableOpacity onPress={ () => handleAddMiniCart(obj) }>
                                    <Text>Add No Cart</Text>
                                </TouchableOpacity>
                            </View>

                        );

                    } 
                }
            />
        </View>
    );
}