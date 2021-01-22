import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";

const color_green = '#AACE37';

const styles = StyleSheet.create({

    item: {
        flexDirection: 'row',
        alignItems: 'flex-start', 
        justifyContent: 'center',
        borderWidth: 1, 
        borderColor: '#DBDBDB', 
        borderRadius: 5 , 
        padding: 12,
        width: Dimensions.get("window").width - 50,
        marginBottom: 16
    },

    menu: {
        height: Dimensions.get("window").height - 370,
        maxHeight: Dimensions.get("window").height - 370,
        padding: 25,
    },

    qtd: {
        position: 'absolute', 
        top: -3, 
        right: -7, 
        backgroundColor: '#AACE37', 
        padding: 2, 
        paddingLeft: 5, 
        paddingRight: 5, 
        borderRadius: 700, 
        fontSize: 12, 
        lineHeight: 14, 
        fontWeight: "700", 
        color: '#fff', 
        elevation: 2
    },

    title: {
        fontSize: 20,
        fontWeight: '300',
        textTransform: 'uppercase',
        color: '#fff'
    },

    btn: {
        padding: 17, 
        paddingLeft: 25, 
        paddingRight: 25, 
        borderWidth: 1, 
        borderRadius: 8, 
        justifyContent: 'center', 
        alignItems: 'center' 
    }

});

export default styles;