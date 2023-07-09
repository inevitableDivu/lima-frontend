import BottomSheet from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import AnimatedLottieView from "lottie-react-native";
import React from "react";
import { View } from "react-native";
import Button from "../../src/components/button.component";
import Text from "../../src/components/text.component";
import { COLOR } from "../../src/constants";

export default function ReturnBook() {
    const router = useRouter();
    const params = useLocalSearchParams();

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
                                transform: [{ scale: 1.2 }],
                            }}
                            source={require("../../assets/96673-success.json")}
                        />
                    </View>
                    <View style={{ width: "100%" }}>
                        <Text centered fontFamily="Poppins_700Bold" size={20}>
                            Book Returned!
                        </Text>
                        <Text centered fontFamily="Poppins_600SemiBold">
                            Total Payable: {params.fineAmount} Rupees
                        </Text>
                        <Button
                            disabled={true}
                            style={{ marginTop: 10, alignSelf: "auto" }}
                        >
                            Pay Now
                        </Button>
                    </View>
                </View>
            </BottomSheet>
        </View>
    );
}
