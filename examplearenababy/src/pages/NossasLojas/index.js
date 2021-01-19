import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, PermissionsAndroid } from "react-native";
import { FlatList, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';


import Header from "../../Components/MenuNavigation/Header";

import IconInfoMapa from "../../assets/svg/icon-info-mapa";
import IconLocationMapa from "../../assets/svg/icon-location-mapa";


import api from "../../server";

export default function NossasLojas() {

    const [ infoLojas, setInfoLojas ]= useState([]);

    const [ hasLocationPermission, setHasLocationPermission ] = useState(false);
    const [ userPosition, setUserPosition ] = useState(false);

    useEffect( () => {

        verifyLocationPermission();

        async function getLojas() {

            const { data } = await api.get('/dataentities/LJ/search?_fields=uf,atendimento,bairro,cep,email,estado,facebook,img,instagram,endereco,cidade,whatsapp,telefone,latitude,longitude,telegram')

            setInfoLojas(data);

        }

        getLojas();

        if (hasLocationPermission) {

            console.log("if")

            console.log(Geolocation.getCurrentPosition( position => position ))

            Geolocation.getCurrentPosition(
                position => {
                    setUserPosition({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                error => {
                    console.log(error.code, error.message);
                }
            );

        }
        
    }, []);

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
        console.log(userPosition)
        console.log('=------ userPosition =---------')
    }, [ userPosition ])

    return(

        <View style={{ flex: 1 }} >


            <Header />

            <View style={{ flex: 1 }}>

                <MapView
                    loadingEnabled={true}
                    toolbarEnabled={true}
                    zoomControlEnabled={true}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}   
                >    

                    {infoLojas.map( (e, i) => (
                        <Marker key={i} draggable
                            coordinate={{ latitude: Number(e.latitude), longitude: Number(e.longitude) }}
                        />
                    ))}

                </MapView>

            </View>

            <View style={{ maxHeight: Dimensions.get("window").width - 20 }}>

                <Text style={{ fontSize: 18, lineHeight: 19, fontWeight: '500', color: '#fff', padding: 11, paddingLeft: 31, backgroundColor: '#E6007E' }} >Lojas Mais Proximas</Text>


                <FlatList 
                    data={infoLojas}  
                    keyExtractor={item => item.cep}
                    renderItem={ ({ item }) => (
                        <>
                            <View style={{ position: 'relative', flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#fff', padding: 31, shadowColor: "#EEEEEE", shadowOffset: { width: 0, height: 1, }, shadowOpacity: 0.25, shadowRadius: 2.84, elevation: 5, marginBottom: 5 }} >

                                <View style={{ marginTop: 15 }} >

                                    <IconLocationMapa />

                                </View>

                                <View style={{ marginLeft: 20 }} >

                                    <Text style={{ fontSize: 14, fontWeight: '300', lineHeight: 14, marginBottom: 7 }} >{item.endereco} - {item.cidade != item.estado && item.cidade } {item.estado} - {item.uf}, {item.cep}</Text>


                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }} >

                                        <View>

                                            <Text style={{ fontSize: 14, fontWeight: '300', color: '#00B23B', lineHeight: 14 }} >Aberta</Text>

                                            <Text style={{ fontSize: 14, fontWeight: '300', marginTop: 8, lineHeight: 14 }} >16 KM</Text>

                                        </View>
                                        

                                        <IconInfoMapa />

                                    </View>        

                                </View>
                            

                            </View>

                        </>
                    )}

                />
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

        </View>
        
        
    )

}
