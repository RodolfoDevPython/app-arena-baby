import { StyleSheet } from "react-native";

const color_gray = '#F5F5F5';
const color_black = '#434343'

const style = StyleSheet.create({

    header: {
        flexDirection: 'row',
        
    },

    header_item: {
        backgroundColor: '#fff',
        opacity: .2,
        padding: 21,
    },

    header_item__active: {
        backgroundColor: color_gray,
        padding: 21
    },

    header_text: {
        fontSize: 18,
        fontWeight: '300',
        color: color_black,
        flexDirection: 'column',
        flexWrap: 'wrap',
        maxWidth: 100,
        textAlign: 'center'
    },

    header_text_strong: {
        fontSize: 18,
        fontWeight: '500',
        color: color_black,
    }

});

export default style;