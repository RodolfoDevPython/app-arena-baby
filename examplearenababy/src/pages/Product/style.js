import { StyleSheet, Dimensions } from 'react-native';

const color_green = '#AACE37';

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff'
    },

    btnBuy: {
        backgroundColor: color_green,
        padding: 20,
        textAlign: 'center',
        color: '#fff',
        lineHeight: 16,
        fontSize: 16,
        fontWeight: '700',
        borderRadius: 8
    },

    slickBannerMain: {
        height: 312, 
        justifyContent: 'center',
        alignItems: 'center',
    },

    slickBannerMainItem: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#C4C4C4',
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        height: 300        
    }

});

export default styles;