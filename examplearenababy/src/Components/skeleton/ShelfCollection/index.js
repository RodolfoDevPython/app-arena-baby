import React from "react";
import { View, Text } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";

export default function Loading(props) {

    return (
        <ContentLoader 
            speed={.5}
            width={400}
            height={160}
            viewBox="0 0 400 160"
            backgroundColor="#f3f3f3"
            foregroundColor="#dbf099"
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

            <Rect x="246" y="5" rx="3" ry="3" width="107" height="88" /> 
            <Rect x="247" y="109" rx="0" ry="0" width="103" height="10" /> 
            <Rect x="246" y="125" rx="0" ry="0" width="101" height="11" /> 
            <Rect x="246" y="140" rx="0" ry="0" width="103" height="20" />

        </ContentLoader>
    )
}