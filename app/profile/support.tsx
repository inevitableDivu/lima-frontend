import BottomSheet from "@gorhom/bottom-sheet";
import * as Application from "expo-application";
import * as Device from "expo-device";
import { openURL } from "expo-linking";
import { Link, useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useRef } from "react";
import { BackHandler, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../../src/components/text.component";
import { COLOR } from "../../src/constants";

export default function support() {
    const router = useRouter();

    return (
        <SafeAreaView style={{ backgroundColor: `${COLOR.black}44`, flex: 1 }}>
            <BottomSheet
                snapPoints={[250]}
                index={0}
                enablePanDownToClose
                onClose={router.back}
            >
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: 24,
                        paddingVertical: 10,
                    }}
                >
                    <Text size={24} fontFamily="Poppins_600SemiBold">
                        Support
                    </Text>
                    <View
                        style={{
                            paddingVertical: 12,
                            justifyContent: "space-between",
                            gap: 24,
                            flex: 1,
                        }}
                    >
                        <View>
                            <Text size={14} fontFamily="Poppins_500Medium">
                                {/* Device Name: {Device.brand} */}
                            </Text>
                            <Text size={14} fontFamily="Poppins_500Medium">
                                App Version:{" "}
                                {Application.nativeApplicationVersion}
                            </Text>
                            <Text size={14} fontFamily="Poppins_500Medium">
                                App Build Version:{" "}
                                {Application.nativeBuildVersion}
                            </Text>
                        </View>
                        <View>
                            <Text size={12} fontFamily="Poppins_500Medium">
                                If you have any questions or concern, please
                                contact us at:
                            </Text>
                            <Text
                                fontFamily="Poppins_600SemiBold"
                                onPress={() => {
                                    openURL(
                                        "mailto:pandeydivyansh070501@gmail.com"
                                    );
                                }}
                                style={{
                                    textDecorationLine: "underline",
                                    textDecorationColor: COLOR.link,
                                }}
                                color={COLOR.link}
                            >
                                pandeydivyansh070501@gmail.com
                            </Text>
                        </View>
                    </View>
                </View>
            </BottomSheet>
        </SafeAreaView>
    );
}
