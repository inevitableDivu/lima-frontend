import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter, useSearchParams } from "expo-router";
import AnimatedLottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import BookCard from "../src/components/card.book";
import Text from "../src/components/text.component";
import { COLOR } from "../src/constants";
import { useSelector } from "../src/hooks";
import { IBook } from "../src/types/reducer";

export default function search() {
    const { socket } = useSelector((state) => state.socket);
    const router = useRouter();
    const params = useLocalSearchParams();

    const [pageNumber, setPageNumber] = useState(0);
    const [result, setResult] = useState<IBook[] | null>(null);

    useEffect(() => {
        if (params.search !== "") {
            socket?.emit(
                "searchBook",
                { pageNumber, search: params.search },
                (response: any) => {
                    if (response.status === "ok") {
                        setResult((old) =>
                            old
                                ? [...old, ...response.response]
                                : [...(response.response as IBook[])]
                        );
                    } else {
                        setResult((old) => (old ? old : []));
                    }
                }
            );
        }
    }, [params.search, pageNumber]);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingTop: 10,
                backgroundColor: COLOR.white,
            }}
        >
            <View style={{ position: "relative" }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 20,
                        paddingHorizontal: 12,
                    }}
                >
                    <Pressable
                        onPress={router.back}
                        style={{
                            padding: 16,
                            backgroundColor: COLOR.lightGray,
                            borderRadius: 100,
                        }}
                    >
                        <AntDesign name="arrowleft" size={20} color="black" />
                    </Pressable>
                    <Text
                        numberOfLines={1}
                        size={18}
                        fontFamily="Poppins_700Bold"
                        style={{ flex: 1, maxWidth: "100%" }}
                    >
                        {params.search ?? "Search Query"}
                    </Text>
                </View>
            </View>
            {result ? (
                result.length > 0 ? (
                    <FlatList
                        data={result}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item, index }) => (
                            <View
                                style={{
                                    flex: 1,
                                    alignItems:
                                        index % 2 === 0
                                            ? "flex-start"
                                            : "flex-end",
                                }}
                            >
                                <BookCard {...item} />
                            </View>
                        )}
                        numColumns={2}
                        style={{ paddingTop: 24 }}
                        contentContainerStyle={{ padding: 24 }}
                        onEndReachedThreshold={50}
                        ItemSeparatorComponent={() => (
                            <View style={{ marginVertical: 16 }} />
                        )}
                        onEndReached={() => setPageNumber((old) => old + 1)}
                    />
                ) : (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text fontFamily="Poppins_700Bold" size={24} centered>
                            No book found!
                        </Text>
                    </View>
                )
            ) : (
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingHorizontal: 24,
                    }}
                >
                    <AnimatedLottieView
                        style={{ width: "100%", aspectRatio: 1 }}
                        autoPlay
                        source={require("../assets/72785-searching.json")}
                    />
                </ScrollView>
            )}
        </SafeAreaView>
    );
}
