import { StyleSheet , Dimensions } from 'react-native';

const color_green = '#AACE37';
const color_red = '#DF3300';
const color_gray = '#434343';
const color_gray_light = '#969696' ; 

const styles = StyleSheet.create({


    cartItem: {
        borderWidth: 0, 
        borderColor: '#fff', 
        shadowOffset: { width: 1, height: 1 }, 
        shadowColor: '#E5E5E5', 
        shadowOpacity: .2, 
        shadowRadius: 2, 
        elevation: 3, 
        zIndex: 999, 
        overflow: 'hidden', 
        padding: 20, 
        paddingTop: 35, 
        margin: 10, 
        maxWidth: Dimensions.get('window').width - 40,
        minWidth: Dimensions.get('window').width - 40,
        backgroundColor: '#fff' 
    },

    cartItemTitle: {
        fontSize: 16, 
        fontWeight: '500', 
        lineHeight: 15, 
        color: '#434343', 
        borderBottomColor: "#E5E5E5", 
        borderBottomWidth: 1, 
        paddingBottom: 20
    }

});

export default styles;