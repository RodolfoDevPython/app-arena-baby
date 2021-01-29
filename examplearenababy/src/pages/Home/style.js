import { StyleSheet, Dimensions } from 'react-native';

const color_green = '#AACE37';

const styles = StyleSheet.create({

    slick: {
        marginTop: -20,
        zIndex: 4,
        flex: 1,
        margin: 0,
        backgroundColor: color_green,
        alignItems: 'center',
    },

    slick_item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: Dimensions.get('window').width
    },

    box_banner: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 88
    },

    img_bg: {
        flex: 1,        
        justifyContent: "center",
        width: Dimensions.get('window').width,
        zIndex: 1,
    },

    title_banner: {
        fontSize: 52,
        fontWeight: '700',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },

    sub_title_banner: {
        fontSize: 36,
        fontWeight: '300',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 30
    },

    container_meninos_meninas: {
        padding: 1,
        margin: 1,          
    },

    img_meninos_meninas: {
        maxWidth: Dimensions.get('window').width ,
    },  

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fff',
        zIndex: 9,
        position: 'relative',
        elevation: 3,
    },

    compre_no_app : {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        paddingTop: 19,
        paddingBottom: 19,
        width: Dimensions.get('window').width
    },

    compre_no_app__title: {
        fontSize: 15,
        fontWeight: '700',
        color: color_green,
        textTransform: 'uppercase'
    },

    compre_no_app__sub_title: {
        fontSize: 15,
        fontWeight: '300',
        color: color_green,
        textTransform: 'uppercase'
    },

    section_title: {
        fontSize: 23,
        fontWeight: '300',
        textAlign: 'center',
        textTransform: 'uppercase'
    },

    section_title__bold: {
        fontSize: 23,
        fontWeight: '300',
        textAlign: 'center',
        color: '#696969',
        textTransform: 'uppercase'
    },

    show_more: {
        fontSize: 12,
        fontWeight: '300',
        textDecorationLine: 'underline',
        textTransform: 'uppercase',
        textAlign: 'center'
    },

    section_sub_title: {
        fontSize: 22,
        fontWeight: '300',
        textAlign: 'center',
        color: '#969696',
        textTransform: 'uppercase'
    }, 

    section_tenha_acesso: {
        maxWidth: Dimensions.get('window').width,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 55
    },

    section_tenha_acesso_item: {
        marginBottom: 10,
        padding: 10, 
        borderColor: 'rgba(0,0,0, 0.06)',
        borderWidth: 2,
        borderRadius: 9,        
    },  

    section: {
        marginBottom: 64,
        flex: 1,
        justifyContent: 'center',
        maxWidth: Dimensions.get('window').width,        
    }

});

export default styles;