import { StyleSheet , Dimensions } from 'react-native';

const color_green = '#AACE37';
const color_red = '#DF3300';
const color_gray = '#434343';
const color_gray_light = '#969696' ; 

const styles = StyleSheet.create({

    container: {
        position: 'relative',
        width: Dimensions.get('window').width,
        maxWidth: Dimensions.get('window').width,
        backgroundColor: '#fff',
        elevation: 7,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 100
    },

    listResult: {
        paddingTop: 30,
        marginBottom: 50
    },

    item: {
        marginRight: 10,
        padding: 10,
        paddingTop: 0,
        marginBottom: 20,
        borderRadius: 8,
        borderColor: 'rgba(0,0,0, 0.08)',
        borderWidth: 1,
        justifyContent: 'flex-end'
    },

    container_img: {
        position: 'relative',
        marginBottom: 10
    },  

    img_product: {
        height: 120
    },

    desconto: {
        backgroundColor: color_red,
        paddingTop: 3,
        paddingBottom: 2,
        paddingLeft: 6,
        paddingRight: 6,
        borderRadius: 5,
        marginRight: 10,
    },

    condicao: {
        backgroundColor: '#E6007E',
        padding: 6,
        borderRadius: 20,
        color: '#fff',
        fontSize: 8,
        fontWeight: '700',
        textTransform: 'uppercase',
        textAlign: 'center',
        maxWidth: 90
    },

    brand: {
        fontSize: 12,
        fontWeight: '300',
        color: color_gray_light,
        textTransform: 'uppercase'
    },  

    name: {
        marginTop: 5,
        marginBottom: 11,
        fontSize: 14,
        lineHeight: 15,
        fontWeight: '300',
        textAlign: 'left',
        color: color_gray,
        textTransform: 'uppercase',
        maxWidth: 135,
        width: 135
    },

    price: {
        fontSize: 18,
        fontWeight: '700',
        color: color_gray
    },  

    box_buy: {
        borderRadius: 5,
        backgroundColor: color_green,
        padding: 8,
        marginTop: 20
    },

    text_buy: {
        fontSize: 13,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
    },

});

export default styles;