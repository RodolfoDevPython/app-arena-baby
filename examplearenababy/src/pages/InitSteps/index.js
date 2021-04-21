import React from "react";
import { View, Text, Image, ImageBackground, StatusBar } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import * as Progress from 'react-native-progress';

import InitStep1 from "../../Components/steps/step-1";
import InitStep2 from "../../Components/steps/step-2";
import InitStep3 from "../../Components/steps/step-3";
import InitStep4 from "../../Components/steps/step-4";
import InitStep5 from "../../Components/steps/step-5";

import style from "./style";

import { Dimensions } from "react-native";

import { useSelector, useDispatch } from "react-redux";

export default function InitStep({ navigation }) {

    //const [ step , setStep ] = useState({ step1: true, step2: false, step3: false, step4: false, step5: false });
    //const [ porcent, setPorcent ] = useState(0.1);

    const { step, percent } = useSelector( state => state.step );

    const dispatch = useDispatch();
    

    console.log(step , percent)

    const bg_imagem = require('../../assets/png/bg-init.png');


    function handleStep(type, step, percent) {

        if (step != 0 && step <= 5 ) {
            dispatch({ type,  step , percent });
        }
        
    }

    function redirect() {
        navigation.navigate('Home');
    }

    return(
        <>
            
            <ImageBackground source={bg_imagem} style={style.img_bg}>

                <View style={style.container} >

                    {
                        step != 5 ?
                        <TouchableOpacity 
                            onPress={ redirect }
                        >
                            <Text style={style.btn_pula}>Pular</Text>
                        </TouchableOpacity>
                        : null
                    }
                    
                    
                    { step == 1 ? <InitStep1 /> : null }
                    { step == 2 ? <InitStep2 /> : null }
                    { step == 3 ? <InitStep3 /> : null }
                    { step == 4 ? <InitStep4 /> : null }
                    { step == 5 ? <InitStep5 /> : null }

                    <View style={style.progressBar}>

                        <Progress.Bar 
                            progress={percent}                            
                            color={'rgba(170,206,55,1)'} 
                            borderColor={'rgba(229,229,229,1)'} 
                            width={Dimensions.get('window').width - 42}
                            height={3} 
                        />


                        <View style={style.containerPositionStep} >

                            <TouchableOpacity 
                                style={{ marginRight: 10 }} 
                                onPress={() => handleStep( 'PREV_STEP', step - 1, percent )}
                                >
                                        <Image source={require('../../assets/png/arrow-prev-step.png')} />
                            </TouchableOpacity>

                            <Text style={style.positionStep} >
                                { step } de 5
                            </Text>

                            { 
                                step != 5 ? 
                            
                                    <TouchableOpacity 
                                        style={{ marginLeft: 10 }}
                                        onPress={() => handleStep( 'NEXT_STEP', step + 1, percent )}
                                        >
                                        <Image source={require('../../assets/png/arrow-next-step.png')} />
                                    </TouchableOpacity> 
                            
                                : 
                                    <TouchableOpacity 
                                        style={{ marginLeft: 10 }}
                                        onPress={() => navigation.navigate("Home") }
                                        >
                                        <Text style={style.txt_btn_confirm}>OK</Text>
                                    </TouchableOpacity> 

                            } 
                            

                        </View>


                    </View>

                    
                </View>                          
                
            </ImageBackground>
        </>
    );
    
}
