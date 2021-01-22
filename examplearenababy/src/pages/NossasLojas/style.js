import { StyleSheet, Dimensions } from 'react-native';

const color_green = '#AACE37';

const styles = StyleSheet.create({

    horarios: {
        fontSize: 13, 
        lineHeight: 16, 
        marginBottom: 5, 
        fontWeight: "300", 
        color: "#434343", 
        width: Dimensions.get("window").width, 
        justifyContent: 'space-between'
    }

});

export default styles;