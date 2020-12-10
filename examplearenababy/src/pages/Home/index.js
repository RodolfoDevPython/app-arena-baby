import React from "react";
import { Button, Text, View, Image, Dimensions, ImageBackground } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";


import Header from "../../Components/Header";
import ListCategory from "../../Components/ListCategoryHome";
import NossasLojas from "../../Components/Shelf/NossasLojas";
import Shelf from "../../Components/Shelf/ShelfCollection";


import style from "./style";

const _imagem_compre_no_app = require('../../assets/png/icon-compre-pelo-app.png');

const _banner_meninos = require("../../assets/png/banner-meninos.png");
const _banner_meninas  = require("../../assets/png/banner-meninas.png");
const _banner_brinquedos = require("../../assets/png/banner-brinquedos.png");

const _icon_prime = require("../../assets/png/icon-prime-home.png");
const _icon_estrelas = require("../../assets/png/icon-estrelas-home.png");
const _color_green_gradient = require("../../assets/png/cor-green-gradient.png");
const _color_rosa_gradient = require("../../assets/png/color-rosa-gradient.png");

//
const _marca_tommy = require("../../assets/png/marca-tommy.png");
const _marca_oshkosh = require("../../assets/png/marca-oshkosh.png");
const _marca_tiger = require("../../assets/png/marca-tiger.png");


import Slick from 'react-native-slick';

const _image_header = require('../../assets/png/banner-main-home.png');

