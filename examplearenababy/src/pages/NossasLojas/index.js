import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, PermissionsAndroid, Linking } from "react-native";
import { FlatList, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker } from 'react-native-maps';

import Geolocation from 'react-native-geolocation-service';

// import Geolocation from '@react-native-community/geolocation';

import Header from "../../Components/MenuNavigation/Header";

import IconInfoMapa from "../../assets/svg/icon-info-mapa";
import IconLocationMapa from "../../assets/svg/icon-location-mapa";
import IconClose from "../../assets/svg/icon-close";
import IconRotaMap from "../../assets/svg/icon-rota-map";

import api from "../../server";
import style from "./style";
import { useDispatch, useSelector } from "react-redux";

export default function NossasLojas() {

    const [ infoLojas, setInfoLojas ]= useState([]);

    const dispatch = useDispatch();

    const [ hasLocationPermission, setHasLocationPermission ] = useState(false);

    const [ userPosition, setUserPosition ] = useState(false);

    const [ locationSelected, setLocationSelected ] = useState(false);

    const [ dateNow, setDateNow ] = useState(new Date().getDay());

    const { latitude, longitude, hasPermission } = useSelector( state => state.geolocation );

    useEffect( () => {

        async function getLojas() {

            const { data } = await api.get('/dataentities/LJ/search?_fields=uf,atendimento,bairro,cep,email,estado,facebook,img,instagram,endereco,cidade,whatsapp,telefone,latitude,longitude,telegram')


            const resp = await insertDistance(data);

            const info_sorted = sortedDistance(resp);

            setInfoLojas(info_sorted);

        }

        getLojas();
        
    }, []);

    useEffect( () => {
        console.log("locationSelected")
        console.log(locationSelected)
        console.log("=-------------- locationSelected -------------=")
    }, [ locationSelected ])

    useEffect( () => {

        //do reducer
        if (!hasPermission) {

            console.log("has not Permission")
            
            verifyLocationPermission();

            if (hasLocationPermission) {            

                Geolocation.getCurrentPosition(
                    position => {
                        dispatch({
                            type: "GEOLOCATION",
                            userPosition : {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            }
                        });
                    },
                    error => {
                        console.log(error.code, error.message);
                    }
                );
    
            }

        } 
        
    }, [ hasLocationPermission ])

    async function verifyLocationPermission() {

        try {
            // Verifica se o usuario deu acesso
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );

            if ( granted === PermissionsAndroid.RESULTS.GRANTED || granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ) {

                console.log("PERMISSAO CONCEDIDA");
                setHasLocationPermission(true);

            } else {

                console.log("PERMISSAO NEGADA");
                setHasLocationPermission(false)

            }

        } catch (error) {
            
            console.warn(error)

        }

    }

    useEffect( () => {
        console.log('userPosition')
        console.log(latitude)
        console.log(longitude)
        console.log(hasPermission)
        console.log('=------ userPosition =---------')
    }, [ userPosition ]);


    function insertDistance(array) {
        console.log("array")
        console.log(array)
        console.log("=-----=")

        if (array.length <= 0) return;

        array.map( (e, i) => {

            api.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${latitude},${longitude}&destinations=${e.latitude},${e.longitude}&key=AIzaSyDrWLDis790Gb55kEIZCgklHiOfidDKs5M`)
            .then( resp => {                

                if (resp.data) {
                    Object.assign(e, 
                        { 
                            distanceText: resp.data.rows[0].elements[0].distance.text, 
                            distanceValue: resp.data.rows[0].elements[0].distance.value
                        }
                    )
                }

            })

        })


        return new Promise(function (resolve, reject) {
            
            setTimeout( () => {
                resolve(array);
            }, 3000)

        })
        
    }  
    
    function sortedDistance(array) {

        const array_sort = array.sort( (a, b) => {


            if( a.distanceValue < b.distanceValue ) {

                return -1
            } else {
                return 1    
            }

            // if( a.distanceValue > b.distanceValue ) {

                
            // }

            // return 0;

        });

        return array_sort;

    }

    useEffect( () => {

        // console.log("GET DISTANCE")

        // infoLojas.map( (e,i) => {
        //     // console.log(e.latitude)
        //     // e.latitude  e.longitude
        //     api.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${latitude},${longitude}&destinations=${e.latitude},${e.longitude}&key=AIzaSyDrWLDis790Gb55kEIZCgklHiOfidDKs5M`)
        //     .then( resp => {
        //         console.log(e)
        //         e["distanceText"] = "adasd"
        //         // e["distanceText"] = resp.data.rows[0].elements[0].distance.text
        //         // e["distanceValue"] = resp.data.rows[0].elements[0].distance.value
        //     })

        // })

        // console.log("=-    GET DISTANCE        -=")
        
    }, [ ])

    useEffect( () => {

        console.log("infoLojas")

        console.log(infoLojas)

        console.log("=--------- infoLojas --------------=")

    }, [infoLojas])

    return(

        <View style={{ flex: 1 }} >


            <Header is_active={true} title={"LOJAS"} />

            <View style={{ flex: 1 }}>

            {
                hasPermission
                ? (
                    <MapView
                        loadingEnabled={true}
                        toolbarEnabled={true}
                        zoomControlEnabled={true}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: locationSelected ? .4 : 1 }}
                        region={{
                            latitude,
                            longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                            }}   
                    >    

                        {infoLojas.map( (e, i) => (
                            <Marker key={i} draggable
                                coordinate={{ latitude: Number(e.latitude), longitude: Number(e.longitude) }}
                                width={35}
                                height={35}
                            />
                        ))}

                    </MapView>
                )
                : (<></>)
            }

            </View>

            {/* <View style={{ maxHeight: Dimensions.get("window").height - 50 }} > */}

                {
                    locationSelected ?
                    (
                        <View style={{ position: 'relative', flexDirection: 'column', alignItems: 'flex-start', backgroundColor: '#fff', shadowColor: "#EEEEEE", shadowOffset: { width: 0, height: 1, }, shadowOpacity: 0.25, shadowRadius: 2.84, elevation: 5, marginBottom: 0 }}  >
                    
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: '#E5E5E5', borderBottomWidth: 1, width: Dimensions.get("window"). width, padding: 20, paddingLeft: 30 }} >

                                <Text style={{ fontSize: 20, fontWeight: '700', lineHeight: 24, color: '#434343' }} >Informações</Text>

                                <TouchableOpacity
                                    onPress={() => setLocationSelected(false)}
                                >
                                    <IconClose />
                                </TouchableOpacity>

                            </View>

                            <View 
                                style={{ justifyContent: 'space-between', borderBottomColor: '#E5E5E5', borderBottomWidth: 1, width: Dimensions.get("window"). width, padding: 20, paddingLeft: 30, position: 'relative' }}
                            >

                                <Text style={{ fontSize: 16, fontWeight: '700', lineHeight: 19, marginBottom: 8, color: '#434343' }} >{ locationSelected.endereco }</Text>

                                <Text style={{ fontSize: 14, lineHeight: 16, fontWeight: "300", color: "#434343" }} >{ locationSelected.cidade }</Text>

                                <Text style={{ fontSize: 14, lineHeight: 16, fontWeight: "300", color: "#434343" }} >{ locationSelected.estado }</Text>

                                <Text style={{ fontSize: 14, lineHeight: 16, fontWeight: "300", color: "#434343" }} >{ locationSelected.cep } - { locationSelected.uf }</Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 20, right: 30 }}>

                                    <IconRotaMap />

                                    <TouchableOpacity 
                                        style={{ marginLeft: 16 }}
                                        onPress={() => Linking.openURL(`google.navigation:q=${locationSelected.latitude}+${locationSelected.longitude}`)}
                                    >

                                        <Text 
                                            style={{ fontWeight: '300', fontSize: 12, lineHeight: 14, color: "#0065B2", textDecorationLine: 'underline' }} 
                                        >Abrir no mapas</Text>

                                    </TouchableOpacity>

                                </View>

                            </View>

                            <View style={{ justifyContent: 'space-between', borderBottomColor: '#E5E5E5', borderBottomWidth: 1, width: Dimensions.get("window"). width, padding: 20, paddingLeft: 30, position: 'relative' }} >

                                <Text style={{ fontSize: 16, fontWeight: '700', lineHeight: 19, marginBottom: 8, color: '#434343' }} >Horario de atendimento</Text>

                                <ScrollView>

                                    <Text 
                                        style={{ ...style.horarios, color: (dateNow == 1 ? "#00B23B" : "#434343" ) }} 
                                    >
                                        Segunda: <Text>09:00 às 18:00h</Text> 
                                    </Text>

                                    <Text style={{ ...style.horarios, color: (dateNow == 2 ? "#00B23B" : "#434343" ) }} 
                                    >
                                        Terça: <Text>09:00 às 18:00h</Text> 
                                    </Text>

                                    <Text 
                                        style={{ ...style.horarios, color: (dateNow == 3 ? "#00B23B" : "#434343" ) }} 
                                    >
                                        Quarta: <Text>09:00 às 18:00h</Text> 
                                    </Text>

                                    <Text 
                                        style={{ ...style.horarios, color: (dateNow == 4 ? "#00B23B" : "#434343" ) }} 
                                    >
                                        Quinta: <Text>09:00 às 18:00h</Text> 
                                    </Text>

                                    <Text 
                                        style={{ ...style.horarios, color: (dateNow == 5 ? "#00B23B" : "#434343" ) }} 
                                    >
                                        Sexta: <Text>09:00 às 18:00h</Text> 
                                    </Text>

                                    <Text 
                                        style={{ ...style.horarios, color: (dateNow == 6 ? "#00B23B" : "#434343" ) }} 
                                    >
                                        Sábado: <Text>09:00 às 18:00h</Text> 
                                    </Text>

                                    <Text 
                                        style={{ ...style.horarios, color: (dateNow == 0 ? "#00B23B" : "#434343" ) }} 
                                    >
                                        Domingo: <Text>09:00 às 18:00h</Text> 
                                    </Text>


                                </ScrollView>
                                
                                <Text style={{ fontSize: 14, lineHeight: 16, marginBottom: 5,fontWeight: "300", color: "#434343", marginTop: 10 }} >Telefone:</Text>

                                <Text style={{ fontSize: 14, lineHeight: 16, fontWeight: "300", color: "#434343" }} >{locationSelected.telefone}</Text>

                            </View>

                        </View>
                    ) 
                    : 
                    (
                        <View style={{ maxHeight: Dimensions.get("screen").height - 450 }} >

                            <Text style={{ fontSize: 18, lineHeight: 19, fontWeight: '500', color: '#fff', padding: 11, paddingLeft: 31, backgroundColor: '#E6007E' }} >Lojas Mais Proximas</Text>

                            <FlatList 
                                data={infoLojas}  
                                keyExtractor={item => item.cep}
                                renderItem={ ({ item }) => (
                                    <>
                                        <TouchableOpacity
                                            style={{ position: 'relative', flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#fff', padding: 31, shadowColor: "#EEEEEE", shadowOffset: { width: 0, height: 1, }, shadowOpacity: 0.25, shadowRadius: 2.84, elevation: 5, marginBottom: 5 }} 
                                            onPress={() => setLocationSelected(item) }
                                        >

                                            <View style={{ marginTop: 15 }} >

                                                <IconLocationMapa />

                                            </View>

                                            <View style={{ marginLeft: 20 }} >

                                                <Text style={{ fontSize: 14, fontWeight: '300', lineHeight: 14, marginBottom: 7 }} >{item.endereco} - {item.cidade != item.estado && item.cidade } {item.estado} - {item.uf}, {item.cep}</Text>

                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }} >

                                                    <View>

                                                        <Text style={{ fontSize: 14, fontWeight: '300', color: '#00B23B', lineHeight: 14 }} >Aberta</Text>

                                                        <Text style={{ fontSize: 14, fontWeight: '300', marginTop: 8, lineHeight: 14 }} >{item.distanceText}</Text>

                                                    </View>
                                                    
                                                    <IconInfoMapa />

                                                </View>        

                                            </View>
                                        

                                        </TouchableOpacity>

                                    </>
                                )}

                            />

                        </View>

                    )
                }
                

                {/* <ScrollView>

                    
                    <View style={{ backgroundColor: '#fff', padding: 31, shadowColor: "#EEEEEE", shadowOffset: { width: 0, height: 1, }, shadowOpacity: 0.25, shadowRadius: 2.84, elevation: 5, marginBottom: 5 }} >

                    <Text style={{ fontSize: 14, fontWeight: '300', lineHeight: 14, marginBottom: 7 }} >R. Azevedo Soares, 2300A - Tatuapé São Paulo - SP, 03322-002</Text>
                        
                        <Text style={{ fontSize: 14, fontWeight: '300', color: '#00B23B', lineHeight: 14 }} >Aberta</Text>

                        <Text style={{ fontSize: 14, fontWeight: '300', marginTop: 8, lineHeight: 14 }} >16 KM</Text>

                    </View>

                    <View style={{ backgroundColor: '#fff', padding: 31, shadowColor: "#EEEEEE", shadowOffset: { width: 0, height: 1, }, shadowOpacity: 0.25, shadowRadius: 2.84, elevation: 5, marginBottom: 5 }} >

                    <Text style={{ fontSize: 14, fontWeight: '300', lineHeight: 14, marginBottom: 7 }} >R. Azevedo Soares, 2300A - Tatuapé São Paulo - SP, 03322-002</Text>
                        
                        <Text style={{ fontSize: 14, fontWeight: '300', color: '#00B23B', lineHeight: 14 }} >Aberta</Text>

                        <Text style={{ fontSize: 14, fontWeight: '300', marginTop: 8, lineHeight: 14 }} >16 KM</Text>

                    </View>

                    <View style={{ backgroundColor: '#fff', padding: 31, shadowColor: "#EEEEEE", shadowOffset: { width: 0, height: 1, }, shadowOpacity: 0.25, shadowRadius: 2.84, elevation: 5, marginBottom: 5 }} >

                        <Text style={{ fontSize: 14, fontWeight: '300', lineHeight: 14 }} >R. Azevedo Soares, 2300A - Tatuapé São Paulo - SP, 03322-002</Text>
                        
                        <Text style={{ fontSize: 14, fontWeight: '300', color: '#00B23B', lineHeight: 14 }} >Aberta</Text>

                        <Text style={{ fontSize: 14, fontWeight: '300', marginTop: 8, lineHeight: 14 }} >16 KM</Text>

                    </View>

                    <View style={{ backgroundColor: '#fff', padding: 31, shadowColor: "#EEEEEE", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginBottom: 5 }} >

                        <Text style={{ fontSize: 14, fontWeight: '300', lineHeight: 14 }} >R. Azevedo Soares, 2300A - Tatuapé São Paulo - SP, 03322-002</Text>
                        
                        <Text style={{ fontSize: 14, fontWeight: '300', color: '#00B23B', lineHeight: 14 }} >Aberta</Text>

                        <Text style={{ fontSize: 14, fontWeight: '300', marginTop: 8, lineHeight: 14 }} >16 KM</Text>

                    </View>

                    <View style={{ backgroundColor: '#fff', padding: 31, shadowColor: "#EEEEEE", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginBottom: 5 }} >

                        <Text style={{ fontSize: 14, fontWeight: '300', lineHeight: 14 }} >R. Azevedo Soares, 2300A - Tatuapé São Paulo - SP, 03322-002</Text>
                            
                        <Text style={{ fontSize: 14, fontWeight: '300', color: '#00B23B', lineHeight: 14 }} >Aberta</Text>

                        <Text style={{ fontSize: 14, fontWeight: '300', marginTop: 8, lineHeight: 14 }} >16 KM</Text>

                    </View>

                </ScrollView> */}
                

        </View>
        
        
    )

}
