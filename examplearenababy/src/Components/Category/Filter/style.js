import { StyleSheet , Dimensions } from 'react-native';

const color_green = '#AACE37';
const color_red = '#DF3300';
const color_gray = '#434343';
const color_gray_light = '#969696' ; 

const styles = StyleSheet.create({

    boxMenu: {
        backgroundColor: '#fff', 
        position: 'absolute', 
        top: 138, 
        elevation: 9, 
        zIndex: 9, 
        width: Dimensions.get('window').width - 70, 
        maxHeight: Dimensions.get('window').height - 200  
    },
    
    headerMenu: {
        position: 'relative', 
        paddingLeft: 26, 
        paddingTop: 20, 
        paddingRight: 29, 
        justifyContent: 'center'
    },

    filterByMenu: {
        paddingLeft: 26, 
        marginTop: 15, 
        marginBottom: 20, 
        paddingRight: 29
    },  

    filteredItem: {
        marginTop: 12,
        padding: 5, 
        borderWidth: 1, 
        borderColor: '#AACE37', 
        maxWidth: 122, 
        alignItems: 'center', 
        borderRadius: 70
    },

    itemMenuLv1: {
        padding: 10, 
        paddingLeft: 28, 
        paddingRight: 38, 
        borderBottomColor: '#E5E5E5', 
        borderBottomWidth: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        backgroundColor: '#F9F9F9'
    },

});

export default styles;