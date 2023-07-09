import { AnimatePresence, MotiView } from "moti";
import React from "react";
import { StyleSheet, TextStyle, View } from "react-native";
import { COLOR } from "../constants";
import Text from "./text.component";

export type IModalComponentProps = {
    show: boolean;
    title: string;
    description: string;
    align?: "center" | "left";
} & React.PropsWithChildren;

export default function ModalComponent({
    show,
    children,
    align = "left",
    title,
    description,
}: IModalComponentProps) {
    const alignStyle: TextStyle = React.useMemo(() => {
        if (align === "left") {
            return {
                textAlign: "left",
                maxWidth: "100%",
            };
        }

        return {
            textAlign: "center",
            maxWidth: "100%",
        };
    }, [align]);

    return (
        <AnimatePresence>
            {show ? (
                <MotiView
                    from={{
                        opacity: 0,
                        translateY: -20,
                    }}
                    animate={{
                        opacity: 1,
                        translateY: 0,
                    }}
                    exit={{
                        opacity: 0,
                        translateY: 20,
                    }}
                    transition={{
                        type: "timing",
                        duration: 250,
                    }}
                    style={[styles.modalView]}
                >
                    <View style={{ gap: 12 }}>
                        <Text
                            fontFamily="Poppins_600SemiBold"
                            style={{ ...alignStyle }}
                            size={18}
                            color={COLOR.purple}
                        >
                            {title}
                        </Text>
                        <Text
                            fontFamily="Poppins_500Medium"
                            size={14}
                            style={{ ...alignStyle }}
                            color={`${COLOR.black}99`}
                            lineBreakMode="head"
                            textBreakStrategy="balanced"
                        >
                            {description}
                        </Text>
                    </View>
                    <View
                        style={{
                            width: "100%",
                            flexDirection: "row",
                            gap: 24,
                        }}
                    >
                        {children}
                    </View>
                </MotiView>
            ) : null}
        </AnimatePresence>
    );
}

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: "white",
        borderRadius: 12,
        width: "100%",
        gap: 32,
        padding: 24,
    },
    closeButton: {
        padding: 10,
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 10,
    },
});
