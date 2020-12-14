import React from "react";
import { View, Button, Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import Header from "../../Components/MenuNavigation/Header";

import ResultCategory from "../../Components/Shelf/ResultCategory";

import style from "./style";

export default function Category() {
    return (
        <ScrollView>

            <Header />    
            <View>
                
                <TouchableOpacity>
                    <Text>Filtrar</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text>Ordenar</Text>
                </TouchableOpacity>
                
            </View>

            <View style={ style.ContainerResult }>  
                <ResultCategory />
            </View>

        </ScrollView>
    );
}