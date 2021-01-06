import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Image, ActivityIndicator } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import { SvgXml } from "react-native-svg";

import currency from '../../../helpers/float-to-currency';

import style from "./style";

import api from "../../../server";

import icon_desconto from "../../../assets/png/icon_desconto.png";

import Loading from "../../skeleton/ShelfCollection";
import { useSelector } from "react-redux";


export default function ResultCategory({ busca = 'fq=H:139' }) {

    console.log('BUSCAAA')
    console.log(busca)
    busca = 'fq=C:3'
    const [ items, SetItems] = useState([]);

    const [ rangeResult, setRangeResult ] = useState({ from: 0, to: 9 });

    const [ refreshing, setRefreshing ] = useState(false);

    const [ loading, setLoading ] = useState(false)

    const filters = useSelector( state => state.resultCategory );

    async function fetchData(shoudRefresh = false) {

        console.log('component Result')

        let urlFilter = '';

        if (shoudRefresh) {
            setRangeResult({ from: 0, to: 9 });
        }

        setLoading(true)

        if (filters.length > 0) {
            filters.map( (e,i) => {
                
                if (i == 0) {
                    urlFilter += `?fq=specificationFilter_${e.FieldId}:${e.FieldValueId}`;
                } else {
                    urlFilter += `&fq=specificationFilter_${e.FieldId}:${e.FieldValueId}`;
                }
                
            })
        }

        console.log("=== filter ====")
        console.log(filters)
        console.log(urlFilter)
        console.log("=--------------=")

        const response = await api.get(`/catalog_system/pub/products/search?${busca}${urlFilter}&_from=${rangeResult.from}&_to=${rangeResult.to}`);

        SetItems(shoudRefresh || urlFilter != "" ? response.data : [ ...items, ...response.data ])

        setLoading(false);


    }

    useEffect( () => {

        fetchData();        

    }, [ filters ]);

    function handleAddMiniCart(item) {
        console.log(item);
    }

    async function moreItemsResult() {

        if (filters.length > 0) {
            setRangeResult({ from: 0, to: 40 }); // vai desabilitar a paginação quando ele fazer o filtro
        } else {
            setRangeResult({ from: rangeResult.from + 10, to: rangeResult.to + 10  });
        }
        
        await fetchData();
        
    }

    async function refreshList() {
        setRefreshing(true);
        ///1° Param -> vamos carregar os primeiros conteúdos por isso passei o 1 como parâmetro 
        ///2° Param -> passamos true para no parametro para ativar a flag de não duplicar os item no flatlist
        await fetchData(true);
        setRefreshing(false);
    }

    return (

        <View style={ style.container } >

            { 
                !items.length ? < Loading /> : (

                <FlatList 
                    style={ style.listResult }
                    data={ items }
                    horizontal={false}
                    numColumns={2}
                    keyExtractor={ (element, index) => index }
                    onEndReached={() => moreItemsResult()}
                    onEndReachedThreshold={0.1} //-> para colocar uma porcentagem no scroll para chamar o onEndReached(Onde vai ser disparado uma function)
                    onRefresh={refreshList} //Propriedade responsavel por rodar uma function quando o usuario tentar usar o refresh nativo
                    refreshing={refreshing} //Propriedade responsavel por verificar se a flatlist está em refresh ou não retorna true or false 
                    ListFooterComponent={loading && <ActivityIndicator /> }
                    renderItem={ ({ item }) => { 

                        //console.log(item.categoriesIds)
                            
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
                                                style={ style.img_product }
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