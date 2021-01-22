import React from "react";
import { View, Text } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";

export default function Loading(props) {

    return (
        <ContentLoader 
            viewBox="0 0 900 330" 
            height={330} 
            width={900}
            speed={.7}
            {...props}>
            <Rect x="30" y="60" rx="0" ry="0" width="200" height="120" />
            <Rect x="30" y="189" rx="0" ry="0" width="200" height="15" />
            <Rect x="30" y="211" rx="0" ry="0" width="140" height="15" />
            <Rect x="60" y="280" rx="0" ry="0" width="140" height="15" />

            <Rect x="243" y="60" rx="0" ry="0" width="200" height="120" />
            <Rect x="243" y="189" rx="0" ry="0" width="200" height="15" />
            <Rect x="243" y="211" rx="0" ry="0" width="140" height="15" />
            <Rect x="268" y="280" rx="0" ry="0" width="140" height="15" />
        </ContentLoader>
    )
}