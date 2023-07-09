import React, { PropsWithChildren } from "react";
import {
    ActivityIndicator,
    Pressable,
    PressableProps,
    StyleProp,
    StyleSheet,
    ViewStyle,
} from "react-native";
import { COLOR } from "../constants";
import Text from "./text.component";

interface ButtonProps extends PropsWithChildren<Omit<PressableProps, "style">> {
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
    outlined?: boolean;
}

export default function Button({
    style = {},
    loading = false,
    children,
    outlined = false,
    ...restProps
}: ButtonProps) {
    return (
        <Pressable
            style={[
                styles.button,
                style,
                outlined ? styles.outlined : {},
                restProps.disabled ? styles.disabled : {},
            ]}
            {...restProps}
        >
            {loading ? (
                <ActivityIndicator color={COLOR.white} />
            ) : (
                <Text
                    centered
                    color={outlined ? COLOR.purple : COLOR.white}
                    fontFamily="Poppins_600SemiBold"
                    size={14}
                >
                    {children}
                </Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLOR.purple,
        borderRadius: 10,
        paddingHorizontal: 10,
        elevation: 6,
        height: 48,
        alignSelf: "center",
        justifyContent: "center",
    },
    disabled: {
        backgroundColor: `${COLOR.purple}cc`,
        elevation: 0,
    },
    outlined: {
        borderWidth: 2,
        borderColor: COLOR.purple,
        backgroundColor: COLOR.white,
    },
});
