import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Header from "../../Components/MenuNavigation/Header";


export default function SearchEmpty() {

    const [ text, setText ] = useState("");

    return (

        <View>

            <Header />

            <View>
                <Text>Busca Vazia</Text>

                <Text>INFELIZMENTE NÃO ENCONTRAMOS NENHUM RESULTADO PRA SUA BUSCA.</Text>

                <Text>Faça uma nova pesquisa</Text>
            </View>

            <View>

                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    placeholder="Type here to translate!"
                    onChangeText={text => setText(text)}
                    value={text}
                />

            </View>

            <View>

                <Text> 1 - Tente palavras mais especificas; </Text>

                <Text> 2 - Use o menu no topo da página para navegar pelas categorias;</Text>

                <Text> 3 - Digite pelo menos 3 letras da palavra no campo de busca </Text>

            </View>

            <TouchableOpacity>
                <Text>VOLTAR A HOME</Text>
            </TouchableOpacity>
            
        </View>
    );
    
}