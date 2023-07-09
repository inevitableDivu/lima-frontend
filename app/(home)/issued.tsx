import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import BookCard from "../../src/components/card.book";
import Text from "../../src/components/text.component";
import { COLOR } from "../../src/constants";
import { useSelector } from "../../src/hooks";

export default function Issued() {
    const { issuedBooks } = useSelector((state) => state.books);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.white }}>
            <Text
                size={24}
                fontFamily="Poppins_700Bold"
                style={{ paddingVertical: 16, paddingHorizontal: 24 }}
            >
                Issued Books
            </Text>

            {issuedBooks.length > 0 ? (
                <FlatList
                    data={issuedBooks}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item, index }) => (
                        <View
                            style={{
                                flex: 1,
                                alignItems:
                                    index % 2 === 0 ? "flex-start" : "flex-end",
                            }}
                        >
                            <BookCard {...item} />
                        </View>
                    )}
                    numColumns={2}
                    contentContainerStyle={{ padding: 24 }}
                    ItemSeparatorComponent={() => (
                        <View style={{ margin: 12 }} />
                    )}
                />
            ) : (
                <View
                    style={{
                        flex: 0.8,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text fontFamily="Poppins_500Medium" size={18}>
                        No books issued!
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
}
