import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";

const color_green = '#AACE37';
const color_black = '#434343'

const styles = StyleSheet.create({

    container: {
        flexDirection: 'column', 
        backgroundColor: '#F5F5F5',
        maxWidth: Dimensions.get('window').width,
        padding: 0,
        height: Dimensions.get('window').height
    },  

    item: {
        borderBottomColor: '#ddd', 
        borderBottomWidth: 1, 
        padding: 17
    },    

    text: {
        fontSize: 14,
        fontWeight: '300',
        color: color_black,
        textTransform: 'uppercase'
    },

    bold: {
        fontWeight: '900',
    }

});

export default styles;