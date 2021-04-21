import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Image, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import api from "../../../server";
import style from "./style";
import Loading from "../../skeleton/ResultProduct";
import currency from '../../../helpers/float-to-currency';
import IconPrime from "../../../assets/svg/icon-prime";
import ArrowDiscount from "../../../assets/svg/arrow-discount";

export default function ResultCategory() {


    const navigation = useNavigation();

    const { category, search } = useSelector( state => state.menuCategoryMain );

    const [ busca, setBusca ] = useState();

    //const busca = `fq=C:${category.id}${search}`;

    const [ items, SetItems] = useState([]);

    const [ rangeResult, setRangeResult ] = useState({ from: 0, to: 9 });

    const [ refreshing, setRefreshing ] = useState(false);

    const [ loading, setLoading ] = useState(false)

    const filters = useSelector( state => state.filterCategory );

    const orderBy = useSelector( state => state.orderByCategory );

    async function fetchData(shoudRefresh = false) {

        // console.log('component Result')

        let urlFilter = '';

        if (shoudRefresh) {
            setRangeResult({ from: 0, to: 9 });
        }

        setLoading(true)

        if (filters.length > 0) {

            /// array que veio do reducer FILTER
            filters.map( (e,i) => {
                
                // if (i == 0) {
                //     urlFilter += `?fq=specificationFilter_${e.FieldId}:${e.FieldValueId}`;
                // } else {
                urlFilter += `&fq=specificationFilter_${e.FieldId}:${e.FieldValueId}`;
                // }   
                
            });

            //caso seja usado o filtro e o ordernar juntos
            if (orderBy.script) {
                urlFilter += `${orderBy.script.replace("?", "&")}`
            }

        } else if(orderBy.script) {
            urlFilter += `${orderBy.script}`/// objeto que veio do reducer ORDER_BY
        }

        console.log("=== filter ====")
        console.log(filters)
        console.log(urlFilter)
        console.log(urlFilter.indexOf("?"));

        // /catalog_system/pub/products/search?fq=C:3&_from=0&_to=9
        console.log(`/catalog_system/pub/products/search?${busca}${urlFilter}&_from=${rangeResult.from}&_to=${rangeResult.to}`)
        console.log("=--------------=")

        const response = await api.get(`/catalog_system/pub/products/search?${busca}${urlFilter}&_from=${rangeResult.from}&_to=${rangeResult.to}`);    

        //1 validação -> ver se for acionado o refresh 
        
        if (response.data.length > 0) {
            //3 validação -> ver se o filtro que está vindo do reducer é o de order by
            SetItems(shoudRefresh ? response.data : [ ...items, ...response.data  ])    
            
        } else {

            // navigation.navigate('SearchEmpty');

        }
        
        setLoading(false);
        

        // if (urlFilter.indexOf("?") != -1) {
        //     //refreshList()
        // }

        

    }

    // useEffect( () => {

    //     Clear();

    //     if (category) {
    //         search ? setBusca(`fq=C:${category.id}${search}`) : setBusca(`fq=C:${category.id}`);
    //         // setBusca(`fq=C:${category.id}${search}`)
    //         console.log("COMPONENTE DE RESULTADO")
            
    //         console.log(search)
    //         console.log("----------------= COMPONENTE DE RESULTADO =------------")
    //     }
        
    //     // const busca = ;
    // }, [ category ])

    useEffect( () => {

        Clear();
        
        if (category) { 
            search ? setBusca(`fq=C:${category.id}${search}`) : setBusca(`fq=C:${category.id}`);

            console.log("COMPONENTE DE RESULTADO")
            
            console.log(search)
            console.log("----------------= COMPONENTE DE RESULTADO =------------")
            // const busca = ;

            Clear();

        } else if (!category) {

            console.log("não tem categoria selecionada")
            
        }

    }, [ search ])

    useEffect( () => {

        // if (orderBy.script || filters && orderBy.script || filters == '' ){
        //     console.log("aquiiiii no if")

        Clear();

        if (filters) {
            fetchData(true);        
        }        
        // }
        // } else {
        //     console.log("aquiiiii no else")
        //     fetchData();        
        // }
        
        Clear();

    }, [ filters ]);

    useEffect( () => {

        // reseta os resultados para chamar o loading
        Clear();

        if (orderBy.script || filters.length > 0 && orderBy.script){
            console.log("aquiiiii no if")
            fetchData(true);        
        } else {
            console.log("aquiiiii no else")
            fetchData();        
        }

        Clear();
        

    }, [ orderBy ]);

    useEffect( () => {
        console.log("busca")
        Clear();

        fetchData(true);
        
        console.log("=------------------- Busca -----------------=")

    }, [ busca ]);

    useEffect( () => {

        console.log("Busca .....")

        //console.log(items)

        if (items.length > 0) {
            console.log("tem itemmm")
        } else {
            console.log("Não tem itemmm");
            //navigation.navigate('SearchEmpty');
        }

    }, [ items ])

    function Clear() {
        setRangeResult({ from: 0, to: 9 });
        SetItems([])// reseta os resultados para chamar o loading
    }

    function handleAddMiniCart(item) {
        console.log(item);
    }

    async function moreItemsResult() {

        if(filters.length > 0) {
            setRangeResult({ from: 0, to: 40 }); // vai desabilitar a paginação quando ele fazer o filtro
            await fetchData();
        } else {
            setRangeResult({ from: rangeResult.from + 10, to: rangeResult.to + 10  });
            await fetchData();
        }
        
        
        
    }

    async function refreshList() {

        Clear();
        setRefreshing(true);
        ///1° Param -> vamos carregar os primeiros conteúdos por isso passei o 1 como parâmetro 
        ///2° Param -> passamos true para no parametro para ativar a flag de não duplicar os item no flatlist
        await fetchData(true);
        setRefreshing(false);
    }

    return (

        <View style={ style.container } >

            { 
                !items.length ? <Loading /> : (

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

                                        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }} >
                                            <TouchableOpacity style={{ marginRight: 10 }}>

                                                <View style={ style.prime }>
                                                    <IconPrime /> 
                                                    <Text style={{ marginLeft: 5 , textTransform: "uppercase" ,fontSize: 11, fontWeight: '700', lineHeight: 13, color: '#D0B76A' }} >Prime</Text>
                                                </View>

                                            </TouchableOpacity>

                                            <TouchableOpacity>

                                                <View style={ style.desconto }>
                                                    <ArrowDiscount />
                                                    <Text style={{ fontSize: 11, fontWeight: '300', lineHeight: 13, color: '#fff' }} >10%</Text>
                                                </View>

                                            </TouchableOpacity>

                                        </View>

                                        <View style={ style.container_img }>

                                            <Image 
                                                resizeMode="contain"
                                                style={ style.img_product }
                                                source={{ uri: imagem }} 
                                                alt='Imagem de Música' 
                                            />

                                            <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row' }}>

                                                <Text style={{ ...style.condicao, backgroundColor: item['Condição'] == 'Novo de Fábrica' ? '#00a0c6': '#E6007E' }}> { item['Condição'] } </Text>

                                            </View>

                                        </View>

                                        <View>
                                            
                                            <Text style={ style.brand } > { item['brand'] } </Text>

                                            <Text style={ style.name } numberOfLines = { 2 } > { item['productName'] } </Text>

                                            {  
                                            ListPrice == Price 
                                            ? (
                                                <Text style={ style.oldPrice } > <Text style={{ ...style.price, fontSize: 11 }} >R$</Text>{ currency(ListPrice) } </Text>
                                            )
                                            : <></>
                                                
                                            }
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