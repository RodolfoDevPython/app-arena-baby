import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { WebView } from 'react-native-webview';
import { useNavigation } from "@react-navigation/native";


export default function Checkout({ route, navigation }) {

    const [ show, SetShow ] = useState(true);

    const location = useNavigation();

    const [ url , setUrl ] = useState();

    const { items } = route.params;
    
    useEffect( () => {

        console.log("checkout");
        console.log(items);

        let _url = "";

        items.map( (e, i) => {

            console.log(e)
            if (i == 0 ) {

                _url += `sku=${e.product.items[0].itemId}&qty=1&seller=${e.seller.sellerName}`

            } else {

                _url += `&sku=${e.product.items[0].itemId}&qty=1&seller=${e.seller.sellerName}`

            }
            
        });

        setUrl(_url);

        console.log(_url);

        console.log("=------------checkout---------------------=");

    }, [ ]);
    
    function listenerNavigation(navigation) {

        if (navigation.url.indexOf('checkout') != -1) {

            console.log('aquiiiiiiiiiiiii');

        } else {

            SetShow(false);

            location.navigate('Home');

        }

    }
    
    return(

        <>
            { show ? <WebView source={{ uri: "https://www.arenababy.com.br/checkout/cart/add?"+url+"&utm_source=aplicativo" }} onNavigationStateChange={listenerNavigation} /> : null}
        </>    
        
    )
}