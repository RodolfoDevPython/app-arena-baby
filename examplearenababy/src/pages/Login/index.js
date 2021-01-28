import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Image } from "react-native";
import WebView from "react-native-webview";

const logo = require('../../assets/png/logo-grande.png');

import Header from "../../Components/MenuNavigation/Header";

export default function Login() {
    
    function inject() {

    }

    return (
        <View style={{ flex: 1 }}>

            <Header />    
            
            <WebView source={{ uri: "https://www.arenababy.com.br/account" }} 
                // injectedJavaScript={inject}
                // javaScriptEnabled={true}
                // thirdPartyCookiesEnabled={true}
            />

        </View>
    );
}
