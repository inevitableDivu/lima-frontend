import { openSettings } from "expo-linking";
import {
    Stack,
    useFocusEffect,
    useLocalSearchParams,
    useRouter,
} from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { BackHandler, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../src/components/button.component";
import ModalComponent from "../../src/components/modal.component";
import { COLOR } from "../../src/constants";

export default function permission() {
    const [show, setShow] = useState(false);

    const router = useRouter();
    const params = useLocalSearchParams<{
        type: "PERMISSION" | "SOCKET_ERROR";
    }>();

    const isPermissionModal = useMemo(
        () => params.type === "PERMISSION",
        [params]
    );

    useFocusEffect(
        useCallback(() => {
            let timeout: NodeJS.Timeout;
            const unsubscribe = BackHandler.addEventListener(
                "hardwareBackPress",
                () => true
            );

            timeout = setTimeout(() => setShow(true), 250);

            return () => {
                unsubscribe.remove();
                clearTimeout(timeout);
            };
        }, [])
    );

    return (
        <SafeAreaView style={[commonStyle.container]}>
            <Stack.Screen options={{ animationTypeForReplace: "pop" }} />
            <ModalComponent
                show={show}
                title={
                    isPermissionModal
                        ? "Media Permission Required"
                        : "Connection Error"
                }
                description={
                    isPermissionModal
                        ? `To update profile picture we need you to grant the media library access permission. You can later change this from the settings app of your device.`
                        : "There was a problem connecting to call. Please try again later. If the problem still persist, kindly connect with the support team."
                }
                align={"left"}
            >
                {isPermissionModal ? (
                    <>
                        <Button
                            style={{
                                flexGrow: 1,
                                flex: 1,
                            }}
                            outlined
                            onPress={router.back}
                        >
                            Deny
                        </Button>
                        <Button
                            style={{ flexGrow: 1, flex: 1 }}
                            onPress={() => {
                                openSettings();
                                setShow(false);
                            }}
                        >
                            Open Settings
                        </Button>
                    </>
                ) : (
                    <Button
                        style={{ flexGrow: 1, flex: 1 }}
                        onPress={router.back}
                    >
                        Close
                    </Button>
                )}
            </ModalComponent>
        </SafeAreaView>
    );
}

const commonStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00000044",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 32,
    },
});
