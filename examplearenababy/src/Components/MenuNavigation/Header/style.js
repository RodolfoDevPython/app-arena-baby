import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";

const color_green = '#AACE37';

const styles = StyleSheet.create({

    header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 27,
        paddingBottom: 27,
        paddingLeft: 32,
        paddingRight: 32,
        backgroundColor: color_green,
    },

    title: {
        fontSize: 20,
        fontWeight: '300',
        textTransform: 'uppercase',
        color: '#fff'
    }

});

export default styles;