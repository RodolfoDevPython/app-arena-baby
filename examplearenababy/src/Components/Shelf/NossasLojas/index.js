import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList } from "react-native";
import api  from '../../../server';

import style from "./style";

export default function NossasLojas() {

    
    const [ lojas, setLojas ] = useState({ });

    useEffect( () => {

        console.clear();

        async function fetchData() {
            
            const resp = await api.get('/dataentities/LJ/search?_fields=_all');

            setLojas(resp.data);

        }

        fetchData();

    }, [] );


    return(
        <View>
            <FlatList 
                data={lojas}
                horizontal={false}
                keyExtractor={ element => element.id }
                showsHorizontalScrollIndicator={true}
                renderItem={ ({ item }) => {
                    console.clear()

                    let segunda_a_sexta = item.atendimento.split(':')[1] ? item.atendimento.split(':')[1] : item.atendimento ;
                    let sabados = item.atendimento.split(":")[2] ? item.atendimento.split(":")[2].trim().replace('Feriados', '').trim().replace(' -', '').replace('Domingo', '') : '' ;
                    let feriado = item.atendimento.split('Feriados:')[1] ? item.atendimento.split('Feriados:')[1] : '';
                    
                    let x = item.atendimento.split(":")[2];


                    console.log(item.atendimento)
                    
                    console.log(sabados)
                    
                    return (

                        <View>

                            <Image 
                                resizeMode="contain"
                                style={{  height: 200 }}
                                source={{ uri: 'https://arenababy.vteximg.com.br/'+item.img }}  
                                alt='Imagem da loja' 
                            />

                            <Text style={ style.name_loja } >Loja { item.bairro } </Text>

                            <Text style={ style.describe } >
                                <Text style={{ ...style.describe, fontWeight: '700' }} >Segunda a Sexta:</Text> { segunda_a_sexta } 
                            </Text>

                            <Text style={ style.describe } >
                                <Text style={{ ...style.describe, fontWeight: '700' }} >Sábados:</Text> { sabados } 
                            </Text>

                            <Text style={ style.describe } >
                                <Text style={{ ...style.describe, fontWeight: '700' }} >Feriado:</Text> { feriado } 
                            </Text>

                        </View>
                    );


                 } }
            />
        </View>
    ); 
}