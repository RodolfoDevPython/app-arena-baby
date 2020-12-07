import React, { useState } from "react";
import { View, Text } from "react-native";

import { WebView } from 'react-native-webview';
import { useNavigation } from "@react-navigation/native";



export default function Checkout() {

    const [ show, SetShow ] = useState(true);
    const location = useNavigation();
    
    function listenerNAvigation(navigation) {

        if(navigation.url.indexOf('https://www.arenababy.com.br/checkout/#/cart') != -1) {
            console.log('aquiiiiiiiiiiiii');
        } else {
            SetShow(false);
            location.navigate('Home');
        }
    }
    
    return(

        <>
            { show ? <WebView source={{ uri: 'https://www.arenababy.com.br/checkout/cart/add?sku=343&qty=1&seller=arenababymauasp&sku=541&qty=1&seller=arenababysantoandresp&sku=410&qty=1&seller=arenababymauasp&redirect=true&sc=1'}} onNavigationStateChange={listenerNAvigation} /> : null}
        </>    
        
    )
}