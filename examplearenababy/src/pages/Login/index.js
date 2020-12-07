import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Image } from "react-native";

const logo = require('../../assets/png/logo-grande.png');

export default function Login() {
    
    return (
        <View>
            <Image source={logo} />

            <TouchableOpacity>
                <Text>CHAVE DE ACESSO RÁPIDO POR EMAIL</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text>ENTRAR COM EMAIL E SENHA</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text>CONECTAR VIA FACEBOOK</Text>
            </TouchableOpacity>
        </View>
    );
}
