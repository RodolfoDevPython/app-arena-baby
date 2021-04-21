import { StyleSheet , Dimensions } from 'react-native';

const color_green = '#AACE37';
const color_red = '#DF3300'

const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
        paddingLeft: 10
    },

    name_loja: {
        fontSize: 15,
        lineHeight: 15,
        fontWeight: '700',
        textAlign: 'left',
        color: color_green,
        textTransform: 'uppercase'
    },

    address: {
        marginBottom: 8
    },  

    describe: {
        fontSize: 10,
        fontWeight: '300',
        color: '#969696'
    },

    slick_item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: Dimensions.get('window').width
    },

    scroolview: {
        padding: 20
    },  

    item: {
        flex: 1,
        margin: 1,
        padding: 10,
        marginBottom: 20,
        borderRadius: 8,
        borderColor: 'rgba(0,0,0, 0.08)',
        borderWidth: 1
    },

    container_img: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 34
    },  

    mini_logo: {
        position: 'absolute',
        borderColor: 'rgba(0,0,0, 0.06)',
        borderWidth: 1,
        borderRadius: 51,
        padding: 10,
        maxWidth: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        bottom: -20, 
    },

    container_dots: {
        justifyContent: 'center',
        alignItems: 'center',
    },  

    dots: {
        borderRadius: 7,
        height: 7,
        width: 7,
        backgroundColor: '#DCDCDC',
    },

    dots_active: {
        borderRadius: 11,
        height: 11,
        width: 11,
        backgroundColor: color_red
    },

    container_show_map: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 15
    },

    show_map: {
        color: color_red,
        textTransform: 'uppercase',
        textDecorationLine: 'underline',
        fontSize: 10,
        lineHeight: 10,        
        fontWeight: '300',
    }

});

export default styles;