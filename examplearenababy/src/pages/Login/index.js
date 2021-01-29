import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Image } from "react-native";
import WebView from "react-native-webview";

const logo = require('../../assets/png/logo-grande.png');

import Header from "../../Components/MenuNavigation/Header";

export default function Login() {

    const location = useNavigation();

    const [ show, setShow ] = useState(true)

    function inject() {

    }

    function listenerNavigation(navigation) {

        console.log("navigation")
        console.log(navigation.url)
        console.log("------------= navigation =----------")

        if ( !navigation.url.includes('account') && !navigation.url.includes('login') ) {

            setShow(false)
            location.navigate('Home');

        } 
        
    }

    return (
        <View style={{ flex: 1 }}>

            <Header />    
            
            {
                show && (
                    //lid -> que está no template mobile da vtex
                    <WebView source={{ uri: "https://www.arenababy.com.br/account?lid=8efd0efe-9a9d-4dfe-b382-b2c64f9c6691" }}
                        onNavigationStateChange={listenerNavigation} 
                        // injectedJavaScript={inject}
                        // javaScriptEnabled={true}
                        // thirdPartyCookiesEnabled={true}
                    />
                )
            }
            

        </View>
    );
}
