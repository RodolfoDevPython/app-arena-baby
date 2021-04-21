import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";

const color_green = '#AACE37';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: 20,
        paddingBottom: 60,
        position: 'relative'
    },

    img_bg: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },

    btn_pula: {
        fontSize: 18,
        color: color_green,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'right',
        width: Dimensions.get('window').width,
        paddingRight: 40
    },

    progressBar: {
        marginTop: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    containerPositionStep: {
        justifyContent: 'space-between',
        alignItems: 'baseline',
        flexDirection: 'row',
        width: Dimensions.get('window').width - 42,
    },  

    positionStep: {
        fontSize: 16,
        fontWeight: '400',
        color: '#C4C4C4',
        marginTop: 27
    },

    txt_btn_confirm: {
        color: color_green,
        fontWeight: '700',
        fontSize: 18,
        textTransform: 'uppercase'
    }

});

export default styles;