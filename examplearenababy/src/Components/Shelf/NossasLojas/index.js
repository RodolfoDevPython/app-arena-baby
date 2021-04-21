import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ScrollView } from "react-native";


import Slick from 'react-native-slick';

import api  from '../../../server';

import Logo from "../../../assets/png/banner-mini-logo.png";

import Loading from "../../skeleton/nossasLojas";

import style from "./style";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function NossasLojas() {

    const [ slickItem, setSlickItem ] = useState(0);
    const [ lojas, setLojas ] = useState({ });

    useEffect( () => {

        async function fetchData() {
            
            const resp = await api.get('/dataentities/LJ/search?_fields=_all');

            setLojas(resp.data);

        }

        fetchData();

    }, [] );

    return(

        <View style={ style.container } >

            {
                !lojas.length ? <Loading /> : (

                    <FlatList 
                        data={lojas}
                        horizontal={true}
                        keyExtractor={ element => ( element.id + 1) }
                        showsHorizontalScrollIndicator={false}
                        renderItem={ ({ item }) => {

                            let { endereco, bairro, estado } = item;
                            let segunda_a_sexta = item.atendimento.split(':')[1] ? item.atendimento.split(':')[1] : item.atendimento ;
                            let sabados = item.atendimento.split(":")[2] ? item.atendimento.split(":")[2].trim().replace('Feriados', '').trim().replace(' -', '').replace('Domingo', '') : '' ;
                            let feriado = item.atendimento.split('Feriados:')[1] ? item.atendimento.split('Feriados:')[1] : '';
                            
                            return (
                                    <View style={ style.item } > 
                                        
                                        <View style={ style.container_img } >
                                            <Image 
                                                style={{ height: 200, maxHeight: 200, width: 200 }}
                                                source={{ uri: 'https://arenababy.vteximg.com.br/'+item.img }}  
                                                alt='Imagem da loja' 
                                            />
                                        

                                            <View style={ style.mini_logo } >
                                                <Image 
                                                    resizeMode={"contain"}
                                                    source={ Logo }
                                                    alt='Mini Logo Arena Baby' 
                                                />
                                            </View>

                                        </View>
                                        

                                        <Text style={ style.name_loja } >Loja { item.bairro } </Text>

                                        <Text style={ style.address } >
                                            <Text style={ style.describe } > { endereco } - </Text> {'\n'}
                                            <Text style={ style.describe } > { bairro } - { estado } </Text>
                                        </Text>

                                        <Text style={ style.describe } >
                                            <Text style={{ ...style.describe, fontWeight: '700' }} >Segunda a Sexta:</Text> { segunda_a_sexta } 
                                        </Text>

                                        {
                                            sabados ? <Text style={ style.describe } > <Text style={{ ...style.describe, fontWeight: '700' }} >Sábados:</Text> { sabados }  </Text> : false
                                        }
                                        
                                        { 
                                            feriado ?  <Text style={ style.describe } > <Text style={{ ...style.describe, fontWeight: '700' }} >Feriado:</Text> <Text style={{ ...style.describe, fontStyle: 'italic' }} >{ feriado } </Text> </Text> :  false                                
                                        }

                                        <TouchableOpacity style={ style.container_show_map } >
                                            <Text style={ style.show_map } > ABRIR MAPA </Text>
                                        </TouchableOpacity>
                                    

                                    </View>

                            );


                        } }

                    />
                )
            }    
            
            {/*  */}

            <View style={ style.container_dots } >

                {/* {/* <FlatList 
                    data={lojas}
                    horizontal={true}
                    renderItem={ ( item ) => {

                            return ( 
                                <Text key={item} style={ style.dots } ></Text>  
                            )
                        } 
                    }
                /> */}
                 
            </View>

        </View>

    ); 
}