import React from "react";
import { StyleSheet, TextInputProps, View, ViewStyle } from "react-native";
import { TextInput as RNTextInput } from "react-native-gesture-handler";
import { COLOR } from "../constants";
import { IError } from "../types";
import Text from "./text.component";

interface InputProps extends TextInputProps {
    value: string;
    onChangeText(value: string): void;
    error: IError;
    label?: string;
    containerStyle?: ViewStyle;
}

export default function TextInput({
    value,
    onChangeText,
    error,
    label,
    style = {},
    containerStyle = {},
    ...restProps
}: InputProps) {
    return (
        <View style={[containerStyle]}>
            {label ? (
                <Text
                    size={12}
                    fontFamily="Poppins_600SemiBold"
                    style={{
                        opacity: 0.6,
                        marginBottom: 4,
                    }}
                >
                    {label}:
                </Text>
            ) : null}
            <RNTextInput
                placeholder="Enter your password here"
                style={[
                    styles.inputField,
                    error ? { borderColor: COLOR.red } : {},
                    style,
                ]}
                cursorColor={COLOR.black}
                value={value}
                onChangeText={onChangeText}
                {...restProps}
            />
            {error ? (
                <Text
                    size={10}
                    fontFamily="Poppins_600SemiBold"
                    style={{ top: 2, left: 2 }}
                    color={COLOR.red}
                >
                    {error?.message} *
                </Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    inputField: {
        borderWidth: 1.5,
        borderColor: `${COLOR.black}25`,
        borderRadius: 8,
        paddingHorizontal: 16,
        fontFamily: "Poppins_600SemiBold",
        height: 48,
    },
});
