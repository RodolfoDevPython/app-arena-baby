import { StyleSheet , Dimensions } from 'react-native';

const color_green = '#AACE37';
const color_red = '#DF3300';
const color_gray = '#434343';
const color_gray_light = '#969696' ; 

const styles = StyleSheet.create({


    boxShadow: {
        position: 'absolute', 
        top: 135,  
        elevation: 7,
        zIndex: 6, 
        backgroundColor: 'rgba(67, 67, 67, 0.7)',        
        width: Dimensions.get('window').width, 
        height: Dimensions.get('window').height
    },

});

export default styles;