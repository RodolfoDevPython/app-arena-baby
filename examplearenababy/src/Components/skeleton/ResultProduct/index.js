import React from "react";
import { View, Text } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";

export default function Loading(props) {

    return (
        <ContentLoader 
            speed={.7}
            width={570}
            height={500}
            viewBox="0 0 400 320"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >

            <Rect x="3" y="5" rx="3" ry="3" width="107" height="88" /> 
            <Rect x="5" y="109" rx="0" ry="0" width="103" height="10" /> 
            <Rect x="6" y="125" rx="0" ry="0" width="101" height="11" /> 
            <Rect x="6" y="140" rx="0" ry="0" width="103" height="20" />


            <Rect x="126" y="5" rx="3" ry="3" width="107" height="88" /> 
            <Rect x="127" y="109" rx="0" ry="0" width="103" height="10" /> 
            <Rect x="126" y="125" rx="0" ry="0" width="101" height="11" /> 
            <Rect x="126" y="140" rx="0" ry="0" width="103" height="20" />


            <Rect x="3" y="185" rx="3" ry="3" width="107" height="88" /> 
            <Rect x="5" y="259" rx="0" ry="0" width="103" height="10" /> 
            <Rect x="6" y="205" rx="0" ry="0" width="101" height="11" /> 
            <Rect x="6" y="280" rx="0" ry="0" width="103" height="20" />


            <Rect x="126" y="185" rx="3" ry="3" width="107" height="88" /> 
            <Rect x="127" y="259" rx="0" ry="0" width="103" height="10" /> 
            <Rect x="126" y="205" rx="0" ry="0" width="101" height="11" /> 
            <Rect x="126" y="280" rx="0" ry="0" width="103" height="20" />

        </ContentLoader>
    )
}