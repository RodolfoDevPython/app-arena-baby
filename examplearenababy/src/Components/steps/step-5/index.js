import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, PermissionsAndroid } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import Geolocation from 'react-native-geolocation-service';

import style from "../style";
import { useNavigation } from "@react-navigation/native";

export default function InitStep3() {

    const logo = require('../../../assets/png/icon-ative-localizacao-step.png');

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const [ hasLocationPermission, setHasLocationPermission ] = useState(false);
    const [ userPosition, setUserPosition ] = useState(false);

    useEffect( () => {

        if (hasLocationPermission) {            

            Geolocation.getCurrentPosition(
                position => {
                    setUserPosition({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                error => {
                    console.log(error.code, error.message);
                }
            );

        }

    }, [ hasLocationPermission ])

    useEffect( () => {

        console.log("geo")
        console.log(userPosition)
        console.log(" ---------------= geo =---------------")
        dispatch({ type: "GEOLOCATION", userPosition })
        
    }, [ userPosition ])

    async function verifyLocationPermission() {

        try {
            // Verifica se o usuario deu acesso
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );

            if ( granted === PermissionsAndroid.RESULTS.GRANTED || granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ) {

                console.log("PERMISSAO CONCEDIDA");
                setHasLocationPermission(true);

            } else {

                console.log("PERMISSAO NEGADA");
                setHasLocationPermission(false)

            }

        } catch (error) {
            
            console.warn(error)

        }

    }

    function handleGeolocation() {

        verifyLocationPermission();

        navigation.navigate("Home");
        
    }

    return(
        <>
            
            <View style={style.container} >
            
                <View style={style.step}>


                    <Image style={style.logo} source={logo} />

                    <Text style={style.title} >Ative sua localização</Text>

                    <Text style={style.subTitle} >para ganhar descontos</Text>

                    <Text style={style.text_small}>
                        Nos ajude a localizar a <Text style={ style.txt_destaque } >loja {"\n"} 
                        mais próxima de você</Text>{"\n"}
                        e <Text style={ style.txt_destaque } >liberar descontos. </Text>
                    </Text>

                    <TouchableOpacity 
                        style={style.btn_destaque} 
                        onPress={ handleGeolocation }
                    >

                        <Text style={style.txt_btn_destaque}>Ativar Minha Localização</Text>

                    </TouchableOpacity>
                    
                </View>
                
            </View>          
            
        </>
    );
    
}
