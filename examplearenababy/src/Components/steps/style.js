import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";

const color_green = '#AACE37';


const styles = StyleSheet.create({

    step: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },  

    title: {
        fontSize: 24,
        fontWeight: '700',
        color: color_green
    },

    logo: {
        maxWidth: Dimensions.get('window').width - 128,
        resizeMode: "contain",
    },  

    subTitle: {
        fontSize: 24,
        fontWeight: '300',
        color: color_green
    },

    text_small: {
        marginTop: 31,
        fontSize: 18,
        fontWeight: '300',
        color: '#969696',
        textAlign: 'center',
        maxWidth: Dimensions.get('screen').width - 25,
        opacity: .7
    },

    txt_destaque: {
        fontWeight: '700'
    },

    btn_destaque: {
        backgroundColor: color_green,
        padding: 13,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 35,
        marginBottom: 35,
        borderRadius: 5
    },

    txt_btn_destaque: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 18,
        textTransform: 'uppercase'
    }

});

export default styles;