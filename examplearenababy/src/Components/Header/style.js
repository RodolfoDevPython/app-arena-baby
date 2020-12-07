import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";

const color_green = '#AACE37';

const styles = StyleSheet.create({

    container: {
        flex: 1,    
        zIndex: 999,
        flexDirection: 'column',
        maxHeight: 80,
        backgroundColor: 'transparent',
        elevation: 10,
        position: 'absolute',
        top: 0,
        shadowColor: 'black',
        shadowRadius: 50,
        shadowOpacity: 1
    },

    header_top: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        width: Dimensions.get('window').width,
        backgroundColor: null ,
    },
    
    icon: {
        flexDirection: 'row',
        alignItems: 'center'
    },


});

export default styles;