export default function Home({ navigation }) {

    console.log(navigation)

    return (
        <View style={{ position: 'relative', flex: 1, justifyContent: 'center', alignItems: 'center', elevation: 6 }}> 

            <Header />

            <View style={ style.container } >

                <ScrollView >

                    <Slick 
                    style={{ height: 312 }}
                    dot={
                        <View
                          style={{
                            backgroundColor: '#fff',
                            width: 7,
                            height: 7,
                            borderRadius: 8,
                            marginLeft: 5,
                            marginRight: 5,
                            marginTop: 3,
                            marginBottom: 3,
                            
                          }}
                        />
                    }

                    activeDot={
                        <View
                          style={{
                            backgroundColor: '#DF3300',
                            width: 11,
                            height: 11,
                            borderRadius: 12,
                            marginLeft: 4,
                            marginRight: 4,
                            marginTop: 3,
                            marginBottom: 3
                          }}
                        />
                    }
                >
                    <View style={ style.slick_item } >
                        <View style={ style.box_banner }>
                            <Text style={ style.title_banner }>50% OFF</Text>
                            <Text style={ style.sub_title_banner } >Em Todo App</Text>
                        </View>
                        <Image style={ style.img_bg } source={_image_header} />       
                    </View>
                    <View style={ style.slick_item } >
                        <View style={ style.box_banner }>
                            <Text style={ style.title_banner }>50% OFF</Text>
                            <Text style={ style.sub_title_banner } >Em Todo App</Text>
                        </View>
                        <Image style={ style.img_bg } source={_image_header} />       
                    </View>
                    <View style={ style.slick_item } >
                        <View style={ style.box_banner }>
                            <Text style={ style.title_banner }>50% OFF</Text>
                            <Text style={ style.sub_title_banner } >Em Todo App</Text>
                        </View>
                        <Image style={ style.img_bg } source={_image_header} />       
                    </View>
                </Slick>
            

                    <View style={ style.compre_no_app }>

                        <Image source={ _imagem_compre_no_app } />

                        <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                            <Text style={ style.compre_no_app__title } >Compre pelo App</Text>
                            <Text style={ style.compre_no_app__sub_title } >E retire na loja</Text>
                        </View>

                    </View>

                    <View style={ style.nav_category, style.section }>
                        
                    </View>

                    <View style={ style.section } >

                        <Text style={ style.section_title } >Acacou de chegar</Text>
                        <TouchableOpacity><Text style={ style.show_more } >ver mais</Text></TouchableOpacity>
                        
                        <Shelf />

                    </View>

                    <View style={{ ...style.section, ...style.container_meninos_meninas }} >

                        <Image resizeMode='contain' style={ style.img_meninos_meninas } source={ _banner_meninos } />

                        <Image resizeMode='contain' style={ style.img_meninos_meninas } source={ _banner_meninas } />

                        <Image resizeMode='contain' style={ style.img_meninos_meninas } source={ _banner_brinquedos } />

                    </View>

                    <View style={ style.section } >

                        <Text style={ style.section_title__bold } >Mais Vendidos</Text>
                        <Text style={ style.section_sub_title } >Perto de você</Text>        

                        <Shelf />                
                        
                    </View>

                    <View style={ style.section }>

                        <Text style={ { ...style.section_title, marginBottom: 24 } } >Navegue por Marcas</Text>

                        <View>

                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={{ flexDirection: 'row' }}>

                                    <Image style={{ marginRight: 20 }} resizeMode={'cover'} source={ _marca_tommy } />

                                    <Image style={{ marginRight: 20 }} resizeMode={'cover'} source={ _marca_oshkosh } />

                                    <Image style={{ marginRight: 20 }} resizeMode={'cover'} source={ _marca_tiger } />

                                    <Image style={{ marginRight: 20 }} resizeMode={'cover'} source={ _marca_tommy } />

                                </View>
                            </ScrollView>

                        </View>

                    </View>

                    <View style={ style.section } >

                        <Text style={ style.section_title } >Lojas Próximas</Text>
                        <Text style={ { ...style.section_sub_title, marginBottom: 30 } } >Do seu Endereço</Text>

                        <NossasLojas />
                        
                    </View>

                    <View style={ style.section_tenha_acesso } >

                        <View style={ style.section_tenha_acesso_item } >

                            <View style={{ flexDirection: 'row' , alignItems: 'center', justifyContent: 'space-between' }} >

                                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', paddingTop: 30, paddingLeft: 35, paddingRight: 35, paddingBottom: 30, borderRadius: 8 }}>

                                    <Image style={{ marginBottom: 10 }} source={ _icon_prime } />
                                    <Text style={{ color: '#D0B76A', fontSize: 20, fontWeight: '300', textTransform: 'uppercase', lineHeight: 20 }} >Assine</Text>
                                    <Text style={{ color: '#D0B76A', fontSize: 23, fontWeight: '700', textTransform: 'uppercase', lineHeight: 23 }} >Prime</Text>

                                </View>

                                <View style={{ marginLeft: 20 , justifyContent: 'center' , alignItems: 'center' }} >

                                    <Text style={{ fontSize: 12, color: '#000', fontWeight: '300', textTransform: 'uppercase', textAlign: 'center' }} >
                                        E TENHA ACESSO A
                                    </Text>
                                    <Text style={{ fontSize: 12, fontWeight: '700', color: '#000', textTransform: 'uppercase', textAlign: 'center' }} >
                                        PRODUTOS EXCLUSIVOS
                                    </Text>

                                    <TouchableOpacity style={{ paddingTop: 7, paddingLeft: 23, paddingRight: 23, paddingBottom: 7, borderRadius: 5 , backgroundColor: '#000',  marginTop: 17, maxWidth: 108 }}>
                                        <Text style={{ fontSize: 9, fontWeight: '300', color: '#fff', textTransform: 'uppercase', textAlign: 'center' }} >Assinar</Text>
                                    </TouchableOpacity>

                                </View>

                            </View>

                        </View>

                        <View style={ style.section_tenha_acesso_item } >

                            <ImageBackground source={ _color_green_gradient } style={{  paddingTop: 20, paddingBottom: 20, paddingLeft: 23, paddingRight: 23, resizeMode: "cover", justifyContent: "center" }} >

                                <View style={{ flexDirection: 'row' , alignItems: 'stretch', borderRadius: 8, justifyContent: 'space-between' }} >

                                    <View>
                                            <Image source={ _icon_estrelas } style={{ marginBottom: 28 }} />
                                            <Text style={{ fontSize: 20, fontWeight: '700', textTransform: 'uppercase', color: '#fff' }} >Fidelidade</Text>
                                    </View>

                                    <View style={{ marginTop: 40 , alignItems:'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 12, color: '#fff', fontWeight: '300',  maxWidth: 150 , textAlign: 'center' }} >
                                            A CADA <Text style={{ fontWeight: '600' }}>30 ESTRELAS, GANHE CRÉDITOS</Text> NA SUA PRÓXIMA COMPRA.
                                        </Text>

                                        <TouchableOpacity style={{ paddingTop: 6, paddingLeft: 23, paddingRight: 23, paddingBottom: 6, borderRadius: 5 , backgroundColor: '#fff',  marginTop: 17, maxWidth: 120 }} >
                                            <Text style={{ fontSize: 12, fontWeight: '700', color: '#80A800', textTransform: 'uppercase', textAlign: 'center' }} >Saiba Mais</Text>
                                        </TouchableOpacity>
                                    </View>
                                    
                                </View>

                            </ImageBackground>
                        </View>

                        <View style={ style.section_tenha_acesso_item } >

                            <View>
                                
                                <ImageBackground source={ _color_rosa_gradient } style={{  padding: 20,  resizeMode: "cover", justifyContent: "center", borderRadius: 8, justifyContent: 'center', alignItems: 'center' }} >
                                    <Text style={{ fontSize: 29, fontWeight: '300', color: '#fff', textTransform: 'uppercase', textAlign: 'center' }} >Venda seu</Text>
                                    <Text style={{ fontSize: 33, fontWeight: '700', color: '#fff', textTransform: 'uppercase', textAlign: 'center' }} >Produto</Text>

                                    <TouchableOpacity style={{ paddingTop: 6, paddingLeft: 23, paddingRight: 23, paddingBottom: 6, borderRadius: 10 , backgroundColor: '#fff', borderRadius: 8, marginTop: 17, maxWidth: 132 }} >
                                        <Text style={{ fontSize: 12, fontWeight: '700', color: '#E6007E', textTransform: 'uppercase', textAlign: 'center' }} >saiba mais</Text>
                                    </TouchableOpacity>
                                </ImageBackground>

                            </View>
                            
                        </View>

                    </View>

                </ScrollView>
                
            </View>
        </View>
    );

}