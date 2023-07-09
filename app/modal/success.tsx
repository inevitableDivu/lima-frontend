import BottomSheet from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import AnimatedLottieView from "lottie-react-native";
import React from "react";
import { View } from "react-native";
import Text from "../../src/components/text.component";
import { COLOR } from "../../src/constants";

export default function success() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, backgroundColor: `${COLOR.black}44` }}>
            <BottomSheet
                onClose={router.back}
                snapPoints={[300]}
                index={0}
                enablePanDownToClose
                enableContentPanningGesture
                enableHandlePanningGesture
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        padding: 24,
                        gap: 24,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            width: "100%",
                            alignSelf: "center",
                            overflow: "hidden",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <AnimatedLottieView
                            autoPlay
                            style={{
                                flex: 1,
                                transform: [{ scale: 1.3 }],
                            }}
                            source={require("../../assets/96673-success.json")}
                        />
                    </View>
                    <View style={{}}>
                        <Text centered fontFamily="Poppins_700Bold" size={20}>
                            Book Issued!
                        </Text>
                        <Text centered fontFamily="Poppins_600SemiBold">
                            Due Date:{" "}
                            {new Date(
                                Date.now() + 7 * 24 * 3600 * 1000
                            ).toDateString()}
                        </Text>
                    </View>
                </View>
            </BottomSheet>
        </View>
    );
}
