import React, { PropsWithChildren } from "react";
import { Text as RNText, TextProps, TextStyle } from "react-native";
import { COLOR } from "../constants";
import { FONT } from "../constants/fonts";

export default function Text({
    fontFamily = "Poppins_400Regular",
    size = 14,
    style = {},
    centered = false,
    children,
    color = COLOR.black,
    ...restProps
}: PropsWithChildren<
    {
        fontFamily?: keyof typeof FONT;
        size?: number;
        centered?: boolean;
        style?: Omit<TextStyle, "color" | "fontSize" | "fontFamily">;
        color?: string;
    } & Omit<TextProps, "style">
>) {
    return (
        <RNText
            {...restProps}
            style={[
                {
                    fontFamily,
                    fontSize: size,
                    textAlign: centered ? "center" : "auto",
                    color,
                },
                style,
            ]}
        >
            {children}
        </RNText>
    );
}
