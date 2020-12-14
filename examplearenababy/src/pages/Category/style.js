import { StyleSheet , Dimensions } from 'react-native';

const color_green = '#AACE37';
const color_red = '#DF3300';
const color_gray = '#434343';
const color_gray_light = '#969696' ; 

const styles = StyleSheet.create({

    ContainerResult: {
        width: Dimensions.get('window').width,
        maxWidth: Dimensions.get('window').width,
        flexWrap: 'wrap',
        backgroundColor: '#fff'
    },

});

export default styles;